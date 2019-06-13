'use strict';
const PLUGIN_NAME = 'gulp-css-js';
var through = require('through2');
var helpingModule = require('./helpingFnc')
var parsefnc = require('./parseHtml');

var gulpHtmlJs = function() {
    return through.obj(function (file, enc, callback) {
      var helping = new helpingModule(file)
      var content = file.contents.toString();
      var result = content

      var parse = parsefnc(content)

      ///////////////////////////////////
      if (parse.match.length !== 0 || parse.match == '') {
        //First : remove style from file
        result = result.replace(parse.match, ' ')
        //secound : remove white lines
        result = result.replace(new RegExp('^(?:[\\t ]*(?:\\r?\\n|\\r))+', 'gm'), '')
        //third : put style in style file
        helping.createFile(parse.attrs.src, parse.content, () => {
          callback(null, helping.createGulpFile(result))
        })
      }
    });
};
//Export the Method
module.exports = gulpHtmlJs;
