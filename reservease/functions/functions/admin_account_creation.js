const {onRequest} = require("firebase-functions/v2/https");
const {app} = require("../firebase_config");
const {getFirestore, doc, arrayUnion} = require("firebase/firestore");
const createAuthID = require("../shared/create_authId");
const registerNewAccountUser = require("../shared/register_new_account_user");
const saveNewUser = require("../shared/save_new_user");
const getNewUserData = require("../shared/get_new_user_data");

const createAdmin = onRequest({cors: true}, async (req, res) => {
  try {
    const {name, email, password, accountID} = req.body;

    const db = getFirestore(app);
    const docRef = doc(db, "restaurants", accountID);

    // Code to create auth ID for new user in the account
    const authID = await createAuthID.module(email, password);
    if (!authID) return res.json({code: 501});

    // Update the superUsers list with the  new super user auth id created
    const successfulSecondStep = await registerNewAccountUser.module(
        docRef, {admins: arrayUnion(authID)});
    if (!successfulSecondStep) return res.json({code: 502});

    // Add the new super user in the super users collection
    const newAdminRef = await saveNewUser.module(db, "admins", {
      name, email, securityLevel: "Admin", authID,
    });
    if (!newAdminRef) return res.json({code: 503});

    // Retrieve new super user data to be returned
    const newAdminData = await getNewUserData.module(
        db, "admins", newAdminRef);

    return res.json({code: 204, data: newAdminData});
  } catch (error) {
    return res.json({code: 500});
  }
});

exports.module = createAdmin;
