const {doc, getDoc} = require("firebase/firestore");

const getNewUserData = async (database, collectionName, userRef) => {
  try {
    const newUserData = await getDoc(
        doc(database, collectionName, userRef));
    return newUserData.data();
  } catch (error) {
    return false;
  }
};

exports.module = getNewUserData;
