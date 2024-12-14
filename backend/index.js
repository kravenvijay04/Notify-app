require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

const User = require("./models/user.model")
const Note = require("./models/notes.model")

mongoose.connect(config.connectString)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

const express = require("express");
const cors = require("cors");
const web = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

web.use(express.json());

web.use(
    cors({
        origin: "*",
    })
);

web.get("/", (req, res) => {
    res.json({
        data: "hello",
    })
});

web.post("/create-account", async (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "Use;r already exist",
        });
    }

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    })
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Succesful"
    })

})

web.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        })

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    }
    else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
})

web.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            fullname: isUser.fullName,
            email: isUser.email,
            "_id": isUser._id,
            createdOn: isUser.createdOn
        }, message: "",
    });
})

web.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" })
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            userId: user._id,
        })
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
})

web.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }

})

web.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({
            userId: user._id
        }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

web.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

web.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }


        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

web.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ]
        })

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
})


web.listen(8000);

module.exports = web;
