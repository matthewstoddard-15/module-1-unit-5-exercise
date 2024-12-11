// Create web server
// Run server
// Listen for requests
// Respond to requests
// Parse request body
// Add comments to the database
// Delete comments from the database
// Return comments from the database
// Return all comments from the database
// Return comments by id from the database
// Update comments by id from the database

// Dependencies
var http = require('http');
var url = require('url');
var querystring = require('querystring');

// Local dependencies
var comments = require('./comments');

// Create web server
var server = http.createServer(function(req, res) {
  // Parse request url
  var parsedUrl = url.parse(req.url);
  // Parse request query string
  var parsedQuery = querystring.parse(parsedUrl.query);
  // Parse request method
  var method = req.method;

  // Respond to requests
  if (parsedUrl.pathname === '/comments') {
    if (method === 'POST') {
      // Parse request body
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        var comment = JSON.parse(body);
        // Add comments to the database
        comments.add(comment, function(err) {
          if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          } else {
            res.end('OK');
          }
        });
      });
    } else if (method === 'GET') {
      if (parsedQuery.id) {