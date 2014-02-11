

/*
   This program is a modification of a gist credited below.
   @credit: https://gist.github.com/jay3sh/1236634
   bin
*/


var Post = require('./post'),
    prompt = require('simple-prompt');

    
function main() {
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
}


module.exports = main;
