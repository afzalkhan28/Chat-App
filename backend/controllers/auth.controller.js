import User from "../models/user.model.js";

export const login = (req,res) => {
    console.log("Login");
}

export const signup =  async(req,res) => {
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwors not match"})
        }

        const user = await User.findOne({username});

        if (user){
            return res.status(400).json({error:"User already exist"})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,


        })

        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })

    } catch (error){
        console.log("Eroen in controller", error.message);
        res.status(200).json({error:"something error"})
        

    }

    

    console.log("Sign Up");
    
}

export const logout = (req,res)  => {
    console.log("Log out");
    
}
