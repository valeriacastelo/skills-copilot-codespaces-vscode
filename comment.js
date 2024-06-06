//Create a web server

//Importing express
const express = require('express');

//Creating the express server
const app = express();

//Importing body-parser
const bodyParser = require('body-parser');

//Adding body-parser to the express server
app.use(bodyParser.json());

//Importing the comment.js file
const comment = require('./comment.js');

//Creating a new comment
app.post('/comment', function(req, res){
    comment.createComment(req.body, function(err, data){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

//Reading all comments
app.get('/comment', function(req, res){
    comment.getAllComments(function(err, data){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

//Reading a single comment
app.get('/comment/:id', function(req, res){
    comment.getSingleComment(req.params.id, function(err, data){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

//Updating a single comment
app.put('/comment/:id', function(req, res){
    comment.updateComment(req.params.id, req.body, function(err, data){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

//Deleting a single comment
app.delete('/comment/:id', function(req, res){
    comment.deleteComment(req.params.id, function(err, data){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

//Listening to the server
app.listen(3000, function(){
    console.log('Server is running on port 3000');
});