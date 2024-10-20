import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCokie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user without hashing the password
        const newUser = new User({
            fullName,
            username,
            password :hashedPassword, // Use plain text password (not recommended)
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Save the new user
        if(newUser){
           await generateTokenAndSetCokie(newUser._id,res);
            await newUser.save();

        // Respond with user information
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
        }else{
            res.status(400).json({error:"invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller:", error); // Log full error for debugging
        res.status(500).json({ error: "Something went wrong" }); // Use 500 status for server errors
    }
};

export const login = async (req, res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"user and password is wrong"});
        }

        generateTokenAndSetCokie(user._id,res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            // password:user.password,
            profilePic: user.profilePic,
        });

    }catch (error) { 
        console.log("Error in login controller:", error); // Log full error for debugging
        res.status(500).json({ error: "Something went wrong" });
    }
    // Implement login logic here
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0                  })
        res.status(200).json({message:"Logged out sucesfully"})
        
    } catch (error) {
        console.log("Error in login controller:", error); // Log full error for debugging
        res.status(500).json({ error: "Something went wrong" });
        
    }
    console.log("Log out");
    // Implement logout logic here
};
