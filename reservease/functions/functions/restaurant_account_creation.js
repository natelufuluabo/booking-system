const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("../firebase_config");
const {getFirestore, collection, addDoc} = require("firebase/firestore");

const createRestaurantAccount = onRequest({cors: true}, async (req, res) => {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "restaurants"), req.body);
    return res.json({accountID: docRef.id});
  } catch (e) {
    return res.json({message: "Error creating account. Retry"});
  }
});

exports.module = createRestaurantAccount;
