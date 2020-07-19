// Create express web server
const express = require('express');
const path = require('path');
//const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

// In order to add liveliness/readiness/health checks for Kubernetes
const http = require('http');
const { createTerminus } = require('@godaddy/terminus');

// For error logging on GCP
const ErrorReporting = require('@google-cloud/error-reporting').ErrorReporting;
//const errors = new ErrorReporting({ignoreEnvironmentCheck:true}); // To run locally during development
const errors = new ErrorReporting(); // To run on GCP server

const app = express();

//app.use(logger('dev'));

// Redirect all requests from http to https
app.use(function(req, res, next){
  if (req.hostname != 'localhost' && req.get('X-Forwarded-Proto') == 'http') {
    res.redirect(`https://${req.hostname}${req.url}`);
    return;
  }
  next();
});

// configure app to use bodyParser() which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable gzip compression from the server. Must be first!
app.use(compression());

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;

// Server path to /public folder
var publicPath = __dirname + '/public';


// Enable Cross Origin Resource Sharing
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Note: Below code is based on https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Send raw json as the request body for POST and PUT. Set the header to Content-Type:application/json, then add the json in the body: example {"headline": "Some News!"}

// DEFINE ROUTES -------------------------------
var router = express.Router();

// middleware to use for all requests
//router.use(function(req, res, next) {
//    // do logging
//    console.log('Something is happening.');
//    // make sure we go to the next routes and don't stop here
//    next();
//});

// middleware to use for all requests, to validate users are authorized
//router.use([require('./app/server/middleware/validateRequest')]);

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Specify a version to use the API' });
});
router.get('/v1', function(req, res) {
    res.json({ message: 'Specify an object endpoint to use the API!' });
});

// More routes, mostly for our API
var newsRoute = require('./app/server/routes/News');
var fixturesRoute = require('./app/server/routes/Fixtures');
var pagesRoute = require('./app/server/routes/Pages');
var playersRoute = require('./app/server/routes/Players');
var bannerRoute = require('./app/server/routes/Banner');
var tableRoute = require('./app/server/routes/Table');
var sponsorsRoute = require('./app/server/routes/Sponsors');
var imagesRoute = require('./app/server/routes/Images');
var authRoute = require('./app/server/routes/Auth');


// REGISTER OUR ROUTES -------------------------------
// All of our API routes will be prefixed with /api
// Just add more routers to the array to handle other API endpoints
app.use('/api', [router, newsRoute, fixturesRoute, pagesRoute,
                 playersRoute, bannerRoute, tableRoute, sponsorsRoute, imagesRoute]);
// Other routes from the root go here
//app.use('/', [authRoute, healthRoute]);
app.use('/', [authRoute]);


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
//app.all('/api/*', [require('./app/server/middleware/validateRequest')]);


// serve static assets normally
app.use(express.static(publicPath));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


// Configuring health checks for the server
const server = http.createServer(app);

function onHealthCheck () {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  // TODO: We'll just say everything works every time for now
  return Promise.resolve(
    // optionally include a resolve value to be included as
    // info in the health check response
  );
}

function onSignal () {
  console.log('server is starting cleanup');
  return Promise.all([
    // TODO: Add clean-up logic, like closing database connections
  ]);
}

function onShutdown () {
  console.log('cleanup finished, server is shutting down');
}

createTerminus(server, {
  healthChecks: { '/health': onHealthCheck },
  onSignal,
  onShutdown
});


// Last line is to log any errors
app.use(errors.express);

// Start the server
server.listen(PORT, function() {
    console.log('Express server is up on port ' + PORT);
});
