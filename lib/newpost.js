
var Post = require('./post'), prompt = require('simple-prompt');

    
module.exports = function () {
    "use strict";
    
    var questions = [
        {question:'title', required: true},
        {question:'description', required: true},
        {question:'categories', default: 'uncategorised'},
        {question:'date', default: Date.now()}
    ];
    
    
    prompt(questions, function (answers) {
        answers.categories = answers.categories.split(',');
        
        var newpost = new Post(answers);
        newpost.createPost();
    });
};
