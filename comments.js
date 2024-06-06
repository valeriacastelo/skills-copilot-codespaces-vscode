//Create a web server 
const express = require('express');
const app = express();
const port = 3000;

//Create a variable to store the comments
let comments = [];

//Create a POST route to add comments
app.post('/comments', (req, res) => {
    comments.push(req.body.comment);
    res.send('Comment added');
});

//Create a GET route to retrieve comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

//Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});