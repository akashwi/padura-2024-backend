// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Enable express to parse json body
app.use(express.json());

// Read lyrics from the JSON file
const readLyrics = () => {
    const lyricsData = fs.readFileSync("lyrics.json");
    return JSON.parse(lyricsData).lyrics;
};

// Save the first lyric in a variable
let currentLyric = readLyrics()[0];

// API endpoint for getting the current lyric
app.get("/api/lyrics", (req, res) => {
    console.log(`GET /api/lyrics: ${currentLyric}`);
    res.json({ lyric: currentLyric });
});

// API endpoint for updating the current lyric
app.get("/api/lyrics/:number", (req, res) => {
    const number = parseInt(req.params.number);
    const lyrics = readLyrics();
    if (number >= 0 && number < lyrics.length) {
        currentLyric = lyrics[number];
        console.log(`GET /api/lyrics/${number}: ${currentLyric}`);
        res.json({ lyric: currentLyric });
    } else {
        res.status(400).json({ error: 'Invalid lyric number.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});