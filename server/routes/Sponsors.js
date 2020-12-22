var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/validateRequest');

// MODELS: Our data format
// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
var Sponsors = require('../models/Sponsors');

// Routes that end in /sponsors
// ----------------------------------------------------
router.route('/v1/sponsors')

    // create a sponsor (accessed at POST http://localhost:8080/api/v1/sponsors)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the Sponsors model
        var sponsors = new Sponsors();
    
        // fill in the sponsors elements from the request
        if (req.body.name)
            sponsors.name = req.body.name;
        if (req.body.link)
            sponsors.link = req.body.link;
        if (req.body.image)
            sponsors.image = req.body.image;
        if (req.body.type)
            sponsors.type = req.body.type;
    
        // save the sponsors and check for errors
        sponsors.save(function(err, id) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json({ message: 'Sponsor created!', id });
        });
    })

    // get all the sponsors (accessed at GET http://localhost:8080/api/v1/sponsors)
    // No authentication required.
    .get(function(req, res) {
        Sponsors.find(function(err, sponsors) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json(sponsors);
        });
    });

// Routes that end in /sponsors/:sponsors_id
// ----------------------------------------------------
router.route('/v1/sponsors/:sponsors_id')
    // get the sponsor with that id (accessed at GET http://localhost:8080/api/v1/sponsors/:sponsors_id)
    // id must be a sponsor id, e.g. "-KfjGxf03zvpWrCw9cun"
    // No authentication required.
    .get(function(req, res) {
        var options = {
            id: req.params.sponsors_id
        };
        Sponsors.findById(options, function(err, sponsors) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json(sponsors);
        });
    })

    // update the sponsors with this id (accessed at PUT http://localhost:8080/api/v1/sponsors/:sponsors_id)
    // id must be a sponsor id, e.g. "-KfjGxf03zvpWrCw9cun"
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our sponsors model to find the sponsor we want
        var options = {
            id: req.params.sponsors_id
        };
        Sponsors.findById(options, function(err, sponsorsData) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }

            var sponsor = sponsorsData[0];

            // TODO: We currently get back a raw data object, not an object of class sponsors, (I removed it while debugging,) so I'm making a new sponsors object here. No big deal.
            // Fill in the elements from the request
            var updatedSponsor = new Sponsors();
            updatedSponsor.id = sponsor.id;
            updatedSponsor.name = req.body.name ? req.body.name : sponsor.name;
            updatedSponsor.link = req.body.link ? req.body.link : sponsor.link;
            updatedSponsor.image = req.body.image ? req.body.image : sponsor.image;
            updatedSponsor.type = req.body.type ? req.body.type : sponsor.type;

            // save the sponsor and check for errors
            updatedSponsor.save(function(err, id) {
                if (err) {
                    res.status(err.status || 400).send(err);
                    return;
                }
                res.json({ message: 'Sponsor updated!', id });
            });
        })
    })
 
    // delete the sponsor with this id (accessed at DELETE http://localhost:8080/api/v1/sponsors/:sponsors_id)
    // id must be a sponsor id, e.g. "-KfjGxf03zvpWrCw9cun"
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        var options = {
            id: req.params.sponsors_id
        };
        Sponsors.remove(options, function(err, id) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json({ message: 'Successfully deleted', id });
        });
    });

module.exports = router;
