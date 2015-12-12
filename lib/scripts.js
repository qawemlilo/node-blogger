"use strict";

var UglifyJS = require('uglify-js');
var config = require('../config');
var path = require('path');
var del = require('del');


module.exports = function () {
  console.log('Minifying scripts.......');

  var delList = ['template/js/script_v*'];

  del.sync(delList);

  var result = UglifyJS.minify(config.blog.scripts);
  

  return result.code;
};