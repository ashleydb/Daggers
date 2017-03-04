// Create express web server
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// Enable gzip compression from the server. Must be first!
app.use(compression());

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;

// Server path to /public folder
var publicPath = __dirname + '/public';



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
                //console.log('DEBUG: listImages glob (param error=', er);
                //console.log('DEBUG: listImages glob (param files=', files);
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
        //console.log('DEBUG: Get Images SUCCESS', files);
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
