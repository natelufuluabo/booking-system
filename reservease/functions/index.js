const checkIfEmailAlreadyUsed = require("./functions/email_check");
const createRestaurantAccount = require(
    "./functions/restaurant_account_creation");
const createSuperUser = require("./functions/superUser_account_creation");
const createAdmin = require("./functions/admin_account_creation");

exports.checkIfEmailAlreadyUsed = checkIfEmailAlreadyUsed;

exports.createRestaurantAccount = createRestaurantAccount;

exports.createSuperUser = createSuperUser;

exports.createAdmin = createAdmin;
