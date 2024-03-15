const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("../firebase_config");
const {
  getFirestore, collection,
  getDocs, where, query,
} = require("firebase/firestore");

const checkIfEmailAlreadyUsed = onRequest({cors: true}, async (req, res) => {
  const db = getFirestore(app);
  const q = query(
      collection(db, "restaurants"), where("email", "==", req.body.email));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      return res.status(401).json({code: 401});
    } else {
      return res.status(200).json({code: 200});
    }
  } catch (error) {
    return res.status(500).json(
        {code: 500});
  }
});

exports.module = checkIfEmailAlreadyUsed;
