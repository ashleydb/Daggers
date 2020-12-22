const express = require('express');
const next = require('next');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');

// In order to add liveliness/readiness/health checks for Kubernetes
const http = require('http');
const { createTerminus } = require('@godaddy/terminus');

const port = 3000
const dev = process.env.NOVE_ENV !== 'production';

// For error logging on GCP
const {ErrorReporting} = require('@google-cloud/error-reporting');
// 'always' (or 'never') report errors when running locally during development, vs. live on GCP
const reportMode = dev ? 'always' : 'production';
const errors = new ErrorReporting({ReportMode:reportMode});

const app = next({dev});
const handleNextRequest = app.getRequestHandler();



// create next.js app...
app.prepare().then(() => {
    // which contains an express server
    const server = express();

  // Redirect all requests from http to https
  server.use(function(req, res, next){
    if (req.hostname != 'localhost' && req.get('X-Forwarded-Proto') == 'http') {
      res.redirect(`https://${req.hostname}${req.url}`);
      return;
    }
    next();
  });
  
  // configure app to use bodyParser() which will let us get the data from a POST
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  
  // Enable gzip compression from the server. Must be first!
  server.use(compression());
  
  // Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
  const PORT = process.env.PORT || 3000;
  
  // Server path to /public folder
  var publicPath = __dirname + '/public';
  
  
  // Enable Cross Origin Resource Sharing
  server.all('/*', function(req, res, next) {
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
  var newsRoute = require('./server/routes/News');
  var fixturesRoute = require('./server/routes/Fixtures');
  var pagesRoute = require('./server/routes/Pages');
  var playersRoute = require('./server/routes/Players');
  var bannerRoute = require('./server/routes/Banner');
  var tableRoute = require('./server/routes/Table');
  var sponsorsRoute = require('./server/routes/Sponsors');
  var imagesRoute = require('./server/routes/Images');
  var authRoute = require('./server/routes/Auth');
  
  
  // REGISTER OUR ROUTES -------------------------------
  // All of our API routes will be prefixed with /api
  // Just add more routers to the array to handle other API endpoints
  server.use('/api', [router, newsRoute, fixturesRoute, pagesRoute,
                   playersRoute, bannerRoute, tableRoute, sponsorsRoute, imagesRoute]);
  // Other routes from the root go here
  //app.use('/', [authRoute, healthRoute]);
  server.use('/', [authRoute]);
  
  
  // Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you
  // are sure that authentication is not needed
  //app.all('/api/*', [require('./app/server/middleware/validateRequest')]);
  
  
  // serve static assets normally
  server.use(express.static(publicPath));
  


//   // handle every other route with index.html, which will contain
//   // a script tag to your application's JavaScript file(s).
//   app.get('*', function (request, response){
//       response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//   });

//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });
  //server.get('/ping', (req, res) => res.end('pong')); //just for testing
  // Let Next.js handle the rest, as we assume these are frontend routes
  server.get('*', handleNextRequest);

    
  
  // Configuring health checks for the server
  //const server = http.createServer(app);
  const httpServer = http.createServer(server);
  
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
  
  createTerminus(httpServer, {
    healthChecks: { '/health': onHealthCheck },
    onSignal,
    onShutdown
  });
  
  
  // Last line is to log any errors
  server.use(errors.express);
  
  
  //server.get('*', (req, res) => {
  //  return handle(req, res)
  //});
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('Express server is up on port ' + PORT);
  });

}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
});






    // server.get('/page2', (req, res) => {
    //     return app.render(req, res, '/page2');
    // });

    // server.get('/page3', (req, res) => {
    //     return app.render(req, res, '/ohyeah');
    // });

    // server.get('*', (req, res) => {
    //     return handle(req, res);
    // });

    // server.listen(port, (err) => {
    //     if (err) throw err;
    //     console.log(`Ready on http://localhost:${port}`);
    // });