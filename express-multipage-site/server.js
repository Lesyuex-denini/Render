const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, 'data', 'posts.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));

app.get('/blog-posts', (req, res) => {
    console.log("Attempting to read file at:", filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading blog posts:", err);
            return res.status(500).json({ error: "Error loading blog posts." });
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts);
        } catch (parseError) {
            console.error("❌ Error parsing blog data:", parseError);
            res.status(500).json({ error: "Error parsing blog data." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
