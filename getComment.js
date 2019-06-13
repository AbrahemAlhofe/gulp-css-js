var getCommentsTag = (content_, start_, end_) => {

  start = start_.replace('*', '\\*')
  end = end_.replace('*', '\\*')

  var tags = []
  var index = 0

  var start_reg = new RegExp(start, 'g')
  var end_reg = new RegExp(end, 'g')

  content = content_.replace(start_reg, '<').replace(end_reg, '>')

  for (let chr of content) {
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

  var tags = tags.map((item) => {
    return item.replace('undefined', '').replace('<', start_).replace('>', end_)
  })
  return tags
}
var getComment = function (content, start_, end_) {
  var tags = getCommentsTag(content, '/*', '*/')

  start = start_.replace(/\*/g, '\\*')
  end = end_.replace(/\*/g, '\\*')

  var r_Opentag = new RegExp(start, 'g')
  var r_Closetag = new RegExp(end, 'g')

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
module.exports = (content, name) => {
  var start = `/* start style of ${name} file */`
  var end = `/* end style of ${name} file */`
  getComment(content, start, end)
}
