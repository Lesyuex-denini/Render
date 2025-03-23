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

// API route to fetch blog posts (returns JSON)
app.get('/api/blog-posts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading blog posts:", err);
            return res.status(500).json({ error: "Error loading blog posts." });
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts); // Send JSON data
        } catch (parseError) {
            console.error("❌ Error parsing blog data:", parseError);
            res.status(500).json({ error: "Error parsing blog data." });
        }
    });
});

// Handle 404 - Page Not Found
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>404 - Not Found</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: red; }
                a { text-decoration: none; color: #007bff; }
            </style>
        </head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Go Back Home</a>
        </body>
        </html>
    `);
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
