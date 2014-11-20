var path = require('path');
var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.handleRequest = function (req, res) {
  var pathName = url.parse(req.url).pathname;
  var method = req.method;

  var serveSiteAssets = {
    GET: function() {
      if (pathName === '/') {
        pathName = '/index.html';
      }
      res.writeHead(200, headers);
      fs.readFile(archive.paths.siteAssets + pathName,function(err,data) {
      if (err) { return err; }
        res.end(data);
      });
    },
    POST: function(){
    return;
    }

  }

  var serveArchivedSites = {
    GET: function() {
      res.writeHead(200, headers);
      fs.readFile(archive.paths.archivedSites + '/' + pathName ,function(err,data) {
        if (err) {
          serveArchivedSites['POST']();
        }
        res.end(data);
      });
    },
    POST: function() {
      console.log("REQ BODY:",req.body);
      archive.addUrlToList(pathName);
      res.writeHead(302, {
        'Location': '../loading.html'
      });
      res.end();
    }
  }

  var routes = {
    '/' : serveSiteAssets,
    '/loading.html': serveSiteAssets,
    '/styles.css' : serveSiteAssets,
    '/index.html' : serveSiteAssets,
    '/archives' : serveArchivedSites
  }
  if (pathName.slice(1,4)==='www' || pathName.slice(1,5)==='http' ){
    pathName = pathName.slice(1);
    routes['/archives'][method]();
  } else if (routes[pathName] && pathName !== '/favicon.ico'){
    routes[pathName][method]();
  }
}

