var express = require('express');
var router = express.Router();
//var moment = require('moment');
var authenticate = require('../middleware/validateRequest');

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var Players = require('../models/Players');

// Routes that end in /players
// ----------------------------------------------------
router.route('/v1/players')

    // create a page (accessed at POST http://localhost:8080/api/v1/players)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the Pages model
        var player = new Players();
    
        // fill in the page elements from the request
        if (req.body.first_name) {
            player.first_name = req.body.first_name;
        } else {
            res.status(400).send({ error: 'ERR: Missing player first name' });
            return;
        }
        if (req.body.last_name) {
            player.last_name = req.body.last_name;
        } else {
            res.status(400).send({ error: 'ERR: Missing player last name' });
            return;
        }
        if (req.body.position) {
            player.position = req.body.position;
        } else {
            res.status(400).send({ error: 'ERR: Missing player position' });
            return;
        }
        if (req.body.onloan_status) {
            player.onloan_status = req.body.onloan_status;
        } else {
            res.status(400).send({ error: 'ERR: Missing player onloan status' });
            return;
        }
        if (req.body.status) {
            player.status = req.body.status;
        } else {
            res.status(400).send({ error: 'ERR: Missing player status' });
            return;
        }
        if (req.body.team) {
            player.team = req.body.team;
        } else {
            res.status(400).send({ error: 'ERR: Missing player team' });
            return;
        }

        if (req.body.image) {
            player.image = req.body.image;
        } else {
            player.image = '/player/bg_player_231by264.png';
        }

        if (req.body.date_of_birth)
            player.date_of_birth = req.body.date_of_birth;
        if (req.body.shirt_number)
            player.shirt_number = req.body.shirt_number;
        if (req.body.short_description)
            player.short_description = req.body.short_description;
        if (req.body.biography)
            player.biography = req.body.biography;
        if (req.body.height)
            player.height = req.body.height;
        if (req.body.weight)
            player.weight = req.body.weight;
        if (req.body.nationality)
            player.nationality = req.body.nationality;

        // save the player and check for errors
        player.save(function(err, id) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: 'Player created!', id });
            }
        });
    })

    // get all of the players (accessed at GET http://localhost:8080/api/v1/players)
    // No authentication required.
    .get(function(req, res) {
        Players.find(function(err, players) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(players);
            }
        });
    });


// Routes that end in /players/:player_id
// ----------------------------------------------------
router.route('/v1/players/:player_id')

    // get the player with that id (accessed at GET http://localhost:8080/api/v1/players/:player_id)
    // No authentication required.
    .get(function(req, res) {
        Players.findById(req.params.player_id, function(err, player) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(player);
            }
        });
    })

    // update the player with this id (accessed at PUT http://localhost:8080/api/v1/players/:player_id)
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our Pages model to find the page we want
        Players.findById(req.params.player_id, function(err, player) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            
            // TODO: We currently get back a raw data object, not an object of class Players, (I removed it while debugging,) so I'm making a new Players object here. No big deal.
            // Fill in the elements from the request
            var updatedPlayer = new Players();
            updatedPlayer.id = player.id;
            updatedPlayer.first_name = req.body.first_name || player.first_name;
            updatedPlayer.last_name = req.body.last_name || player.last_name;
            updatedPlayer.date_of_birth = req.body.date_of_birth || player.date_of_birth;
            updatedPlayer.image = req.body.image || player.image;
            updatedPlayer.shirt_number = req.body.shirt_number || player.shirt_number;
            updatedPlayer.position = req.body.position || player.position;
            updatedPlayer.short_description = req.body.short_description || player.short_description;
            updatedPlayer.biography = req.body.biography || player.biography;
            updatedPlayer.height = req.body.height || player.height;
            updatedPlayer.weight = req.body.weight || player.weight;
            updatedPlayer.nationality = req.body.nationality || player.nationality;
            updatedPlayer.onloan_status = req.body.onloan_status || player.onloan_status;
            updatedPlayer.status = req.body.status || player.status;
            updatedPlayer.team = req.body.team || player.team;
            
            // save the player and check for errors
            updatedPlayer.save(function(err, id) {
                if (err) {
                    res.status(err.status).send(err);
                } else {
                    res.json({ message: 'Player updated!', id });
                }
            });
        })
    })
 
    // delete the player with this id (accessed at DELETE http://localhost:8080/api/v1/players/:player_id)
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        Player.remove({
            _id: req.params.player_id
        }, function(err, player) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: 'Successfully deleted', id: player.id });
            }
        });
    });

module.exports = router;
