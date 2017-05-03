// Model for News Articles

// Using Firebase
var myFirebase = require('../cloud/firebase');

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

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
    // callback: Should be callback(error, id)
    save(callback) {
        //console.log('DEBUG: News.save() this=', this);
        var d = new Date(Number(this.createdAt));
        let year = d.getFullYear();
        let month = d.getMonth() + 1;

        var childName = `news/${year}/${month}`;
        
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   childName,
                                   this.id === 'new' ? null : this.id,
                                   this.toObj())
        .then((id) => {
            //Success
            this.id = id;
            callback(null, id, year, month);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get all news data from our DB
    // options: contains optional year and month, (pull from 'news/year/month',) plus listIDs=true if you only want the ids, not all content
    // callback: Should be callback(error, news)
    static find(options, callback) {
        var err = this.validateOptions(options, false, false, false);
        if (err) {
            // Error
            callback(err);
            return;
        }

        var childName = 'news';
        if (options && options.year) {
            if (options.month)
                childName = `news/${year}/${month}`;
            else
                childName = `news/${year}`;
        }
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   childName)
        .then((news) => {
            //Success

            var returnData = {}

            if (options && options.year) {
                if (options.month) {
                    // Specific Month. news will be all stories for one month, e.g.  {id: story, id: story, ...}

                    // Output should be just an object with story_ids e.g. {2017: 12: [id, id]}
                    // Or output should be an object with all story content e.g. {2017: 12: [{story}, {story}]}
                    var monthData = options.listIDs ? Object.keys(news) : this.parseFirebaseNews(news);
                    // Looks like arrays, but is just syntax for dynamically named properties on objects
                    if (!returnData[options.year])
                        returnData[options.year] = {};
                    returnData[options.year][options.month] = monthData;
                } else {
                    // Full Year. news will be all stories for all months for a year, e.g.  {12: {id: story, ...}, 11: ..., ...}

                    // As above, but looping through all possible months
                    var yearId = options.year;
                    var monthId = 12;
                    while (monthId) {
                        if (news[monthId]) {
                            var monthData = options.listIDs ? Object.keys(news[monthId]) : this.parseFirebaseNews(news[monthId]);
                            if (!returnData[yearId])
                                returnData[yearId] = {};
                            returnData[yearId][monthId] = monthData;
                        }
                        --monthId;
                    }
                }
            } else {
                // All News. news will be all years, months and stories, e.g.  {2017: 12: {id: story, ...}, 11: ..., 2016:...}

                // As above, but looping through all possible years from this year back to NEWS_FIRST_YEAR
                var d = new Date();
                var yearId = d.getFullYear();
                while (yearId > NEWS_FIRST_YEAR) {
                    var monthId = 12;
                    while (monthId) {
                        if (news[yearId] && news[yearId][monthId]) {
                            var monthData = options.listIDs ? Object.keys(news[yearId][monthId]) : this.parseFirebaseNews(news[yearId][monthId]);
                            if (!returnData[yearId])
                                returnData[yearId] = {};
                            returnData[yearId][monthId] = monthData;
                        }
                        --monthId;
                    }
                    --yearId;
                }
            }

            callback(null, returnData);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get a single news story from our DB
    // options: contains year, month and id of the news story to find
    // callback: Should be callback(error, news)
    static findById(options, callback) {
        var err = this.validateOptions(options, true, true, true);
        if (err) {
            // Error
            callback(err);
            return;
        }

        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   `news/${options.year}/${options.month}/${options.id}`)
        .then((news) => {
            //Success

            // May get back an empty object...
            if (!news.headline) {
                callback({
                    status: 400,
                    message: "Error: Object not found in DB.",
                    year: options.year,
                    month: options.month,
                    id: options.id
                });
            } else {
                news.id = options.id;
                callback(null, news);
            }
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete a single news story from our DB
    // options: contains year, month and id of the news story to find
    // callback: Should be callback(error, news)
    static remove(options, callback) {
        var err = this.validateOptions(options, true, true, true);
        if (err) {
            // Error
            callback(err);
            return;
        }

        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `news/${options.year}/${options.month}/${options.id}`)
        .then((id) => {
            //Success
            callback(null, options.id, options.year, options.month);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // news is a Firebase object that represents an array. Returns a javascript array of objects with ids.
    static parseFirebaseNews(news) {
        // This will be the output array we want
        var parsedNews = [];

        // id will be the id values we need, which is the object (array index) name in the firebase object.
        // Would be easy with the spread operator...
        Object.keys(news).forEach((id) => {
            
            var headline = news[id].headline;
            var summary = news[id].summary;
            var story = news[id].story;
            var image = news[id].image;
            var createdAt = news[id].createdAt;
            var updatedAt = news[id].updatedAt;
            var youtube = news[id].youtube;
            
            parsedNews.push({
                id, headline, summary, story, image, createdAt, updatedAt, youtube
            });
        });

        return parsedNews;
    }

    // Checks if options are valid. Returns null for success or an error object.
    static validateOptions(options, requiresYear, requiresMonth, requiresId) {
        var errorMessage = null;
        // Make sure we actually have an options object
        if (options) {
            // Was a year passed in?
            if (options.year) {
                // Check the range of the year is valid
                var d = new Date();
                var year = d.getFullYear();
                if (options.year > year || options.year < NEWS_FIRST_YEAR) {
                    errorMessage = 'Error: year was out of range';
                }
            } else if (requiresYear) {
                // Error, year was required
                errorMessage = 'Error: year was required';
            }

            // Was a month passed in?
            if (options.month) {
                // Check the range of the month is valid
                if (options.month < 1 || options.month > 12) {
                    errorMessage = 'Error: month was out of range';
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
            return {
                "status": 400,
                "message": "Invalid parameters. " + errorMessage
            };
        } else {
            return null;
        }
    }
}

module.exports = News;
