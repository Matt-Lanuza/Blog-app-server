const express = require('express');
const userController = require("../controllers/user");
const { verify } = require("../auth");

const router = express.Router();

// Register a user
router.post('/register', userController.registerUser)

// Login a user
router.post('/login', userController.loginUser);

// Get user details
router.get('/details', verify, userController.getUserDetails);



module.exports = router;