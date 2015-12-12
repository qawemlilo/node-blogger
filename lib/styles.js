"use strict";

var CleanCSS = require('clean-css');
var config = require('../config');
var path = require('path');
var del = require('del');


module.exports = function () {

  console.log('Minifying css.......');

  var delList = ['template/css/style_v*'];
  var result = new CleanCSS().minify(config.blog.css);

  del.sync(delList);

  return result.styles;
};