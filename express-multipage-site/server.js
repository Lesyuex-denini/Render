const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Allows JSON request handling

// Routes for HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blog.html')));

app.get('/blog-posts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json'); // Path to your posts.json file

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading blog posts:", err);
            return res.status(500).json({ error: "Error loading blog posts." });
        }

        try {
            const posts = JSON.parse(data); // Parse the JSON data
            res.json(posts); // Send the parsed JSON as a response
        } catch (parseError) {
            console.error("❌ Error parsing blog data:", parseError);
            res.status(500).json({ error: "Error parsing blog data." });
        }
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
