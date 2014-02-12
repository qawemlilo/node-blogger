
var fs = require('fs'),
    prompt = require('simple-prompt'),
    path = require('path'),
    config, 
    configquestions,
    postsDir = path.resolve(__dirname, '../posts'),
    db = path.resolve(__dirname, '../posts.json');

    


    
config = {
    blog: {
        name: 'Blog',
        description: 'Blog',
        baseUrl: '/',
        postsFolder: postsDir,
        postsFile: db,
        url: 'http://localhost:3080',
        rss: '/rss',
        rssLimit: 10
    },
    author: {
        name: 'Author',
        autobio: 'Author autobio here.',
        email: 'none@none.com',
        twitterHandle: '#',
        website: '#',
        facbookPage: '#',
        googlePage: '#',
        avatar: '/img/avatar.png'
    },
    showDate: true,
    showPagination: true,
    showShareButtons: true,
    showFacebookButton: false,
    showTwitterButton: true,
    showGoogleButton: true,
    showRssButton: true
};
 
configquestions = [
  {question:'blogname', required: true},
  {question:'blogdescription', required: true},
  {question:'authorname', required: true},
  {question:'authorautobio', required: true},
  {question:'authoremail', required: true},
  {question:'authortwitter'},
  {question:'authorwebsite'}
];





/*
   Saves our config settings
   
   @param: (Object) obj - config object.
   @param: (Function) callback - function executed after saving the file 
*/
function saveConfig (obj, fn) {
    "use strict";
    
    var key, jsonString;
    
    
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            config[key] = obj[key];
        }
    }
    
    jsonString = JSON.stringify(config, null, 4);
        
    fs.writeFile('config.json', jsonString, function (error) {
        fn(error);        
    });
}




/*
   Removes all the demo posts
*/
function removeDemoPosts() {
    "use strict";
    
    var file, 
        files = fs.readdirSync(postsDir), 
        i;
    
    if (files.length > 0) {
        for (i = 0; i < files.length; i++) {
            file = path.join(postsDir, files[i]);
            
            if (fs.statSync(file).isFile()) {
                fs.unlinkSync(file);
            }
        }

        try { 
            fs.writeFileSync(db, '[]', 'utf8');
        } catch(e) { 
            throw e; 
        }
    }
}




/*
   Main program
*/
module.exports = function () {
    "use strict";
    
    removeDemoPosts();
  
    prompt(configquestions, function (answers) {
        saveConfig(answers, function (error) {
            if (error) {
                throw error;
            }
            
            console.log("\nYour blog has been successfully set up!");
        });
    });
};


