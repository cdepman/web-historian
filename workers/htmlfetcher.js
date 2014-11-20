// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('archive-helpers');
var _ = require('underscore');

module.exports = function() {
  _.each(archive.readListOfUrls(),function(url) {
    console.log(url);
    archive.isURLArchived(url,function(exists) {
      if (!exists) {
        archive.downloadUrls(url);
      }
    });
  });
}
