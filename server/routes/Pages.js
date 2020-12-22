var express = require('express');
var router = express.Router();
//var moment = require('moment');
var authenticate = require('../middleware/validateRequest');

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var Pages = require('../models/Pages');

// Cache value to represent Pages data from our DB
var Cache = require('../cache');
var PageCache = new Cache();
PageCache.setTimeout(60 * 24); // 24hr cache

// Routes that end in /pages
// ----------------------------------------------------
router.route('/v1/pages')

    // create a page (accessed at POST http://localhost:8080/api/v1/pages)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the Pages model
        var page = new Pages();
    
        // fill in the page elements from the request
        if (req.body.name) {
            page.name = req.body.name;
        } else {
            res.status(400).send({ error: 'ERR: Missing page name' });
            return;
        }
        if (req.body.content) {
            page.content = req.body.content;
        } else {
            res.status(400).send({ error: 'ERR: Missing page content' });
            return;
        }
    
        // Add a time stamp for this post
        page.createdAt = Date.now();
    
        // save the page and check for errors
        page.save(function(err, id) {
            PageCache.invalidate();
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: 'Page created!', id });
            }
        });
    })

    // get all of the pages (accessed at GET http://localhost:8080/api/v1/pages)
    // No authentication required.
    .get(function(req, res) {
        var pages = PageCache.getDataIfValid();
        if (pages) {
            //console.log('DEBUG: Using Page Cache!');
            res.json(pages);
        } else {
            Pages.find(function(err, pages) {
                if (err) {
                    res.status(err.status).send(err);
                } else {
                    PageCache.setData(pages);
                    res.json(pages);
                }
            });
        }
    });


// Routes that end in /pages/:page_id
// ----------------------------------------------------
router.route('/v1/pages/:page_id')

    // get the page with that id (accessed at GET http://localhost:8080/api/v1/pages/:page_id)
    // No authentication required.
    .get(function(req, res) {
        // var pages = PageCache.getDataIfValid();
        // if (pages) {
        //     // TODO: loop through pages to find the one with the relevant id
        // }

        Pages.findById(req.params.page_id, function(err, page) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(page);
            }
        });
    })

    // update the page with this id (accessed at PUT http://localhost:8080/api/v1/pages/:page_id)
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our Pages model to find the page we want
        Pages.findById(req.params.page_id, function(err, page) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            
            // TODO: We currently get back a raw data object, not an object of class Pages, (I removed it while debugging,) so I'm making a new Pages object here. No big deal.
            // Fill in the elements from the request
            var updatedPage = new Pages();
            updatedPage.id = page.id;
            updatedPage.name = req.body.name ? req.body.name : page.name;
            updatedPage.content = req.body.content ? req.body.content : page.content;
            
            // Add a time stamp for this update
            updatedPage.updatedAt = Date.now();

            // save the page and check for errors
            updatedPage.save(function(err, id) {
                PageCache.invalidate();
                if (err) {
                    res.status(err.status).send(err);
                } else {
                    res.json({ message: 'Page updated!', id });
                }
            });
        })
    })
 
    // delete the page with this id (accessed at DELETE http://localhost:8080/api/v1/pages/:page_id)
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        Pages.remove({
            _id: req.params.page_id
        }, function(err, page) {
            PageCache.invalidate();
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json({ message: 'Successfully deleted', id: page.id });
            }
        });
    });

module.exports = router;
