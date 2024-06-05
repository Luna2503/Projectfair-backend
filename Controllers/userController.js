const users = require('../Models/userSchema')
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    console.log("Inside userController: register function");
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existingUser = await users.findOne({ email: email });
        console.log("Existing user");
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json('Account already exist, please login')
        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            })
            await newUser.save()
            res.status(200).json("Registration request received successfully")
        }

    } catch (err) {
        res.status(401).json("Register request failed due to ", err)
    }
}

exports.login = async (req, res) => {
    console.log("Inside login controller function");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey12345')
            console.log(token);
            res.status(200).json({
                existingUser: existingUser,
                token: token
            })
        }
        else {
            res.status(406).json("Invalid email id or password")
        }
    } catch (err) {
        res.status(401).json("Login request failed due to", err)
    }
}