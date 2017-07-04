var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/validateRequest');

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var Fixtures = require('../models/Fixtures');

// Routes that end in /fixtures
// ----------------------------------------------------
router.route('/v1/fixtures')

    // create a fixture (accessed at POST http://localhost:8080/api/v1/fixtures)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the Fixtures model
        var fixture = new Fixtures();
    
        // fill in the fixture elements from the request
        if (req.body.date)
            fixture.date = req.body.date;
        if (req.body.w_l_d)
            fixture.w_l_d = req.body.w_l_d;
        if (req.body.home_away)
            fixture.home_away = req.body.home_away;
        if (req.body.logo)
            fixture.logo = req.body.logo;
        if (req.body.competition)
            fixture.competition = req.body.competition;
        if (req.body.team)
            fixture.team = req.body.team;
        if (req.body.attendance)
            fixture.attendance = req.body.attendance;
        if (req.body.result)
            fixture.result = req.body.result;
        if (req.body.report)
            fixture.report = req.body.report;
        if (req.body.season)
            fixture.season = req.body.season;
        if (req.body.squad)
            fixture.squad = req.body.squad;
    
        // save the fixture and check for errors
        fixture.save(function(err, id) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json({ message: 'Fixture created!', id });
        });
    })

    // get all the fixtures (accessed at GET http://localhost:8080/api/v1/fixtures)
    // No authentication required.
    .get(function(req, res) {
        Fixtures.find(function(err, fixtures) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json(fixtures);
        });
    });


// Routes that end in /fixtures/:fixture_id
// ----------------------------------------------------
router.route('/v1/fixtures/:fixture_id')

    // get the fixture with that id (accessed at GET http://localhost:8080/api/v1/fixtures/:fixture_id)
    // No authentication required.
    .get(function(req, res) {
        Fixtures.findById(req.params.fixture_id, function(err, fixture) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            res.json(fixture);
        });
    })

    // update the fixture with this id (accessed at PUT http://localhost:8080/api/v1/fixtures/:fixture_id)
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our fixture model to find the game we want
        Fixtures.findById(req.params.fixture_id, function(err, fixture) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            
            // TODO: We currently get back a raw data object, not an object of class fixture, (I removed it while debugging,) so I'm making a new fixture object here. No big deal.
            // Fill in the elements from the request
            var updatedFixture = new Fixtures();
            updatedFixture.id = fixture.id;
            updatedFixture.date = req.body.date || fixture.date;
            updatedFixture.w_l_d = req.body.w_l_d || fixture.w_l_d;
            updatedFixture.home_away = req.body.home_away || fixture.home_away;
            updatedFixture.logo = req.body.logo || fixture.logo;
            updatedFixture.competition = req.body.competition || fixture.competition;
            updatedFixture.team = req.body.team || fixture.team;
            updatedFixture.attendance = req.body.attendance || fixture.attendance;
            updatedFixture.report = req.body.report || fixture.report;
            updatedFixture.result = req.body.result || fixture.result;
            updatedFixture.season = req.body.season || fixture.season;
            updatedFixture.squad = req.body.squad || fixture.squad;

            // save the news and check for errors
            updatedFixture.save(function(err, id) {
                if (err) {
                    res.status(err.status).send(err);
                    return;
                }

                res.json({ message: 'Fixture updated!', id });
            });
        })
    })
 
    // delete the fixture with this id (accessed at DELETE http://localhost:8080/api/v1/fixtures/:fixture_id)
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        Fixtures.remove({
            _id: req.params.fixture_id
        }, function(err, fixture) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json({ message: 'Successfully deleted fixture', id: fixture.id });
        });
    });

module.exports = router;
