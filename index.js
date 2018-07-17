'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

function convertRelativePath(obj, tag, link, title) {
  var src = obj.attr(tag);
  var is_relative = false;
  if(src.startsWith(title)) {
    src = src.substring(title.length);
    is_relative = true;
  }
  else {
    is_relative = src.startsWith("index/");
  }
  if(is_relative) {
    obj.attr(tag, '/' + link + src);
  }
}

hexo.extend.filter.register('after_post_render', function (data) {
  var config = hexo.config;
  if (config.post_asset_folder) {
    // By default, post permalink is of the form "http[s]//yoursite/year/month/day/title/"
    // page permalink is of the form "http[s]//yoursite/title/index.html"
    // Extract post permlink and title
    var link = data.permalink;
    var beginPos = getPosition(link, '/', 3) + 1;
    var endPos = link.lastIndexOf('/');
    var beginPos2 = link.lastIndexOf('/', endPos - 1) + 1;
    var title = link.substring(beginPos2, endPos + 1);
    link = link.substring(beginPos, endPos + 1);
    // console.log("DEBUG:", data.permalink, "|", link, "|", title);

    var toprocess = ['excerpt', 'more', 'content'];
    for (var i = 0; i < toprocess.length; i++) {
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function () {
        convertRelativePath($(this), 'src', link, title);
      });
      $('a').each(function () {
        convertRelativePath($(this), 'href', link, title);
      });
      data[key] = $.html();
    }
  }
});
