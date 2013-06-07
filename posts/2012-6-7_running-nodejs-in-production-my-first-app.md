Love it or hate, you just cannot ignore JavaScript, there are countless tools and languages that compile to JavaScript popping up everywhere. Being a JavaScript lover it was only natural that I got really excited when Node.js was released. If you are not familiar with Node.js head over to [http://nodejs.org](http://nodejs.org) and find what it's all about.

This article is not a fan-boy rant but rather a documentation of how I'm using Node.js to make real world apps.

### My Environment
My first taste of Node was on a Windows XP machine, when the Node Windows installer became available I downloaded it and started experimenting and writing small programs. Everything worked out fine but running everything locally became a bit of a bore so earlier this year I signed up for a VPS with my web hosting company so that I could start using Node in production.

### Server Specs
 - CentOS
 - 2 vCPUs
 - 4 Gig RAM
 - Software: CPanel 11.32.3
 
### Installing Node.js

This is my first time managing and running a dedicated server so I have been doing a lot of  'googling' to get things done.

I found a useful gist posted by the current Node.js gatekeeper, Isaac Schlueter, the first method of installation worked for me. My work station runs on windows so I used the Windows Commandline to make a SSH connection to my server.

    echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
    . ~/.bashrc 
    mkdir ~/local
    mkdir ~/node-latest-install
    cd ~/node-latest-install
    curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
    ./configure --prefix=~/local
    make install # ok, fine, this step probably takes more than 30 seconds...
    curl http://npmjs.org/install.sh | sh

With these few lines of code Node.js was installed without any hiccups. What is awesome about Node.js is that it comes bungled with NPM, a Node package manager, which is a handy tool when installing modules for your projects.

### The App
My first Node.js app is the official website for my projects. I didn't want to get too fancy on uncharted territory so I kept it simple,  to get started I needed a mature and robust framework. I chose Express because I have had a bit of experience using it on my local server and I'm a big fan of the author's work, [TJ Holowaychuk](https://github.com/visionmedia). Navigate to your projects directory from the command line and install Express.

    #use npm to install express
    npm install -g express
 
    #start a project
    express ragingflame
 
    #open the project directory and install dependencies
    cd ragingflame &amp;&amp; npm install
    
This took care of creating my project directory and installing all the dependencies required by Express. I'm primarily a PHP developer and I work mostly with Joomla! CMS, I love templates and creating dynamic content. I needed to create a template for my website which has a static footer and header. An Express project contains a Views folder that has 2 files, `layout.jade` and `index.jade`. `Layout.jade` is the main file that other views are rendered on, I modified it to include a footer at the bottom.

### layout.jade

    !!!
    html
      head
        title= title
        meta(charset='utf-8')
        meta(name='author', content='Qawelesizwe Mlio')
        meta(name='description', content='Raging Flame Laboratory - web and software development')
        link(rel='stylesheet', href='/stylesheets/style.css')
        link(rel='stylesheet', href='/stylesheets/tipTip.css')
        script(src='/javascripts/libs/modernizr-2.5.3.min.js')
      body
        div.container
          div.content!= body
          div.foot!= partial('footer')
   

Jade is the template engine of my choice and I'm using the partial function to include the `footer.jade` on all views. The footer contains the main navigation for my website and some JavaScript files.

### index.jade

    img(src='/images/rflab.png', style='margin-bottom: 20px;')
    <strong>about.jade</strong>
    h1 About Raging Flame Lab
    p
      a(href='/', style='margin:0px; padding: 0px; color: #448800;') Home
      |  :: About
    p Raging Flame Lab is a Web &amp;amp; Software development studio. We are geeks who love hacking and experimenting with cutting edge technologies.
    p We are the creators of
      a(href='http://email2article.com/', target='_blank', style='margin:0px; padding: 0px; font-weight: bold; color: #448800;') email2article
      | , an app that converts emails to Joomla! CMS articles.
    br
    p(style='font-style: italic')
      | This website is running on
      a(href='http://nodejs.org/', class='first', target='_blank', style='color: #448800; font-weight: bold; margin: 0px') Node.JS
      | , a server-side JavaScript environment.
      
The Views are all done, the next step was getting the routing to work so that the home page loaded the `index.jade` file and the `/about` request loaded the `about.jade` file, I edited the `routes/index.js` file.

### routes/index.js

    /*
     * GET home page.
     */
    exports.index = function(req, res){
        res.render('index', {title: 'Raging Flame Laboratory'})
    };
 
    /*
     * GET about page.
     */
    exports.about = function(req, res){
        res.render('about', {title: 'Raging Flame Laboratory - About'})
    };
    
Add one line of code to `app.js` that will handle the `/about` request.

    /*
      below app.get('/', routes.index); add app.get('/about', routes.about);
    */
    app.get('/', routes.index);
    app.get('/about', routes.about);
    
Finito, with that my app is complete, let's fire it up!

    node app.js
    
Ok, that works but it blocks the command line from performing other tasks until we kill the current app process, not very helpful. I have used a Node module called forever on my local server to solve this problem, it can run multiple Node servers in the background and restart a server if it crushes. NPM to the rescue:

    npm install -g forever
    #then start the app with forever
    forever start app.js
    
To view my app I need to go to port 3000 of my website: `http://mywebsite.com:3000`. This is ok if you are still testing and developing but its not ideal for public access. The recommended way to run Node.js apps in production is by using Nginx as your front-end server that proxies requests to Node.js servers.

Installing Nginx

I have WHM Cpanel installed on my server and I found a tutorial that explained how to install NginxAdmin.

    cd /usr/local/src
    wget http://nginxcp.com/latest/nginxadmin.tar
    tar xf nginxadmin.tar
    cd publicnginx
    ./nginxinstaller install
 
    #Restart apache
    /etc/init.d/httpd restart
    
After running this code I got an error that ended with this line: 
`SyntaxError: 'yield' not allowed in a 'try' block with a 'finally' clause`. 
To fix it I ran the code below:

    cd /usr/lib/python2.4/site-packages
    mv PyYAML-3.10-py2.4-linux-x86_64.egg PyYAML-3.10-py2.4-linux-x86_64.egg_
    wget http://www.booser.com/wp-content/uploads/PyYAML-3.09-py2.4-linux-x86_64.egg
 
    #Once this is done run the install command
    ./nginxinstaller install
    
Nginx installation took care of re-configuring my Apache settings and started handling all requests to my server. A directory with Nginx config files for all my domains was also created and all I had to do was edit the file for my domain to route requests to my Node.js app.

### /etc/nginx/vhosts/rflab.co.za

    # the IP(s) on which your node server is running i choose the port 3000
    upstream rflab.co.za {
        server 127.0.0.1:3000;
    }
 
    # the nginx server instance
    server {
        listen 41.76.212.119:80;
        server_name rflab.co.za www.rflab.co.za;
        access_log /usr/local/apache/domlogs/rflab.co.za-bytes_log bytes_log;
        access_log /usr/local/apache/domlogs/rflab.co.za combined;
        root /home/ragingfl/public_html;
        charset utf-8;
        error_page 404 /404.html;
 
        # pass the request to the node.js server with the correct headers and much more can be added, see nginx config options
        location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $http_host;
          proxy_set_header X-NginX-Proxy true;
 
          proxy_pass http://rflab.co.za/;
          proxy_redirect off;
        }
 
        location ~.*\.(3gp|gif|jpg|jpeg|png|ico|wmv|avi|asf|asx|mpg|mpeg|mp4|pls|mp3|mid|wav|swf|flv|html|htm|txt|js|css|exe|zip|tar|rar|gz|tgz|bz2|uha|7z|doc|docx|xls|xlsx|pdf|iso)$ {
          expires 7d;
          try_files $uri @backend;
        }
 
        # opt-in to the future
        add_header &quot;X-UA-Compatible&quot; &quot;IE=Edge,chrome=1&quot;;
    }
    
At the top of the file I inserted the code above and restarted Nginx.

This is only the beginning of my journey in discovering the awesome world of Node.js, please don't hesitate to share your thoughts, opinions and advice. Keep hacking!
