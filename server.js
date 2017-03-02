// Create express web server
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// Enable gzip compression from the server. Must be first!
app.use(compression());

// Get a port from an environment variable, (e.g. on Heroku) or fallback to 3000 (e.g. locally)
const PORT = process.env.PORT || 3000;


// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


// --- Image uploading ---

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// TODO: Need to secure this so only authorized people can upload images.
// TODO: This only allows one image at a time. Need to handle multiple? Not hard to do. https://github.com/richardgirges/express-fileupload
app.post('/api/v1/image', function(req, res) {
    if (!req.files) {
        console.log('No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }

    if (req.files.imageFile.mimetype !== 'image/jpeg' && req.files.imageFile.mimetype !== 'image/png') {
        console.log('File uploaded was not a supported image type. Please use jpg or png: ', req.files.imageFile.mimetype);
        return res.status(400).send('File uploaded was not a supported image type. Please use jpg or png.');
    }

    // The name of the input field (i.e. "imageFile") is used to retrieve the uploaded file
    let imageFile = req.files.imageFile;

    // Use the mv() method to place the file somewhere on your server
    // TODO: This will overwrite any existing file with the same name. Add a date or something to the filename to make it unique?
    let filePath = '/images/uploads/'+imageFile.name;
    let fullFilePath = __dirname + '/public' + filePath;
    console.log('Moving to: ', fullFilePath);
    imageFile.mv(fullFilePath, function(err) {
        if (err) {
            console.log('Could not move file: ', filePath);
            return res.status(500).send(err);
        }

        // Everything went well, so send back the file path
        console.log('File uploaded!');
        res.status(201).send({message:'File uploaded!', path: filePath});
    });
});

// TODO: Need a "Get images" to see which existing files I can choose from.


// Start the server
app.listen(PORT, function() {
    console.log('Express server is up on port ' + PORT);
});
