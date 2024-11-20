
const bcrypt = require('bcryptjs');
const user = require('../model/user');


//here start from registration user
const registerUser = async (req, res) => {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    
    //check for password confirmation match
    if (password !== confirmpassword) {
        return res.status(400).json({ message: "password do not match" })

    }
    try {
        //check if email already user exists
        const emailExists = await user.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ message: "email is already registered" })
        }
        //has the password
        // what is salt?
        //A salt is a random piece of data added to a password before its hashed. it serves as an additional input to the hashing function.The primary purpose of salt is to make each hashed password unique,even if two users have the same password.

        //Prevents Identical Hashes:without salt, if two users have the same password(e.g,"password 123"),their hashed passwords would also to be the same.This could allow attackers to guess passwords more easily or use precomputed hashes(known as rainbow tabel)to crack them
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //The number 10 here is the "salt rounds"
        //A higher number means more rounds of computation,which makes the process slower and more secure but also more resource-intensive
        //By default,10 rounds are often conmsidered a good balance between security and performance.
        //So,bcrypt.genSalt(10)generates a salt with 10 rounds,which is strong enough for most use cases
        //bcrypt.hash(password,salt):
        //This function takes the original password and the generated salt,cobines them, and hashes them together.

        //create new user with hashed password
        const newUser = await user.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'user registered successfully', data: newUser
        });
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }

};
//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const userExists = await user.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "invalid email" })

        }
        //compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" })
        }
        //successfull login
        res.json({ message: "login successfully", data: userExists })
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}
module.exports = {
    registerUser,
    loginUser
}