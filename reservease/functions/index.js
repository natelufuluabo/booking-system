const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("./firebase_config");
const {
  getFirestore, collection, addDoc, doc,
  getDocs, where, query, updateDoc, arrayUnion,
} = require("firebase/firestore");
const {getAuth, createUserWithEmailAndPassword} = require("firebase/auth");

exports.checkIfEmailAlreadyUsed = onRequest({cors: true}, async (req, res) => {
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

exports.createRestaurantAccount = onRequest({cors: true}, async (req, res) => {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "restaurants"), req.body);
    return res.json({accountID: docRef.id});
  } catch (e) {
    return res.json({message: "Error creating account. Retry"});
  }
});

exports.createSuperUser = onRequest({cors: true}, async (req, res) => {
  try {
    const {name, email, password, accountID} = req.body;
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
        auth, email, password);
    const authID = userCredential.user.uid;

    const db = getFirestore(app);
    // eslint-disable-next-line max-len
    await updateDoc(doc(db, "restaurants", accountID), {superUsers: arrayUnion(authID)});
    await addDoc(collection(db, "superUsers"), {
      name, email, securityLevel: "SuperUser", authID,
    });
    return res.json({code: 204});
  } catch (error) {
    console.error("Error:", error);
    return res.json({code: 500});
  }
});
