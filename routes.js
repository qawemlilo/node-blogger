"use strict";

/*
   This file responds to different http requests
*/

var _ = require('lodash');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Posts = require('./posts');
var postsDB = require('./posts.json');
var DynamicPage = require('./lib/dynamicpage');
var config = require('./config');
var RSS = require('./rss');
var OneDay = (1000 * 60 * 60 * 24 * 365);
var favicon = fs.readFileSync(path.resolve(__dirname, './template/img/favicon.ico'));


var rss = new RSS();
var myblog = new Posts();

var dynamicPage = new DynamicPage({
  js: config.blog.scriptMin,
  css: config.blog.cssMin
});




/*
    Parses a url path to a format that matches our filenames
    
    @param: (String) path - url pathl
*/
function parseFilename (path) {
  if (path === '/') {
    return path;
  }
  
  var separatorIndex = path.lastIndexOf('/')
  var tempFilename;
  var filename;
  
  tempFilename = path.substring(1, separatorIndex) + '_' + path.substring(separatorIndex + 1);
  filename = tempFilename.replace(/\//g, '-');
  
  return filename;
}




/*
    Fetches and loads a page containing a post and passes it to a response method 
    
    @param: (String) filename - name of a file containing a postHtmlContent
    @param: (Object) res - http response object
*/
function loadPage (filename, res) {
    var page = myblog.fetchPost(filename);
    var expires = new Date().getTime() + OneDay;
    
    if (!page) {
      res.writeHead(404);
      res.end('Page not found :(');
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Expires': new Date(expires).toUTCString()
      }); 
      
      res.end(page);   
    }
}




/*
    Fetches and loads a page containing a post and passes it to a response method 
    
    @param: (String) filename - name of a file containing a postHtmlContent
    @param: (Object) res - http response object
*/
function loadDynamicPage (posts, res) {
    var page = dynamicPage.init({
      posts: posts
    });
    var expires = new Date().getTime() + OneDay;
    
    if (!page) {
      res.writeHead(404);
      res.end('DynamicPage Page not found :(');
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Expires': new Date(expires).toUTCString()
      }); 
      
      res.end(page);   
    }
}



/*
    Loads the rss feed

    @param: (Object) res - http response object    
*/
function loadRSS (res) {
  res.writeHead(200, {
    'Content-Type': 'application/xml; charset=utf-8'
  });
  
  res.end(rss.getFeed());
}






/*
   Expose our routes to the Global module object
*/
module.exports = function (app) {
  
  app.get('/', function(req, res) {
    loadPage('index', res);
  });

  app.get('/favicon.ico', function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end(favicon);
  });

  app.get('/rss', function(req, res) {
    loadRSS(res);
  });

  app.get('/about', function(req, res) {
    var filename = parseFilename('/2013/5/9/about-this-blog');
    
    loadPage(filename, res);
  });

  app.get('/:year', function(req, res) {

    var posts = _.filter(postsDB, function (post) {
      return post.year === parseInt(req.params.year, 10);
    });

    loadDynamicPage(posts, res);
  });

  app.get('/tags/:tag', function(req, res) {

    var posts = _.filter(postsDB, function (post) {
      return post.categories.indexOf(req.params.tag) > -1;
    });

    loadDynamicPage(posts, res);
  });

  app.get('/:year/:month', function(req, res) {

    var posts = _.filter(postsDB, function (post) {
      return post.year === parseInt(req.params.year, 10) && post.month === parseInt(req.params.month, 10);
    });

    loadDynamicPage(posts, res);
  });

  app.get('/:year/:mon/:day/:title', function(req, res) {
    var title = req.params.title;

    if (title === 'using-cheerio-and-mongodb-to-scrap-a-large-website') {
      title = 'using-cheerio-and-mongodb-to-scrape-a-large-website';
    }

    var filename = parseFilename('/' + req.params.year + '/' + req.params.mon + '/' + req.params.day + '/' + title);
    
    loadPage(filename, res);
  });
};
