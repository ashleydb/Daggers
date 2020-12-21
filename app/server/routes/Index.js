// Routes that are most likley to be entered (or shared) as URLs by users and thus accessed
// by social media and web search scrapers. We'll customize the <meta> tags here.

var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/validateRequest');

// Returns the content of a complete index.html using the values passed in to complete the <meta> tags.
// Pass null for any values to use defaults typically used for the homepage.
function createIndex(_title = null, _description = null, _image = null, _url = null) {
    var title = (_title) ? `Dagenham &amp; Redbridge FC | ${_title}` : 'Dagenham &amp; Redbridge FC';
    var description = (_description) ? _description : 'Home of D&amp;R Football Club in London. Digger Dagger, Digger Dagger, Oi Oi Oi!';
    var image = (_image) ? _image : 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg';
    var url = (_url) ? _url : 'https://www.daggers.co.uk/';

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta charset="utf-8"/>
      <meta name="description" content="${description}" />
      <!--  Essential Social META Tags -->
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${url}" />
      <meta name="twitter:card" content="summary_large_image" />
      <!--  Non-Essential, But Recommended for Social -->
      <meta property="og:site_name" content="Dagenham &amp; Redbridge FC" />
      <meta name="twitter:image:alt" content="Dagenham &amp; Redbridge FC" />
      <meta property="og:type" content="article" />
      <!--  Non-Essential, But Required for Social Analytics -->
      <!--  <meta property="fb:app_id" content="your_app_id" /> -->
      <meta name="twitter:site" content="@dag_redfc" />
      <!-- app icons and related info -->
      <link rel="stylesheet" href="https://daggers.storage.googleapis.com/fonts/foundation-icons.css">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png">
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/manifest.json">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#233592">
      <link rel="shortcut icon" href="/favicon.ico">
      <meta name="apple-mobile-web-app-title" content="Dagenham &amp; Redbridge FC">
      <meta name="application-name" content="Dagenham &amp; Redbridge FC">
      <meta name="msapplication-TileColor" content="#2b5797">
      <meta name="msapplication-TileImage" content="/mstile-144x144.png">
      <meta name="theme-color" content="#233592">
      <!--<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">/script>-->
    </head>
    <body>
      <div id="app"></div>
      <script src="/bundle.js"></script>
      <script>
        if(navigator.serviceWorker) {
          navigator.serviceWorker.register('/sw.js')
          .catch(function(err) {
            console.error('Unable to register service worker.', err);
          });
        }
      </script>
      <noscript>
        Sorry, but your browser currently has JavaScript disabled but it is required to use this website. You should try one of the following:
        <ul>
          <li><a href="https://www.google.com/search?q=enable+javascript+in+my+browser">Enable JavaScript in your Browser</a></li>
          <li>Try a new browser, such as <a href="https://www.google.com/chrome/browser/">Chrome</a> or <a href="https://www.mozilla.org/firefox">FireFox</a></li>
        </ul>
      </noscript>
    </body>
    </html>`;
}

// Routes for root pages
// ----------------------------------------------------
router.route('/news')
    // News homepage
    .get(function(req, res) {
        res.send(createIndex("News", "The latest news from D&amp;R Football Club.", 'https://daggers.storage.googleapis.com/basics/News-Generic2_169.jpg', "https://www.daggers.co.uk/news"));
    });

router.route('/fixtures')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Fixtures", "Fixtures and results for D&amp;R Football Club.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/fixtures"));
    });

router.route('/table')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Table", "League Table featuring D&amp;R Football Club.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/table"));
    });

router.route('/tickets')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Tickets", "Details on ticket sales for D&amp;R Football Club fixtures.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/tickets"));
    });

router.route('/team')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Team", "Player profiles from D&amp;R Football Club.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/team"));
    });

router.route('/fans')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Fans", "Information for D&amp;R Football Club Fans, including away travel details and match highlights.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/fans"));
    });

router.route('/community')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Community", "The D&amp;R Football Club Community Trust.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/community"));
    });

router.route('/club')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Club", "Club information, including the history of D&amp;R Football Club.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/club"));
    });

router.route('/commercial')
    // Fixtures homepage
    .get(function(req, res) {
        res.send(createIndex("Commercial", "Commercial opportunities, including hospitality and sponsorship with D&amp;R Football Club.", 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', "https://www.daggers.co.uk/commercial"));
    });

// Routes for news stories, /news/:news_id
// ----------------------------------------------------
var News = require('../models/News');
router.route('/news/:news_id')
    // get the news story with that id (accessed at GET http://localhost:3080/news/:news_id)
    // id must be an article id, e.g. "-KfjGxf03zvpWrCw9cun"
    // No authentication required, but need to be an admin if this is future news
    .get(function(req, res) {
        var options = {
            id: req.params.news_id,
            isAdmin: authenticate.checkAdmin(req)
        };
        News.findByIdBrute(options, function(err, news) {
            if (err) {
                res.status(err.status || 400).send(err);
                return;
            }
            res.send(createIndex(news.headline, news.summary, `https://daggers.storage.googleapis.com/daggers${news.image}`, `https://www.daggers.co.uk/news/${news.id}`));
        });
    });


// Routes for pages, /page/:page_id
// ----------------------------------------------------
var Pages = require('../models/Pages');
router.route('/page/:page_id')
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
                res.send(createIndex(page.name, page.name, 'https://storage.cloud.google.com/daggers/basics/stadium-tbs.jpg', `https://www.daggers.co.uk/page/${page.id}`));
            }
        });
    });
    
module.exports = router;
