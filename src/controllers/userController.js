import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import roles from "../config/constants.js";
import generateToken from "../utils/generateToken.js";
//register user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

      let assignedRole = role || roles.user; // default role: user
    if (email === "admin@gmail.com") {
      assignedRole = roles.admin; // admin override
    }


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: assignedRole
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//login

export const loginUser = async (req,res)=>{
    const {email,password}=req.body;

    try{
        //check if user exists
        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }


        //check password
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"});
        }

        //create token
        const token=generateToken(user._id);
        
        const { password: removePassword, ...others } = user._doc;
        res.status(200).json({...others,token});

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }

    
}



//get all users

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
      success: true,
      data: users,
    });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};


//update user

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    await user.save();
    res.status(200).json({ 
        message: "User updated successfully" ,
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//delete user

export const deleteUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
  
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};