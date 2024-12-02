const express = require('express');
const userController = require("../controllers/user");
const { verify } = require("../auth");

const router = express.Router();

// Register a user
router.post('/register', userController.registerUser)



module.exports = router;