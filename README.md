Node Blogger is a light weight blog generator for Node.js that I created out of my frustrations with WordPress's bloatedness and never-ending updates. 

[![Build Status](https://travis-ci.org/qawemlilo/node-blogger.png)](https://travis-ci.org/qawemlilo/node-blogger)

## Features
 - Super fast, fetches posts memory
 - Mobile Responsive
 - Easily customisable by editing files in the `template` directory
 - Does not require a database
 - Easy to deploy (I'm hosting my blog on heroku for free)
 - Default template supports syntax Highlighting
 - Search engine friendly urls

DEMO: [http://blog.ragingflame.co.za](http://blog.ragingflame.co.za)

## Installation

First you need to download the repo
```
git clone https://github.com/qawemlilo/node-blogger.git
```

Then install dependencies
````
cd node-blogger && npm install
```

After installing dependencies, link the executable script to access it via the commandline
```
npm link
```

This will create a global command called `blogger`,  use it to set up the basic configs for your blog. This process will update `config.json` with your data.
```
// blogger [command]
blogger setup 
```
**Note:** You can run the script directly: `node bin/blogger [command]`.





## How it works
Node Blogger is super easy to use once you have installed it as shown above. When you create a new post, the data is logged in `posts.json`, which is our pseudo-database.

Create a new post from the commandline:

```
blogger new

# prompt
Title: My NodeJS adventures
Description: This is a brief description about the new post.
Categories: node.js, javascript
Date: 
```` 

 - Title: (String) - title of your new post (required)
 - Description: (String) - a brief description for your new post (optional, helps with SEO)
 - Categories: (String - csv) - categories for your post (optional, defaults to uncategorised)
 - Date: (Int - millisecs) - publishing date (optional, defaults to current time)
 
A new markdown file is created with some placeholding text. You can find that file in the `posts` directory, use it to write your post.

After you have finished writing your post in markdown format, compile it to html.

```
blogger build
```

Awesome! Now let's fire up the server.

```
node server.js
```

That's it, your blog in now up and running!


## Testing
 ```
 npm test
 ```


## Dependencies
 - EJS -  for templating
 - markdown-js - for parsing markdown files.
 - connect - for serving static files for the template
 - rss - blog rss feed
 
## Customisation
You can customise your blog by editing files in the `template` directory. Node blogger uses EJS for templating, `template/index.ejs` holds the template for the home page and `template/post.ejs` holds the template for posts. 


## Routing
The `routes.js` file contains the connect middleware for handling http requests.


## Commands
 - `setup` - (--setup, --s) the setupblog command sets up configuration for a new blog 
 - `newpost` - (--newpost, --new, --n) the newpost command creates the markdown file that will contain the new post. It also logs the new post in `posts.json`, our pseudo-database.
 - `build` - (--build, --b) the compile command generates the html files that are served by our http server. This command is intelligent because it only compiles files that have been modified or are new. If you modify any of the templates it will also know this and make changes accordingly when you compile.

## Server
`server.js` contains our http server which makes our blog posts available and accessible via a browser.


## Contributing
Fork and send me a pull request. Do not develop on the master branch.

 - For bugs and tweaks create new branch prefixed by `hotfix-`.
 - For new features create a new branch prefixed by `feature-`.
 

        
  
## Credits
Node blogger was inspired by [this post](http://tutorialzine.com/2013/03/simple-php-blogging-system) on http://tutorialzine.com.




## License

(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
