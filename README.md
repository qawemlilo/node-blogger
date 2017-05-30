Node Blogger is a light weight blog generator for Node.js that I created out of my frustrations with WordPress's bloatedness and never-ending updates.

[![Build Status](https://travis-ci.org/qawemlilo/node-blogger.png)](https://travis-ci.org/qawemlilo/node-blogger)

## Features

[![Greenkeeper badge](https://badges.greenkeeper.io/qawemlilo/node-blogger.svg)](https://greenkeeper.io/)
 - Super fast, fetches posts from memory
 - Easily customisable by editing files in the `template` directory
 - Does not require a database
 - Easy to deploy (I'm hosting my blog on heroku for free)
 - Default template is Mobile Responsive
 - Default template supports syntax Highlighting
 - Search engine friendly urls

DEMO: [http://blog.ragingflame.co.za](http://blog.ragingflame.co.za)

ALSO SEE: [How I built my static blog engine](http://blog.ragingflame.co.za/2015/12/6/how-i-built-my-static-blog-engine)

## Installation

First you need to download the repo
```
git clone https://github.com/qawemlilo/node-blogger.git
```

Then install dependencies
````
cd node-blogger && npm install
```

Set up your blog by running the command below. This process will update `config.json` with your data.
```
npm run setupblog
```


## How it works
Node Blogger is super easy to use once you have installed it as shown above. When you create a new post, the data is logged in `posts.json`, which is our pseudo-database.

Create a new post from the commandline:

```
npm run newpost

# prompt
Title: My NodeJS adventures
Description: This is a brief description about the new post.
Categories: node.js, javascript
Date:
````

 - Title: (String) - title of your new post (required)
 - Description: (String) - a brief description for your new post (optional, helps with SEO)
 - Categories: (String - csv) - categories for your post (optional, defaults to uncategorised)
 - Date: (Int - millisecs) - publishing date (optional, defaults to current date)

A new markdown file is created with some placeholder text. You can find that file in the `posts/md` directory - use it to write your post.

After you have finished writing your post in markdown format, compile it to html.
```
npm run compile
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

## Customisation
You can customise your blog by editing files in the `template` directory. Node blogger uses EJS for templating, `template/index.ejs` holds the template for the home page and `template/post.ejs` holds the template for posts.


## Routing
The `routes.js` file contains the connect middleware for handling http requests.


## Server
`server.js` contains our http server which makes our blog posts available and accessible via a browser.


## Contributing
Fork and send me a pull request. Do not develop on the master branch.

 - For bugs and tweaks create new branch prefixed by `hotfix-`.
 - For new features create a new branch prefixed by `feature-`.


## License

(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
