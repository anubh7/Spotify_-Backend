const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

async function register(req,res){
    try{
        const {username,email,password,role="user"}=req.body;
        const existingUser=await userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await userModel.create({
            username,
            email,
            password:hashedPassword,
            role
        });

        const token=jwt.sign({
            id:newUser._id,
            role:newUser.role
        },process.env.JWT_SECRET)
        res.cookie("token",token);
        res.status(201).json({message:"User created successfully",
            token:token, //yeh token response me bhej rahe hain taki Postman/frontend ise Authorization header me use kar sake
            newuser:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                role:newUser.role
            }

        });
    }
        catch(error){
        console.error("Error in register function:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

async function login(req,res){
    try{
        const {username,email,password}=req.body;
        const user=await userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        });
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        //yeh bcrypt.compare() function ka use karke password ko compare kar raha hai jo user ne login ke time provide kiya hai aur jo password database me stored hai. Agar password match nahi karta to user ko "Invalid credentials" ka message bhej raha hai.
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET)
        res.cookie("token",token);
        res.status(200).json({message:"User logged in successfully",
            token:token, //yeh token response me bhej rahe hain taki Postman/frontend ise Authorization header me use kar sake
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        });

    } catch(error){
        console.error("Error in login function:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

async function logoutuser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out successfully"
    })
}



module.exports={register,login,logoutuser};