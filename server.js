// Create express web server
const express = require('express');
const path = require('path');
const app = express();

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;


// Redirect HTTPS traffic to HTTP, (for use with openWeatherMap free API)
/*
app.use(function(request, response, next) {
    if (request.headers['x-forwarded-proto'] === 'https') {
        response.redirect('http://' + request.hostname + request.url);
    } else {
        next();
    }
});
*/


// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

/*
// serve static assets normally
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
*/


app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});
