var express = require('express');
var router = express.Router();
//var moment = require('moment');
var authenticate = require('../middleware/validateRequest');

// MODELS: Our data format
// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
var News = require('../models/News');
const FETCH_LATEST = 'latest';
const FETCH_RECENT = 'recent';

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
    
        // Add a time stamp for this post, (most calls to POST won't include this)
        if (req.body.createdAt)
            news.createdAt = req.body.createdAt;
        else
            news.createdAt = Date.now();
    
        // save the news and check for errors
        news.save(function(err, id, year, month, createdAt) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json({ message: 'News created!', id, year, month, createdAt });
        });
    })

    // get all the news (accessed at GET http://localhost:8080/api/v1/news) or a list of years/months/ids
    // (Optional) listIDs must be true/false as a query parameter to only get IDs back
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have.
        // Optional params to only get a list of the years/months/ids that we have content for so the client can "page"
        var options = {
            year: null,
            month: null,
            listIDs: req.query.listIDs === "true" ? true : false
        }
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json(news);
        });
    });

// Routes that end in /news/:year
// ----------------------------------------------------
router.route('/v1/news/:year')
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year) or a list of months/ids
    // year must be a number, e.g. 2017, or "latest" for the most recent year
    // (Optional) listIDs must be true/false as a query parameter to only get IDs back
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have for this year
        // Optional params to only get a list of the months/ids that we have content for so the client can "page"
        var year = req.params.year;
        switch (year) {
            case FETCH_RECENT:
                break;
            case FETCH_LATEST:
                break;
            default:
                Number(req.params.year);
                break;
        }
        var options = {
            year,
            month: null,
            listIDs: req.query.listIDs === "true" ? true : false
        }
            
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json(news);
        });
    });

// Routes that end in /news/:year/:month
// ----------------------------------------------------
router.route('/v1/news/:year/:month')
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year/:month) or a list of ids
    // year must be a number, e.g. 2017, or "latest" for the most recent year
    // month must be a number, 1-12, or "latest" for the most recent month
    // (Optional) listIDs must be true/false as a query parameter to only get IDs back
    // No authentication required.
    .get(function(req, res) {
        // By default, return all news we have for this year/month
        // Optional params to only get a list of the ids that we have content for so the client can "page"
        var options = {
            year: (req.params.year == FETCH_LATEST) ? FETCH_LATEST : Number(req.params.year),
            month: (req.params.month == FETCH_LATEST) ? FETCH_LATEST : Number(req.params.month),
            listIDs: req.query.listIDs === "true" ? true : false
        }
        
        News.find(options, function(err, news) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }

            res.json(news);
        });
    });


// Routes that end in /news/:year/:month/:news_id
// ----------------------------------------------------
router.route('/v1/news/:year/:month/:news_id')
    // get the news story with that id (accessed at GET http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // year must be a number, e.g. 2017
    // month must be a number, 1-12
    // id must be an article id, e.g. "-KfjGxf03zvpWrCw9cun"
    // No authentication required.
    .get(function(req, res) {
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.findById(options, function(err, news) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json(news);
        });
    })

    // update the news with this id (accessed at PUT http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // year must be a number, e.g. 2017
    // month must be a number, 1-12
    // id must be an article id, e.g. "-KfjGxf03zvpWrCw9cun"
    // User must be authenticated as an admin.
    .put(authenticate.isAdmin, function(req, res) {
        // use our news model to find the story we want
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.findById(options, function(err, newsData) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }

            var news = newsData[options.year][options.month][0];

            // Check if the new created date's year and month match the old ones, (our params)
            var d = new Date(Number(req.body.createdAt));
            var year = d.getFullYear();
            var month = d.getMonth() + 1; // getMonth is 0-11, but we setup Firebase as 1-12
            if (req.params.year != year || req.params.month != month) {
                // Don't match, so remove the old entry before we save the new one
                News.remove(options, function(err, id, year, month) {
                    if (err) {
                        res.status(err.status || 400).send(err);
                        return;
                    }
                });
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
            
            // Add a time stamp for this update, (most calls to PUT won't include this)
            updatedNews.updatedAt = req.body.updatedAt ? req.body.updatedAt : Date.now();

            // save the news and check for errors
            updatedNews.save(function(err, id, year, month, createdAt) {
                if (err) {
                    res.status(err.status || 400).send(err);
                    return;
                }
                res.json({ message: 'News updated!', id, year, month, createdAt });
            });
        })
    })
 
    // delete the news with this id (accessed at DELETE http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // year must be a number, e.g. 2017
    // month must be a number, 1-12
    // id must be an article id, e.g. "-KfjGxf03zvpWrCw9cun"
    // User must be authenticated as an admin.
    .delete(authenticate.isAdmin, function(req, res) {
        var options = {
            year: Number(req.params.year),
            month: Number(req.params.month),
            id: req.params.news_id
        };
        News.remove(options, function(err, id, year, month) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json({ message: 'Successfully deleted', id, year, month });
        });
    });

module.exports = router;
