// Create express web server
var express = require('express');
var app = express();

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;

// Redirect HTTPS traffic to HTTP, (for use with openWeatherMap free API)
app.use(function(request, response, next) {
    if (request.headers['x-forwarded-proto'] === 'https') {
        response.redirect('http://' + request.hostname + request.url);
    } else {
        next();
    }
});

app.use(express.static('public'));
app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});
