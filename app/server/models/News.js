// Model for News Articles

// Use CGP Error Reporting
const ErrorReporting = require('@google-cloud/error-reporting').ErrorReporting;
//const errors = new ErrorReporting({ignoreEnvironmentCheck:true}); // To run locally during development
const errors = new ErrorReporting(); // To run on GCP server

// Using Firebase with a cache to represent News data from our DB
var myFirebase = require('../cloud/firebase');
var FirebaseCacheNews = require('../cloud/FirebaseCacheNews');
var newsCache = new FirebaseCacheNews();

// For sorting arrays efficiently
var Sorter = require('../../Sorter');

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

// For specifying which news stories to download, if not All or a specific year or year/month
const FETCH_LATEST = 'latest';
const FETCH_RECENT = 'recent';

// Represents a News story.
class News {
    constructor() {
        this.id = 'new'; //Same as DEFAULT_STORY_ID
        this.headline = 'Placeholder';
        this.image = '/images/news-thumbnail.jpg';
        this.summary = 'Placeholder';
        this.story = 'Placeholder';
        
        // These are added when calling POST or PUT respectively
        //this.createdAt = 0;
        //this.updatedAt = 0;
        
        // These are optional components of a story
        //this.youtube = null;

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // Seem to need this helper, since I don't want to send the id field to Firebase
    toObj() {
        var obj = {
            "headline": this.headline,
            "image": this.image,
            "summary": this.summary,
            "story": this.story,
            "createdAt": this.createdAt
        };
        
        if (this.updatedAt) {
            obj.updatedAt = this.updatedAt;
        }
        if (this.youtube) {
            obj.youtube = this.youtube;
        }
        
        return obj;
    }

    // Save this news data to our DB
    // callback: Should be callback(error, id, year, month, createdAt)
    save(callback) {
        //console.log('DEBUG: News.save() this=', this);
        var d = new Date(Number(this.createdAt));
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let createdAt = this.createdAt;

        var childName = `news/${year}/${month}`;
        
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   childName,
                                   this.id === 'new' ? null : this.id,
                                   this.toObj())
        .then((id) => {
            //Success
            //this.id = id;
            callback(null, id, year, month, createdAt);
        }, (e) => {
            // Error

            // Report an Error object to GCP
            errors.report(new Error('Models:News:Save() - ' + e.message), () => {
                console.log('Models:News:Save() error reported.');
            });

            callback(e);
        });
    }

    // Get all news data from our DB
    // options: contains optional year and month, (pull from 'news/year/month',) plus listIDs=true if you only want the ids, not all content
    // callback: Should be callback(error, news)
    static find(options, callback) {
        var err = validateOptions(options, false, false, false);
        if (err) {
            // Error

            // Report an Error object to GCP
            errors.report(new Error('Models:News:Find() - ' + e.message), () => {
                console.log('Models:News:Save() error reported.');
            });

            callback(err);
            return;
        }

        var news = newsCache.getData(options);// May get back null
        if (!news) {
            callback({
                status: 404,
                message: "Error: Object not found in DB.",
                year: options.year,
                month: options.month,
                id: options.id,
                listIDs: options.listIDs
            });
        } else {
            callback(null, news);
        }
    }

    // Get a single news story from our DB
    // options: contains year, month and id of the news story to find
    // callback: Should be callback(error, news)
    static findById(options, callback) {
        var err = validateOptions(options, true, true, true);
        if (err) {
            // Error

            // Report an Error object to GCP
            errors.report(new Error('Models:News:FindById() - ' + e.message), () => {
                console.log('Models:News:Save() error reported.');
            });

            callback(err);
            return;
        }

        var news = newsCache.getData(options);

        // May get back null
        if (!news) {
            callback({
                status: 404,
                message: "Error: Object not found in DB.",
                year: options.year,
                month: options.month,
                id: options.id
            });
        } else {
            callback(null, news);
        }
    }

    // Delete a single news story from our DB
    // options: contains year, month and id of the news story to find
    // callback: Should be callback(error, newsId, year, month)
    static remove(options, callback) {
        var err = validateOptions(options, true, true, true);
        if (err) {
            // Error

            // Report an Error object to GCP
            errors.report(new Error('Models:News:Remove() - Invalid Options - ' + e.message), () => {
                console.log('Models:News:Save() error reported.');
            });

            callback(err);
            return;
        }

        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `news/${options.year}/${options.month}/${options.id}`)
        .then((result) => {
            if (result) {
                //Success
                callback(null, options.id, options.year, options.month);
            } else {
                callback(`Error removing object: ${options.id}`);
            }
        }, (e) => {
            // Error

            // Report an Error object to GCP
            errors.report(new Error('Models:News:Remove() - ' + e.message), () => {
                console.log('Models:News:Save() error reported.');
            });

            callback(e);
        });
    }
}

module.exports = News;

// Checks if options are valid. Returns null for success or an error object.
function validateOptions(options, requiresYear, requiresMonth, requiresId) {
    var errorMessage = null;
    // Make sure we actually have an options object
    if (options) {
        // Was a year passed in?
        if (options.year) {
            // Check the range of the year is valid
            var d = new Date();
            var year = d.getFullYear();
            // TODO: Could be more rigorous around whether LATEST/RECENT are allowed, since they are not valid for all APIs
            if (options.year != FETCH_LATEST && options.year != FETCH_RECENT) {
                options.year = Number(options.year);
                if (options.year > year || options.year < NEWS_FIRST_YEAR) {
                    errorMessage = 'Error: year was out of range';
                }
            }
        } else if (requiresYear) {
            // Error, year was required
            errorMessage = 'Error: year was required';
        }

        // Was a month passed in?
        if (options.month) {
            // Check the range of the month is valid
            // TODO: Could be more rigorous around whether LATEST is allowed, since it is not valid for all APIs
            if (options.month != FETCH_LATEST) {
                options.month = Number(options.month);
                if (options.month < 1 || options.month > 12) {
                    errorMessage = 'Error: month was out of range';
                }
            }
            // Always need a year with a month
            if (!options.year) {
                errorMessage = 'Error: month was specified without a year';
            }
        } else if (requiresMonth) {
            // Error, month was required
            errorMessage = 'Error: month was required';
        }

        // Was an ID needed and present?
        if (requiresId && !options.id) {
            errorMessage = 'Error: id was required';
        }
    } else {
        errorMessage = 'Error: options was null';
    }

    if (errorMessage) {
        console.log('validateOptions: ', errorMessage);
        return {
            "status": 400,
            "message": "Invalid parameters. " + errorMessage
        };
    } else {
        return null;
    }
}
