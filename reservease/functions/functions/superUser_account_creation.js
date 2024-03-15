const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("../firebase_config");
const {getFirestore, collection, addDoc, doc,
  updateDoc, arrayUnion,
} = require("firebase/firestore");
const {getAuth, createUserWithEmailAndPassword} = require("firebase/auth");

const createSuperUser = onRequest({cors: true}, async (req, res) => {
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

exports.module = createSuperUser;
