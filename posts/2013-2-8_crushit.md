A few weeks ago I wrote CrushIt, a Node CLI tool that crawls through a web page, concatinates all scripts and minifies them.

### Installation

    # Run the command below from your node terminal.
    npm install -g crushit

### CLI Example

Crushing scripts from on website.
    crushit http://www.ragingflame.co.za
    
### Program Example

You can also include CrushIt in your Node programs.
    var crushit = require("crushit");
 
    crushit.crushScripts("http://www.rflab.co.za", {
        beautify: true,
        max: false,
        comments: true,
        onComplete: function (error, code) {
            if (error) {
                console.log(error.msg);
            }
            else {
                console.log(code);
            }
        }
    });
    
I have created a web interface for a quick demo.

[DEMO](http://crushit-compiler.herokuapp.com)      [FORK it](https://github.com/qawemlilo/crushit)
