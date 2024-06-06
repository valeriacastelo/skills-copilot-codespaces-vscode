// Create web server 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body parser
app.use(bodyParser.json());

// Use the static files
app.use(express.static('public'));

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.send('[]');
        } else {
            res.send(data);
        }
    });
});

// Add comment
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.send('[]');
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    res.send('[]');
                } else {
                    res.send('Comment added!');
                }
            });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});