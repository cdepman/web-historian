var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http')

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var data = fs.readFileSync(exports.paths.list);
  return data.toString().split('\n').slice(0,-1);
};

exports.isUrlInList = function(url){
  return (_.contains(exports.readListOfUrls(),url));
};

exports.addUrlToList = function(url){
  if (!exports.isUrlInList(url)) {
    fs.appendFile(exports.paths.list,url + '\n',function(err) {
      if (err) { return err; }
      console.log(exports.isUrlInList(url));
    });
  }
};

exports.isURLArchived = function(url,callback){
  fs.exists(exports.paths.archivedSites + '/' + url, callback);
};

exports.downloadUrls = function(url){
  var result = '';
  http.get('http://' + url, function(res){
    res.on('data', function(chunk){
      result += chunk;
    })
    res.on('end', function() {
      console.log('done writing');
      fs.writeFile(exports.paths.archivedSites + '/' + url,result);
    });
  });
};
