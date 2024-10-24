require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");
const Note = require("./models/notes.model"); // Ensure this path is correct


const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB with error handling
mongoose.connect(config.connectString)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Create an Account
app.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.json({ error: true, message: "User already exists" });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({ error: false, user, accessToken, message: "Registration Successful" });
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login an Account
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const userInfo = await User.findOne({ email });
    if (!userInfo || userInfo.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ user: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({ error: false, message: "Login Successfully", email, accessToken });
});

// Add Note
app.post("/add-notes", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.user; // Assuming user is attached to req from the token

    if (!title || !content) {
        return res.status(400).json({ error: true, message: "Title and content are required" });
    }

    try {
        const note = new Note({ // Ensure you're calling the Note constructor here
            title,
            content,
            userId, // Correctly assigning userId from req.user
        });

        await note.save();

        return res.json({ error: false, note, message: "Note added successfully" });
    } catch (error) {
        console.error("Error adding note:", error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
