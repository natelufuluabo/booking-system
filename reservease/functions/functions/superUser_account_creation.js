const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("../firebase_config");
const {getFirestore, collection, addDoc, doc,
  updateDoc, arrayUnion, getDoc,
} = require("firebase/firestore");
const createAuthID = require("../shared/create_authId");

const maxSuperUsersTo2 = async (docRef) => {
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data.superUsers.length !== 2;
};

const createSuperUser = onRequest({cors: true}, async (req, res) => {
  try {
    const {name, email, password, accountID} = req.body;

    const db = getFirestore(app);
    const docRef = doc(db, "restaurants", accountID);

    // Defensive code to make sure all accounts have a max of 2 super users
    const successfulFirstStep = await maxSuperUsersTo2(docRef);
    if (!successfulFirstStep) return res.json({code: 404});

    // Refer to function JS-Doc to understand this code
    const authID = await createAuthID.module(email, password);
    if (!authID) return res.json({code: 501});

    // Update the superUsers list with the  new super user auth id created
    await updateDoc(docRef, {superUsers: arrayUnion(authID)});

    // Add the new super user in the super users collection
    const newSuperUserRef = await addDoc(collection(db, "superUsers"), {
      name, email, securityLevel: "SuperUser", authID,
    });

    // Retrieve new super user data to be returned
    const newSuperUserData = await getDoc(newSuperUserRef);

    return res.json({code: 204, data: newSuperUserData.data()});
  } catch (error) {
    console.error("Error:", error);
    return res.json({code: 500});
  }
});

exports.module = createSuperUser;
