// Create express web server
const express = require('express');
const path = require('path');
//const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

//app.use(logger('dev'));

// configure app to use bodyParser() which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable gzip compression from the server. Must be first!
app.use(compression());

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;

// Server path to /public folder
var publicPath = __dirname + '/public';

// For image uploading
app.use(fileUpload());


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
var imagesRoute = require('./app/server/routes/Images');
var authRoute = require('./app/server/routes/Auth');


// REGISTER OUR ROUTES -------------------------------
// All of our API routes will be prefixed with /api
// Just add more routers to the array to handle other API endpoints
app.use('/api', [router, newsRoute, fixturesRoute, pagesRoute, imagesRoute]);
// Other routes from the root go here
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

// Start the server
app.listen(PORT, function() {
    console.log('Express server is up on port ' + PORT);
});
