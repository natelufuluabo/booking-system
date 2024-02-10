const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("./firebase_config");
const {getFirestore, collection, addDoc} = require("firebase/firestore");

exports.createRestaurantAccount = onRequest({cors: true}, async (req, res) => {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "restaurants"), req.body);
    res.status(204).json({accountID: docRef.id});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

