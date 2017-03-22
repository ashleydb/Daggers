var express = require('express');
var router = express.Router();
var moment = require('moment');

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var News = require('../models/News');

// Routes that end in /news
// ----------------------------------------------------
router.route('/v1/news')

    // create a news story (accessed at POST http://localhost:8080/api/v1/news)
    .post(function(req, res) {
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
        news.createdAt = moment().unix();
    
        // save the news and check for errors
        news.save(function(err, id) {
            if (err)
                res.send(err);

            res.json({ message: 'News created!', id });
        });
    })

    // get all the news (accessed at GET http://localhost:8080/api/v1/news)
    .get(function(req, res) {
        News.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
        });
    });


// Routes that end in /news/:news_id
// ----------------------------------------------------
router.route('/v1/news/:news_id')

    // get the news story with that id (accessed at GET http://localhost:8080/api/v1/news/:news_id)
    .get(function(req, res) {
        News.findById(req.params.news_id, function(err, news) {
            if (err)
                res.send(err);
            res.json(news);
        });
    })

    // update the news with this id (accessed at PUT http://localhost:8080/api/v1/news/:news_id)
    .put(function(req, res) {
        // use our news model to find the story we want
        News.findById(req.params.news_id, function(err, news) {
            if (err)
                res.send(err);
            
            // TODO: We currently get back a raw data object, not an object of class news, (I removed it while debugging,) so I'm making a new news object here. No big deal.
            // Fill in the elements from the request
            var updatedNews = new News();
            updatedNews.id = news.id;
            updatedNews.headline = req.body.headline ? req.body.headline : news.headline;
            updatedNews.image = req.body.image ? req.body.image : news.image;
            updatedNews.summary = req.body.summary ? req.body.summary : news.summary;
            updatedNews.story = req.body.story ? req.body.story : news.story;
            updatedNews.youtube = req.body.youtube ? req.body.youtube : news.youtube;
            
            // Add a time stamp for this update
            updatedNews.updatedAt = moment().unix();

            // save the news and check for errors
            updatedNews.save(function(err, id) {
                if (err)
                    res.send(err);

                res.json({ message: 'News updated!', id });
            });
        })
    })
 
    // delete the news with this id (accessed at DELETE http://localhost:8080/api/v1/news/:news_id)
    .delete(function(req, res) {
        News.remove({
            _id: req.params.news_id
        }, function(err, news) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', id: news.id });
        });
    });

module.exports = router;
