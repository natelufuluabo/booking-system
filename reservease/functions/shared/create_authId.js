const {getAuth, createUserWithEmailAndPassword} = require("firebase/auth");
const {app} = require("../firebase_config");

/**
 * Creates a new authentication ID (UID)
 * for a user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<string|Error>} - A promise that resolves to the UID of the
 * newly created user, or an error if the operation fails.
 */
const createAuthID = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
        auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    return false;
  }
};

exports.module = createAuthID;
