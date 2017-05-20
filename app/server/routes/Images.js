var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/validateRequest');

// Note: Need to add these to server.js
//const fileUpload = require('express-fileupload');
//app.use(fileUpload());

// TODO: POST: This only allows one image at a time. Need to handle multiple? Not hard to do. https://github.com/richardgirges/express-fileupload
// TODO: Add DELETE image?

// TODO: I just copied this from server.js since I broke these routes out, then edited a bit
// Server path to /public folder
var publicPath = __dirname + '/../../public';
//console.log('DEBUG: Images.js publicPath=', publicPath);



// --- GOOGLE CLOUD STORAGE ---

// Imports the Google Cloud client library, using default credentials
var gcs = require('@google-cloud/storage')();

// Get our storage bucket where our files live
var bucket = gcs.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

// Make any new objects added to a bucket publicly readable
var options = {
  entity: 'allUsers',
  role: gcs.acl.READER_ROLE
};
// Note: This is using the callback model
bucket.acl.default.add(options, function(err, aclObject) {
    if (err)
        console.log('Cloud Storage Bucket Error: ', err);
});


// Returns the public, anonymously accessable URL to a given Cloud Storage object.
// The object's ACL has to be set to public read.
function getPublicUrl (filename) {
  //return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${filename}`;
  return `https://${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}.storage.googleapis.com/${filename}`;
}

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// - cloudStorageObject: the object name in cloud storage.
// - cloudStoragePublicUrl: the public url to the object.
function sendUploadToGCS (req, res, next) {
  if (!req.file) {
    return next();
  }
  if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
    return next();
  }

  const gcsname = req.body.folderName ? req.body.folderName + '/' + req.file.originalname :
                                        req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
const Multer = require('multer');
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
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


// Routes that end in /image
// ----------------------------------------------------
router.route('/v1/image')

    // create an image (accessed at POST http://localhost:8080/api/v1/image)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin,
    upload.single('imageFile'),
    sendUploadToGCS,
    function(req, res, next) {
        if (!req.file) {
            console.log('WARN: No file was uploaded.');
            return res.status(400).send('No file was uploaded.');
        }

        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
            console.log('WARN: File uploaded was not a supported image type. Please use jpg or png: ', req.files.imageFile.mimetype);
            return res.status(400).send('File uploaded was not a supported image type. Please use jpg or png.');
        }

        // Was an image uploaded? If so, we'll use its public URL in cloud storage.
        // TODO: Fix this hardcoded path. Shouldn't the name have the folder in it too?
        //let filePath = '/images/uploads/' + req.files.imageFile.name;
        let filePath = req.body.folderName ? req.body.folderName + '/' + req.file.originalname :
                                             req.file.originalname;
        if (req.file.cloudStoragePublicUrl) {
            res.status(201).send({message:'File uploaded!', path: filePath, url: req.file.cloudStoragePublicUrl});
        }

        if (req.file.cloudStorageError) {
            console.log('ERR: Could store image file: ', filePath);
            return res.status(500).send(err);
        }
    })

    // get all the image file names (accessed at GET http://localhost:8080/api/v1/image)
    // No authentication required.
    .get(function (request, response){
        var directory = '';
        if (request.query && request.query.dir)
            directory = request.query.dir;


        // Get a list of all files in the bucket. Note this is using the Promise model
        bucket.getFiles({
            prefix: directory
        }).then(function(data) {
            var fileObjs = data[0];
            var files = {};

            fileObjs.forEach(function(file, index, filesArray) {
                if (file.metadata.contentType == 'image/jpeg' ||
                    file.metadata.contentType == 'image/png') {
                    // This is an image. First make sure we have the folder.
                    var folderName = file.name.split('/')[0];
                    if (files[folderName] == undefined) {
                        files[folderName] = [];
                    }
                    // Now add the filename to the object, (with a leading /)
                    files[folderName].push('/' + file.name);
                }
            });

            // Return the results
            response.status(200).send(files);
        }).catch(function (error) {
            console.log('ERR: Get Images:', error);
            response.status(500).send(error);
        });

        // //console.log('DEBUG: Get Images for ', directory);
        // listImages(directory).then((files) => {
        //     console.log('DEBUG: Get Images SUCCESS', files);
        //     // Need to add a leading / for each filename
        //     files.forEach(function(file, index, filesArray) {
        //         filesArray[index] = '/' + filesArray[index];
        //     });
        //     // Return the results
        //     response.status(200).send({files});
        // }).catch(function (error) {
        //     console.log('ERR: Get Images:', error);
        //     response.status(500).send(error);
        // });
    });

module.exports = router;
