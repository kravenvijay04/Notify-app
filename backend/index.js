require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");
const Note = require("./models/notes.model");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB with error handling
mongoose.connect(config.connectString)
    .then()
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

//Create an Account
app.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) {
            return res.status(400).json({ error: true, message: "Full Name is required" });
        }
        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ error: true, message: "Password is required" });
        }

        const isUser = await User.findOne({ email: email });
        if (isUser) {
            return res.json({
                error: true,
                message: "User already exists",
            });
        }

        const user = new User({
            fullName,
            email,
            password,
        });

        await user.save();

        const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Registration Successful",
        });
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


//login an Account
app.post("/login",async(req,res)=>{
    const{email,password}=req.body;

    if(!email){
        return res.status(400).json({message:"Email is required"});

    }
    if(!password){
        return res.status(400).json({message:"password is required"});

    }
    const userInfo = await User.findOne({email:email});
    if(!userInfo){
        return res.status(400).json({message:"User not found"});
    }
    if(userInfo.email == email && userInfo.password==password ){
        const user = {user:userInfo};
        const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"36000m",
        });

        return res.json({
            error:false,
            message:"Login Succesfully",
            email,
            accessToken,
        });
    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid Credentials",
        })
    }
});

//Add Note
app.post("/add-notes",authenticateToken,async(req,res)=>{
    const {title,content,}=req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error:true,message:"Title is required"});
    }

    if(!content){
        return res.status(400).json({error:true,message:"Content is required"});
    }

    try{
        const note = new Note({
            title,
            content,
            userId:user._id
        })

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note added successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:'Internet server Error',
        });
    }

})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
