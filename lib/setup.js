
var fs = require('fs'),
    prompt = require('simple-prompt'),
    path = require('path')
    config, 
    configquestions;


configquestions = [
  { question:'blogname', required: true},
  { question:'blogdescription', required: true},
  { question:'authorname', required: true },
  { question:'authorautobio', required: true},
  { question:'authoremail', required: true},
  { question:'authortwitter'},
  { question:'authorwebsite'}
];




/*
   This function prompts the user for input
   
   @param: (String) question - require input from the user.
   @param: (Function) callback - function which accepts user data
*/
function prompt(question, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function(data) {
    data = data.toString().trim();
    callback(stdin, data);
  });
}




/*
   Saves our config settings
   
   @param: (Object) obj - config object.
   @param: (Function) callback - function executed after saving the file 
*/
function saveConfig (obj, fn) {
    var jsonString = JSON.stringify(obj, null, 4);
        
    fs.writeFile('config.json', jsonString, function (error) {
        fn(error);        
    });
}




/*
   Removes all the demo posts
*/
function removeDemoPosts() {
    try { 
        var postsDir = './posts', filePath, files = fs.readdirSync(postsDir), i; 
    } catch(e) { 
        return; 
    }
    
    if (files.length > 0) {
        for (i = 0; i < files.length; i++) {
            filePath = postsDir + '/' + files[i];
            
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }

        try { 
            fs.writeFileSync('./posts.json', '[]', 'utf8');
        } catch(e) { 
            return; 
        }
    };
}



config = {
    blog: {
        name: 'Blog',
        description: 'Blog',
        baseUrl: '/',
        postsFolder: './posts',
        postsFile: './posts.json',
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




/*
   Main program
*/
function main() {
    var counter = 0, configquestionsLength = configquestions.length, question;

    function processVal (stdin, val) {
        var id = question.id;
      
        switch(id) {
            case 'blogname':
                val ? config.blog.name = val : null;
            break;
          
            case 'blogdescription':
                val ? config.blog.description = val : null;
            break;
          
            case 'authorname':
                val ? config.author.name = val : null;
            break;
          
            case 'authorautobio':
                val ? config.author.autobio = val : null;
            break;
          
            case 'authoremail':
               val ? config.author.email = val : null;
            break;
          
            case 'authortwitter':
               val ? config.author.twitterHandle = val : null;
            break;
          
            case 'authorwebsite':
                val ? config.author.website = val : null;
            break;
        }
    
        // if properties still available
        if (counter < (configquestionsLength - 1)) {
            question = configquestions[++counter];
            prompt(question.text, processVal);
        } 
        else {
            removeDemoPosts();
            
            saveConfig(config, function (error) {
                if (error) {
                    throw error;
                }
                
                console.log("\nYour blog has been successfully set up!")
            });
            
            stdin.end();
        }
    };
  
    question = configquestions[counter];
  
    prompt(question.text, processVal);
}




main();

