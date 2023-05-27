var express = require('express');
var router = express.Router();
//var moment = require('moment');
var authenticate = require('../middleware/validateRequest');

// Routes that end in /newsletter
// ----------------------------------------------------
router.route('/v1/newsletter')

    // subscribe to mailchimp newsletter (accessed at POST http://localhost:8080/api/v1/newsletter)
    .post(function(req, res) {
        // create a new instance of the News model
        var news = new News();
    
        // fill in the news elements from the request
        if (req.body.email) {
            
        }

        // // This is from the MailChimp HTML code. Need to take the id from this action URL
        // <form action=
        // "https://daggers-shop.us18.list-manage.com/subscribe/post?u=ba7b0f7c90358e4887f6df5d1&amp;id=89ed1b6fa1&amp;f_id=00cd0ae1f0"
        // class="validate" id="mc-embedded-subscribe-form" method="post" name=
        // "mc-embedded-subscribe-form" novalidate="novalidate" target="_blank">

        // // This is example code from https://www.freecodecamp.org/news/how-to-integrate-mailchimp-in-a-javascript-web-app-2a889fb43f6f/#:~:text=the%20subscribe%20method.-,Method,-subscribe()
        // Would need to finish this up with a mailchimp API key, etc.
        // await new Promise((resolve, reject) => {    request.post(      {        uri: // to be discussed        headers: {          Accept: 'application/json',          Authorization: // to be discussed,        },        json: true,        body: data,      },      (err, response, body) => {        if (err) {          reject(err);        } else {          resolve(body);        }      },    );  });}

    
        // save the news and check for errors
        news.save(function(err, id, year, month, createdAt) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.json({ message: 'News created!', id, year, month, createdAt });
        });
    });

module.exports = router;
