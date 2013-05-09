# Node Blogger

Node Blogger is a small Node.js blogging engine that compiles markdown to html.

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
 
A new markdown file is created with some placeholding text. You can find that file in the `/posts` directory, use it to write your post.

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


## Customisation
You can customise your blog by editing files in the `/template` directory.

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
