var File = require('vinyl');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var getComment = require('./getComment');
var PluginError = gutil.PluginError;

function exportsFnc(file) {
  var name = path.basename(file.path, path.extname(file.path))
  /////////////////////////////////////////////////////////
  this.createFile = function (src, contentInp_='', cb) {
    var contentInp = this.convert(contentInp_)
    fs.readFile(src, function (err, contentFile) {
      if (err) {
        throw new PluginError({
          plugin : 'gulp-css-js',
          message : `${src} file is not exist`
        })
        return;
      }
      var content = contentFile.toString()
      var replacer = getComment(content, name)
      var file_ = content.replace(replacer, contentInp)
      fs.writeFile(src, file_, (err) => {
        if (err) return err
        cb()
      })
    })
  }
  /////////////////////////////////////////////
  this.convert = (style) => {
    var content_convert = `
/* start style of ${name} file */
${style}
/* end style of ${name} file */`
    return content_convert
  }
  /////////////////////////////////////////////
  this.createGulpFile = (content) => {
    var aFile = new gutil.File();
    aFile.path = file.path;
    aFile.contents = Buffer.from(content)
    return new File(aFile)
  }
}
module.exports = exportsFnc
