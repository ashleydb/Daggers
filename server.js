// Create express web server
const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();

// configure app to use bodyParser() which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable gzip compression from the server. Must be first!
app.use(compression());

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;

// Server path to /public folder
var publicPath = __dirname + '/public';


// TODO: MOVE MY OWN CODE, CONFIG, DEPENDENCIES TO ANOTHER FOLDER, (e.g. /server/..., not /app/...)
// DATABASE: Google DataStore
//var datastore = require('@google-cloud/datastore')();
//var gstore = require('gstore-node');
//gstore.connect(datastore);
// DATABASE: Firebase
//import firebase, {firebaseRef} from 'app/cloud/firebase';
//var myFirebase = require('./app/cloud/firebase');
//   myFirebase.writeToFirebase, getFirebaseRef, firebaseRef


// TODO: Setup authentication and authorization around our API
// http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
//   https://github.com/arvindr21/myRESTApp/tree/master/server
// http://stackoverflow.com/questions/15496915/how-to-implement-a-secure-rest-api-with-node-js


// Note: Below code is based on https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Send raw json as the request body for POST and PUT. Set the header to Content-Type:application/json, then add the json in the body: example {"headline": "Some News!"}

// ROUTES FOR OUR API -------------------------------
var router = express.Router();

// middleware to use for all requests
//router.use(function(req, res, next) {
//    // do logging
//    console.log('Something is happening.');
//    // make sure we go to the next routes and don't stop here
//    next();
//});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Specify a version to use the API' });   
});
router.get('/v1', function(req, res) {
    res.json({ message: 'Specify an object endpoint to use the API!' });   
});

// More routes for our API
var newsRoute = require('./app/routes/News');
var fixturesRoute = require('./app/routes/Fixtures');


// REGISTER OUR ROUTES -------------------------------
// All of our API routes will be prefixed with /api
// Just add more routers to the array to handle other API endpoints
app.use('/api', [router, newsRoute, fixturesRoute]);




// --- IMAGE UPLOADING ---

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// TODO: Need to secure this so only authorized people can upload images.
// TODO: This only allows one image at a time. Need to handle multiple? Not hard to do. https://github.com/richardgirges/express-fileupload
app.post('/api/v1/image', function(req, res) {
    if (!req.files) {
        console.log('WARN: No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }

    if (req.files.imageFile.mimetype !== 'image/jpeg' && req.files.imageFile.mimetype !== 'image/png') {
        console.log('WARN: File uploaded was not a supported image type. Please use jpg or png: ', req.files.imageFile.mimetype);
        return res.status(400).send('File uploaded was not a supported image type. Please use jpg or png.');
    }

    // The name of the input field (i.e. "imageFile") is used to retrieve the uploaded file
    let imageFile = req.files.imageFile;

    // Use the mv() method to place the file somewhere on your server
    // TODO: This will overwrite any existing file with the same name. Add a date or something to the filename to make it unique?
    let filePath = '/images/uploads/'+imageFile.name;
    let fullFilePath = publicPath + filePath;
    //console.log('DEBUG: Moving to: ', fullFilePath);
    imageFile.mv(fullFilePath, function(err) {
        if (err) {
            console.log('ERR: Could not move file: ', filePath);
            return res.status(500).send(err);
        }

        // Everything went well, so send back the file path
        //console.log('DEBUG: File uploaded!');
        res.status(201).send({message:'File uploaded!', path: filePath});
    });
});

// --- LIST IMAGES ---

var glob = require("glob");
var options = {nodir: true, cwd: 'public', nocase: true};

function listImages(directory = '/') {
    //console.log('DEBUG: listImages for ', directory);
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            glob(`${directory}*.+(jpg|jpeg|png)`, options, function (er, files) {
                console.log('DEBUG: listImages glob (param error=', er);
                console.log('DEBUG: listImages glob (param files=', files);
                if (er) {
                    // er is an error object or null
                    reject(er);
                } else {
                    // files is an array of filenames, or null
                    resolve(files);
                }
            });
        }
    );
};

app.get('/api/v1/image', function (request, response){
    var directory = 'images/uploads/';
    if (request.query && request.query.dir)
        directory = request.query.dir;
    //console.log('DEBUG: Get Images for ', directory);
    listImages(directory).then((files) => {
        console.log('DEBUG: Get Images SUCCESS', files);
        // Need to add a leading / for each filename
        files.forEach(function(file, index, filesArray) {
            filesArray[index] = '/' + filesArray[index];
        });
        // Return the results
        response.status(200).send({files});
    })
        .catch(function (error) {
        console.log('ERR: Get Images:', error);
        response.status(500).send(error);
    });
});




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
