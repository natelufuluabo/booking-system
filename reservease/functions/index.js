const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("./firebase_config");
const {
  getFirestore, collection,
  addDoc, getDocs, where, query,
} = require("firebase/firestore");

exports.createRestaurantAccount = onRequest({cors: true}, async (req, res) => {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "restaurants"), req.body);
    res.status(204).json({accountID: docRef.id});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

/**
 * Checks if the given email is already in use
 * in the "restaurants" collection of the Firestore database.
 * @async
 * @function checkIfEmailAlreadyUsed
 * @param {string} email - The email to check for existence in the database.
 * @return {Promise<{message: string}>} A promise that resolves to an object
 * with a message indicating the result of the email check.
 * @throws {Error} If there is an error while checking the email existence.
 */
async function checkIfEmailAlreadyUsed(email) {
  const db = getFirestore(app);
  const q = query(collection(db, "restaurants"), where("email", "==", email));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) return {message: "Email already in use"};
    else return {message: "Email not already in use"};
  } catch (error) {
    return {message: "Error checking email existence"};
  }
}

