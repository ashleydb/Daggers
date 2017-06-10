var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/validateRequest');

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var Banner = require('../models/Banner');

// Routes that end in /banner
// ----------------------------------------------------
router.route('/v1/banner')

    // create a banner (accessed at POST http://localhost:8080/api/v1/banner)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the Banner model
        var banner = new Banner();
    
        // fill in the banner elements from the request
        if (req.body.image) {
            banner.image = req.body.image;
        } else {
            res.status(400).send({ error: 'ERR: Missing banner image' });
            return;
        }

        if (req.body.link) {
            banner.link = req.body.link;
        }
        if (req.body.description) {
            banner.description = req.body.description;
        }
    
        // save the banner and check for errors
        banner.save(function(err, msg) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: msg });
            }
        });
    })

    // get all of the banner (accessed at GET http://localhost:8080/api/v1/banner)
    // No authentication required.
    .get(function(req, res) {
        Banner.find(function(err, banner) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(banner);
            }
        });
    })

    // delete the banner (accessed at DELETE http://localhost:8080/api/v1/banner)
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        Banner.remove(function(err, msg) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: msg });
            }
        });
    });

module.exports = router;
