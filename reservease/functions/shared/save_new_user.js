const {collection, addDoc} = require("firebase/firestore");

const saveNewUser = async (database, collectionName, userData) => {
  try {
    const newUserRef = await addDoc(
        collection(database, collectionName), userData);
    return newUserRef.id;
  } catch (error) {
    return false;
  }
};

exports.module = saveNewUser;
