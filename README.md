# Node Blogger

Node Blogger is a small Node.js blogging engine that compiles markdown to html and does not use any database. When you create a new post, the data is logged in `posts.json`, which is our pseudo-database.

## Installation
```
git clone https://github.com/qawemlilo/node-blogger.git

cd node-blogger && npm install

npm link
# if you are using linux (I'm using ubuntu) you may need to use `sudo npm link`
```

## How it works
Node Blogger is super easy to use once you have installed it as shown above.

Firstly you need to create a new post:

```
# simply type the newpost command
newpost

# prompt
Title: My NodeJS adventures
Categories: node.js, javascript
Date: 
````

 - Title: is the title of your new post (required)
 - Categories: categories for your post (optional - will be used in a future feature)
 - Date: publishing date (optional - I included this so that I could move posts from my old blog)
 
A new markdown file is created with some placeholding text. You can find that file in the `posts` directory, use it to write your post.

After you have finished writing your post in markdown format, create an html file by running the `compile` command.

```
# This command will compile all the new and modified markdown files to html
compile
```

Awesome! Now its time to share your blog with the would, let's fire up the server.

```
node server.js
```

That's all, your blog in now up and running!

## Dependencies
 - EJS -  for templating
 - markdown-js - for parsing markdown files.
 - connect - for serving static files for the template
 - rss - blog rss feed
 
## Customisation
You can customise your blog by editing files in the `template` directory. Node blogger uses EJS for templating, `template/index.ejs` holds the template for the home page and `template/post.ejs` holds the template for posts. 


## Routing
The `routes.js` file contains connect middleware for handling http requests.

## Commands
`newpost` (bin/newpost) - the newpost command creates the markdown file that will contain the new post. It also log the new post in `posts.json`, our pseudo-database.

`compile` (bin/compile) - the compile command generates the html files that are served by our http server.

## Server
`server.js` contains our http server which makes our blog posts available via a browser.


## Contributing
Fork and send pull request. Do not make changes on the master branch.

For bugs and tweaks create new branch prefixed by `hitfix-`.

For new features create a new branch prefixed by `feature-`.

        
  
## Credits
Node blogger was inspired by [this post](http://tutorialzine.com/2013/03/simple-php-blogging-system) on http://tutorialzine.com.




## License

(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
