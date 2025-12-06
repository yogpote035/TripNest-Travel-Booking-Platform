const UserModel = require("../../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GenerateToken = require("../../Middleware/GenerateToken");

module.exports.login = async (request, response) => {
    try {


        let { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ message: "All Fields are Required" });
        }

        const existingUser =await UserModel.findOne({ email: email });

        if (!existingUser) {
            return response.status(404).json({ message: "User Not Find With This Mail" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return response.status(401).json({ message: "Wrong Password Entered" });
        }

        const token = await GenerateToken(existingUser._id.toString());
        console.log("Token Receive from Generate token Function");

        response.status(200).json({
            message: "Login Successful",
            token: token,
            email: email,
            userId: existingUser._id
        })
    } catch (error) {
        console.log("Error in Login: ", error);
        return response.status(500).json({ message: `Internal Server Error: ${error}` })
    }
}


module.exports.signup = async (request, response) => {
    try {
        const { name, email, mobile, password } = request.body;
        console.log(request.body)
        if (!email || !password || !mobile || !name) {
            return response.status(400).json({ message: "All Fields are Required" });
        }

        const existingUser =await UserModel.findOne({ email: email });

        if (existingUser) {
            return response.status(409).json({ message: "User Found With This Mail" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name, email, mobile, password: hashPassword
        })

        await newUser.save();


        console.log("New User Created");
        console.log("Calling JWE from Signup");

        const token = await GenerateToken(newUser._id.toString());
        console.log("Token Receive in Signup Taken");

        response.status(200).json({
            message: "User Successfully Registered",
            email: newUser.email,
            token: token,
            userId: newUser.id
        })


    } catch (error) {
        console.log("Error in Signup: ", error);
        return response.status(500).json({ message: `Internal Server Error: ${error}` })
    }

}
