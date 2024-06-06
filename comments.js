//Create a web server for comments 

//require express
const express = require('express');
const app = express();
const port = 3000;

//require body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//require the comments module
const comments = require('./comments.js');

//GET /comments - returns a JSON array of comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});

//POST /comments - creates a new comment
app.post('/comments', (req, res) => {
    const { comment } = req.body;
    comments.addComment(comment);
    res.status(201).json(comment);
});

//GET /comments/:id - returns a single comment with the id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.getComment(id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

//PUT /comments/:id - updates a single comment with the id
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    if (comments.updateComment(id, comment)) {
        res.json(comment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

//DELETE /comments/:id - deletes a single comment with the id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    if (comments.deleteComment(id)) {
        res.json({ message: 'Comment deleted' });
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});