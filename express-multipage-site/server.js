const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Blog route - dynamically loads posts from JSON
app.get('/blog', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading blog posts:", err);
            return res.status(500).send("Error loading blog posts.");
        }

        try {
            const posts = JSON.parse(data);
            let html = `
                <html>
                <head>
                    <title>Blog Page</title>
                    <link rel="stylesheet" href="/styles.css">
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; color: #333; }
                        .blog-post { border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
                        .blog-post h2 { color: #007bff; }
                    </style>
                </head>
                <body>
                    <h1>Blog Page</h1>
                    <div class="blog-container">
            `;
            posts.forEach(post => {
                html += `
                    <div class="blog-post">
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                    </div>
                `;
            });
            html += `</div></body></html>`;
            res.send(html);
        } catch (parseError) {
            console.error("Error parsing blog data:", parseError);
            res.status(500).send("Error parsing blog data.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
