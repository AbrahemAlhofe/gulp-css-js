var parse = require('html-parse-stringify').parse
///////////////////////////////////////////
function getTags (fileContent) {
  var tags = []
  var index = -1
  for (let chr of fileContent) {
    if (chr == "<") {
      tags.push("")
      index += 1
    }

    tags[index] += chr

    if (chr == ">") {
      tags.push("")
      index += 1
    }
  }
  return tags
}
///////////////////////////////////////////
function getStyle (fileContent) {
  var tags = getTags(fileContent)
  var r_Opentag = new RegExp('<style[^<>]*>', 'g')
  var r_Closetag = new RegExp('</style>', 'g')
  var sent = ""
  var tags_ = []
  tags.forEach((tag) => {
    if (r_Opentag.test(tag)) {
      sent = ''
    }
    sent += tag
    if (r_Closetag.test(tag)) {
      tags_.push(sent)
      sent = ''
    }
  })
  return tags_[0]
}
///////////////////////////////////////////
module.exports = (fc) => {
  var match = getStyle(fc)
  return {
    match : match,
    attrs : parse(match)[0].attrs,
    content : parse(match)[0].children[0].content
  }
}
