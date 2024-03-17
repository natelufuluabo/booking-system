const {updateDoc} = require("firebase/firestore");

const registerNewAccountUser = async (docRef, data) => {
  try {
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.module = registerNewAccountUser;
