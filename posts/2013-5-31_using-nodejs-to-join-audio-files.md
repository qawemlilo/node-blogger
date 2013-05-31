Today I decided to clean up and organise files on my windows machine at work. This process involved deleting files I no longer have use for and grouping the rest in folders.  So I ended up with folders for audio, video, projects, ebooks, e.t.c.

One of the folders that I opened contained about 50 small mp3 files. Before deleting the files I had to play them just to make sure they didn't contain anything important. What do I know, turns out they are clips of a DHH(the RoR creator) interview - please don't ask me how they got to my computer.  He's quite an opinionated guy and I decided I wanted to keep the files. But 50 files? Wouldn't it be nice if I could glue them together into a single file? Well, being the hacker that I am I popped open my terminal and started writing a program.

I broke down the task to two main parts.

 1. Read and sort the files according to their sequence
 2. Some how combine the files and write them to a single file
 
The first part turned out to be quite easy because the files were named with a date/time stamp in the following format: `Mon Jan 03 10;02;07 2011.mp3`. This meant that I could extract the time from the file names and sort them accordingly. To simplify this further I decided to rename the files with an easier format for sorting - for this I created the `rename.js` file:

    /*
       I placed all the audio files in ./files directory
    */
    var fs = require('fs'),
        files = fs.readdirSync('./files');

    files.forEach(function (file) {
        var currentname = './files/' + file, 
            date = parseDate(file),
            newname = './files/' + date.split(';').join('') + '.mp3';

        renameFile(currentname, newname); 
        console.log('Renamed ' + currentname + ' to ' + newname);    
    }); 

    /*
        This function renames a file
    
        @param: (String) currentname - current file name
        @param: (String) newname - new file name     
    */
    function renameFile(currentname, newname) {
        fs.renameSync(currentname, newname);
    }

    /*
        Extracts date/time from file name string
        
        @param: (String) filename - file name 
    */
    function parseDate(name) {
        var date = name.substring(11, 19);
    
        return date;
    }

    console.log('Done');
    
Up next I had to create the main program that combines the files and writes them to a single file. Streams to the rescue! 

### What are streams? 

Streams are a powerful feature in Node.js, they create a transportation system that moves your data in chunks. The source of the data is a readable stream and the destination a writable stream. The file system module has 2 methods that you can use to take advantage of Node streams, `fs.createReadStream` and `fs.createWriteStream`. I created a new file for the main program,  `stream.js` 

    var fs = require('fs'),
        files = fs.readdirSync('./files'),
        clips = [],
        stream,
        currentfile,
        dhh = fs.createWriteStream('./dhh-interview.mp3');

    // create an array with filenames (time)
    files.forEach(function (file) {
        clips.push(file.substring(0, 6));  
    });

    // Sort
    clips.sort(function (a, b) {
        return a - b;
    });

    // recursive function
    function main() {
        if (!clips.length) {
            dhh.end("Done");
            return;
        }
    
        currentfile = './files/' + clips.shift() + '.mp3';
        stream = fs.createReadStream(currentfile);
    
        stream.pipe(dhh, {end: false});
    
        stream.on("end", function() {
            console.log(currentfile + ' appended');
            main();        
        });
    }


    main();
    
That's it. Lastly I needed to run my programs.

    node rename.js && node stream.js

**Note:** I have included a few files in [my repo](https://github.com/qawemlilo/node-streams) so that you can be able to try this out.
