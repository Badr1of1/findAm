const express = require("express");
const router = express.Router()

const {signUp} = require("../controllers/user");

router.route("/signup").post(signUp)


module.exports = router



/////todo: POST /signup: Create a new user account.
//todo: POST /login: Authenticate a user and generate a token.
//todo: GET /user/profile: Retrieve the profile of the authenticated user.
//todo: PUT /user/profile: Update the profile of the authenticated user.