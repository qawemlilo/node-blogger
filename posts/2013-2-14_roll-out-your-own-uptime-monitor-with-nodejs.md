*"The Node bug has bitten me."*

While going through a friend's blog recently, I bumped into a post titled ['Yo Dawg!, your site is down?'](http://www.edmoremoyo.com/blog/yo-dawg-your-site-is-down) in which he talks about writing a CLI script for checking the availability of his websites. I love home grown solutions that solve our day to day problems and this post left me inspired to write my own uptime monitor.

Today I will take you through a step by step process of creating a NodeJS app/bot for monitoring my websites. The app/bot will send me an email whenever a site is down. The app repo will be hosted on github and once it is complete we'll deploy it to Heroku.

### The Set Up

Create a directory for the app, I named mine `ping`. Inside the directory create another directory named `lib` and 3 files: `README.md`, `package.json`, and `app.js`.

The `package.json` file will be used by npm (a package manger used by Node) for metadata purposes as well as to install all dependencies. The `lib` directory is where we'll place most of the app code.

Inside the `ping/lib` directory create a file named `ping.js`, this is where we'll write the main code that drives the app.

Now our repo looks something like this:

    /ping
        README.md
        app.js
        package.json
        /lib
            ping.js 
  
### Package.json

This is how our package.json file looks like.

    {
       "name":"Ping",
       "version":"0.0.1",
       "description":"Node uptime monitor",
       "main":"app.js",
       "repository":{
          "type":"git",
          "url":"https://github.com/qawemlilo/ping.git"
       },
       "keywords":[
          "uptime",
          "monitor"
       ],
       "dependencies":{
          "request":"~2.12.0",
          "nodemailer":"0.3.x"
       },
       "author":"Qawelesizwe Mlilo",
       "license":"MIT",
       "engines":{
          "node":"0.8.x",
          "npm":"1.1.x"
       }
    }
    
The important thing to note from `package.json` is that our app is going to use 2 dependencies:

  1. Request: - a very good and popular HTTP request client. It will be used to make GET http requests to load my websites.
  2. Node Mailer: - a Node module for sending emails.

The `README.md` file is for documentation purposes, for this project just write the app name and save it.

Let's get cracking by initializing git on our project - open your git terminal and navigate to the root of the repo.

    cd /path/to/ping && git init
    git add .
    commit -m 'First commit - let us get pinging'
    
Next up we need to install dependencies.

    npm install
    
### Ping.js

An instance of Ping will send GET http requests at regular intervals and log the results. If the request fails an email will be sent out to you.

First let's load some modules and create a basic Constructor function.

    var request = require('request'),
        statusCodes = require('http').STATUS_CODES;
 
    /*
        Ping Constructor
    */
    function Ping (opts) {
        // holds website to be monitored
        this.website = '';
     
        // ping intervals in minutes
        this.timeout = 15;
     
        // interval handler
        this.handle = null;
     
        // initialize the app
        this.init(opts)
    }
    
We start with 3 properties whose purpose is explained in comments. The options that are passed when an instance is created are used by the `Ping.init` method to assign the website and timeout values.

    /*
        Methods
    */
    Ping.prototype = {
        init: function (opts) {
            var self = this;
     
            self.website = opts.website;
     
            self.timeout = (opts.timeout * (60 * 1000));
     
            // start monitoring
            self.start();
        },
        
Once the `Ping.init` method has assigned website and timeout values according the app is ready to start sending requests and promptly calls the `Ping.start` method.

    start: function () {
        var self = this,
            time = Date.now();
     
        console.log("\nLoading... " + self.website + "\nTime: " + time + "\n");
     
        // create an interval for pings
        self.handle = setInterval(function () {
            self.ping();
        }, self.timeout);
    },
    
The `Ping.start` method is pretty straight forward, it logs the loading message and creates intervals that call the method `Ping.ping`.

`Ping.ping` uses `request` to load a website, if the request is successful `Ping.isOk` is called otherwise `Ping.isNotOk` is called.

        ping: function () {
            var self = this, currentTime = Date.now();
     
            try {
                // send request
                request(self.website, function (error, res, body) {
                    // Website is up
                    if (!error && res.statusCode === 200) {
                        self.isOk();
                    }
     
                    // No error but website not ok
                    else if (!error) {
                        self.isNotOk(res.statusCode);
                    }
     
                    // Loading error
                    else {
                        self.isNotOk();
                    }
                });
            }
            catch (err) {
                self.isNotOk();
            }
        },
     
     
        isOk: function () {
            this.log('UP', 'OK');
        },
     
     
        isNotOk: function (statusCode) {
            var time =  Date.now(),
                self = this,
                time = self.getFormatedDate(time),
                msg = statusCodes[statusCode + ''],
     
                htmlMsg = '<p>Time: ' + time;
                htmlMsg +='</p><p>Website: ' + self.website;
                htmlMsg += '</p><p>Message: ' + msg + '</p>';
     
            this.log('DOWN', msg);
     
            // Send admin and email
            mailer({
                from: 'uptime-robot@rflab.co.za',
                to: 'qawemlilo@gmail.com',
                subject: self.website + ' is down',
                body: htmlMsg
            }, function (error, res) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(res.message || 'Failed to send email');
                }
            });
        },
     
     
        log: function (status, msg) {
            var self = this,
                time = Date.now(),
                output = '';
     
            output += "\nWebsite: " + self.website;
            output += "\nTime: " + time;
            output += "\nStatus: " + status;
            output += "\nMessage:" + msg  + "\n";
     
            console.log(output);
        },
     
     
        getFormatedDate: function (time) {
            var currentDate = new Date(time);
     
            currentDate = currentDate.toISOString();
            currentDate = currentDate.replace(/T/, ' ');
            currentDate = currentDate.replace(/\..+/, '');
     
            return currentDate;
        }
    }
     
    module.exports = Ping;
    
`Ping.isNotOk` calls a mailer module that I have created - inside the `lib` directory create a file named `mailer.js` and open it up in your text editor.

This module uses nodemailer to send emails and I have chosen to use Gmail SMTP. Please read more about how nodemailer works on [this page](http://blog.nodeknockout.com/post/34641712180/sending-email-from-node-js). The config file contains my Gmail email and application password.

### lib/mailer.js
    var nodemailer = require('nodemailer'),
        config = require('../config'),
        mailer;
     
    mailer = function (opts, fn) {
     
        var mailOpts, smtpTrans;
     
        // nodemailer configuration
        try {
            smtpTrans = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: config.email,
                    pass: config.password
                }
            });
        }
        catch (err) {
            fn('Nodemailer could not create Transport', '');
            return;
        }
     
        // mailing options
        mailOpts = {
            from: opts.from,
            replyTo: opts.from,
            to: opts.to,
            subject: opts.subject,
            html: opts.body
        };
     
        // Send maail
        try {
            smtpTrans.sendMail(mailOpts, function (error, response) {
                //if sending fails
                if (error) {
                fn(true, error);
                }
                //Yay!! message sent
                else {
                    fn(false, response.message);
                }
            });
        }
        catch (err) {
            fn('Nodemailer could not send Mail', '');
        }
    };
     
    module.exports = mailer;
    
Create a file named `config.js` in the root directory of the app.

    module.exports = {
        email: 'your-handle@gmail.com',
        password: 'xxxxxxxx'
    };
    
Back to `lib/ping.js`, let us include the mailer module at the top of the file.

    var request = require('request'),
        statusCodes = require('http').STATUS_CODES,
        mailer = require('./mailer');    // this line loads mailer.js
        
So far so good, our application can now load a website at regular intervals and if the request fails send out an email.

#### App.js

At the beginning of this post we created a file named `app.js`, this is the file that Node will execute to get our app started. The app uses the forEach method to iterate over the list of websites, create a Ping instance for each website and store it in the monitors array.

    var Ping = require('./lib/ping'),
        websites = [
            {
                url: 'http://www.bookmarkmanager.co.za',
                timeout: 5
            },
            {
                url: 'http://crushit-compiler.herokuapp.com',
                timeout: 1
            }
        ],
        monitors = [];
     
    websites.forEach(function (website) {
        var monitor = new Ping ({
            website: website.url,
            timeout: website.timeout
        });
     
        monitors.push(monitor);
    });
    
The proof is in the pudding - from your terminal let's start the app with node.

    node app.js
    
#### Improving the app

Our app is now fully functional but there are a few issues. The app is not accessible via the browser and the websites array will clutter my code once I start adding more websites.
The solution is to create an http server and move my websites list to an external file.

    var Ping = require('./lib/ping'),
        websites = require('./websites'),
        http = require('http'),
        server,
        port = process.env.PORT || 3008,
        monitors = [];
     
    websites.forEach(function (website) {
        var monitor = new Ping ({
            website: website.url,
            timeout: website.timeout
        });
     
        monitors.push(monitor);
    });
     
    server = http.createServer(function (req, res) {
        var data = "Monitoring the following websites: \n \n" + websites.join("\n");
     
        res.end(data);
    }); 
     
    server.listen(port);
    console.log('Listening to port %s', port);
    
### websites.js
    /*
        List of websites to be monitored
    */
    module.exports = [
        {
            url: 'http://www.rflab.co.za',
            timeout: 15
        },
     
        {
            url: 'http://www.bookmarkmanager.co.za',
            timeout: 15
        },
     
        {
            url: 'http://crushit-compiler.herokuapp.com',
            timeout: 15
        },
     
        {
            url: 'http://node-ping.herokuapp.com',
            timeout: 5
        },
        {
            url: 'http://www.sanatural.co.za/home/',
            timeout: 15
        }
    ];
    
Now when you access the app from a browser you get a list of all monitored websites.

Another option that you might like to have is the ability to stop a running monitor, let us get back to `lib/pings.js` and add a method to do just that.

    stop: function () {
        clearInterval(this.handle);
        this.handle = null;       
    }
    
We also need to modify the Constructor so that it returns its object.

    /*
        Ping Constructor
    */
    function Ping (opts) {
        // holds website to be monitored
        this.website = '';
     
        // ping intervals in minutes
        this.timeout = 15;
     
        // interval handler
        this.handle = null;
     
        // initialize the app
        this.init(opts);
     
        return this;
    }
    
That's it - an instance of Ping can now be stopped by calling `Ping.stop`.

### Deploying the app

Heroku is an awesome cloud platform for hosting apps and they offer a free package for small apps that run on a single dyno. There is a detailed guide on their website on how to deploy your Node projects: [https://devcenter.heroku.com/articles/nodejs](https://devcenter.heroku.com/articles/nodejs).

Once you have set up heroku on your computer you can now deploy the app.

    heroku create
    git push heroku master
  
**Pro Tip:** If your application is inactive for about an hour, heroku puts it offline. Add your application address to the list of monitored websites to ensure that it doesn't stop working.

### Challenge

Here is a challenge for you to get your hands dirty with Node - create a web interface for adding and removing websites to the monitored list.

I hope this article has demonstrated how easy and fun it is to create apps with Node.js, now I don't need to pay a third party service to monitor my websites.

[Fork on Github](https://github.com/qawemlilo/node-ping/tree/v0.1.4)
