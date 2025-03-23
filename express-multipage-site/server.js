const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

const fs = require('fs');

app.get('/blog', (req, res) => {
    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error loading blog posts");
        }
        try {
            const posts = JSON.parse(data);
            let html = '<h1>Blog Page</h1><ul>';
            posts.forEach(post => {
                html += `<li><h2>${post.title}</h2><p>${post.content}</p></li>`;
            });
            html += '</ul>';
            res.send(html);
        } catch (parseError) {
            res.status(500).send("Error parsing blog data");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
