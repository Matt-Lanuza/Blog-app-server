const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");


// Register a user
module.exports.registerUser = async (req, res) => {
	try {
		const {  email, username, password } = req.body;

		if (!email || !email.includes("@")) {
			return res.status(400).send({ error: "Invalid email address" });
		}

		if (!username) {
			return res.status(400).send( {error: "Username is required" } )
		}

		if (!password || password.length < 8) {
		    return res.status(400).send({ error: "Password must be at least 8 characters long" });
		}

		const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
		const newUser = new User({
		    email,
		    username,
		    password: hashedPassword,
		});

		await newUser.save();
		res.status(201).send({ message: 'Registered successfully' });
		

	} catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}