var express = require('express');
var router = express.Router();
//var moment = require('moment');
var authenticate = require('../middleware/validateRequest');

// MODELS: Our data format
// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
var News = require('../models/News');

// Routes that end in /news
// ----------------------------------------------------
router.route('/v1/news')

    // create a news story (accessed at POST http://localhost:8080/api/v1/news)
    // User must be authenticated as an admin.
    .post(authenticate.isAdmin, function(req, res) {
        // create a new instance of the News model
        var news = new News();
    
        // fill in the news elements from the request
        if (req.body.headline)
            news.headline = req.body.headline;
        if (req.body.image)
            news.image = req.body.image;
        if (req.body.summary)
            news.summary = req.body.summary;
        if (req.body.story)
            news.story = req.body.story;
        if (req.body.youtube)
            news.youtube = req.body.youtube;
    
        // Add a time stamp for this post
        news.createdAt = Date.now();
    
        // save the news and check for errors
        news.save(function(err, id, year, month) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json({ message: 'News created!', id, year, month });
        });
    })

    // get all the news (accessed at GET http://localhost:8080/api/v1/news) or a list of years/months/ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have.
        // Optional params to only get a list of the years/months/ids that we have content for so the client can "page"
        var options = {
            year: null,
            month: null,
            listIDs: req.body.listIDs === "true" ? true : false
        }
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json(news);
        });
    });

// Routes that end in /news/:year
// ----------------------------------------------------
router.route('/v1/news/:year')
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year) or a list of months/ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have for this year
        // Optional params to only get a list of the months/ids that we have content for so the client can "page"
        var options = {
            year: Number(req.params.year),
            month: null,
            listIDs: req.body.listIDs === "true" ? true : false
        }
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json(news);
        });
    });

// Routes that end in /news/:year/:month
// ----------------------------------------------------
router.route('/v1/news/:year/:month')
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year/:month) or a list of ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have for this year/month
        // Optional params to only get a list of the ids that we have content for so the client can "page"
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            listIDs: req.body.listIDs === "true" ? true : false
        }
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json(news);
        });
    });


// Routes that end in /news/:year/:month/:news_id
// ----------------------------------------------------
router.route('/v1/news/:year/:month/:news_id')
    // get the news story with that id (accessed at GET http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // No authentication required.
    .get(function(req, res) {
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.findById(options, function(err, news) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            res.json(news);
        });
    })

    // update the news with this id (accessed at PUT http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our news model to find the story we want
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.findById(options, function(err, news) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }
            
            // TODO: We currently get back a raw data object, not an object of class news, (I removed it while debugging,) so I'm making a new news object here. No big deal.
            // Fill in the elements from the request
            var updatedNews = new News();
            updatedNews.id = news.id;
            updatedNews.headline = req.body.headline ? req.body.headline : news.headline;
            updatedNews.image = req.body.image ? req.body.image : news.image;
            updatedNews.summary = req.body.summary ? req.body.summary : news.summary;
            updatedNews.story = req.body.story ? req.body.story : news.story;
            updatedNews.youtube = req.body.youtube ? req.body.youtube : news.youtube;
            updatedNews.createdAt = req.body.createdAt ? req.body.createdAt : news.createdAt;
            
            // Add a time stamp for this update
            updatedNews.updatedAt = Date.now();

            // save the news and check for errors
            updatedNews.save(function(err, id, year, month) {
                if (err) {
                    res.status(err.status).send(err);
                    return;
                }

                res.json({ message: 'News updated!', id, year, month });
            });
        })
    })
 
    // delete the news with this id (accessed at DELETE http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.remove(options, function(err, id, year, month) {
            if (err) {
                res.status(err.status).send(err);
                return;
            }

            res.json({ message: 'Successfully deleted', id, year, month });
        });
    });

module.exports = router;
