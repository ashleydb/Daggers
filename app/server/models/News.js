// Model for News Articles

// Using Firebase
var myFirebase = require('../cloud/firebase');

// For sorting arrays efficiently
var Sorter = require('../../Sorter');

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

// For specifying which news stories to download, if not All or a specific year or year/month
const FETCH_LATEST = 'latest';

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
        var err = validateOptions(options, false, false, false);
        if (err) {
            // Error
            callback(err);
            return;
        }

        if (options.listIDs) {
            // Only want news story IDs
            if (options.year == FETCH_LATEST) {
                // Get the ID of the most recent year
                getLatestYear()
                .then((latestYear) => {
                    if (options.month == FETCH_LATEST) {
                        // Only get the latest month
                        getLatestMonth(latestYear)
                        .then((latestMonth) => {
                            // Now get the news IDs for the month
                            myFirebase.firebaseRest(`news/${latestYear}/${latestMonth}.json?shallow=true`)
                            .then((content) => {
                                options.year = latestYear;
                                options.month = latestMonth;
                                var returnData = formatJsonForClient(options, content);
                                callback(null, returnData);
                                return;
                            });
                        })
                    } else if (options.month) {
                        // Now get the news IDs for the specified month
                        myFirebase.firebaseRest(`news/${latestYear}/${options.month}.json?shallow=true`)
                        .then((content) => {
                            options.year = latestYear;
                            var returnData = formatJsonForClient(options, content);
                            callback(null, returnData);
                            return;
                        });
                    } else {
                        // Get the news IDs for the whole year
                        callback("Asking for all news story IDs for a year. Not currently implemented. Get all content instead.");
                        return;
                    }
                }).catch((e) => {
                    callback(e);
                    return;
                });
            } else if (options.year) {
                if (options.month == FETCH_LATEST) {
                    // Only get the latest month
                    getLatestMonth(options.year)
                    .then((latestMonth) => {
                        // Now get the news IDs for the month
                        myFirebase.firebaseRest(`news/${options.year}/${latestMonth}.json?shallow=true`)
                        .then((content) => {
                            options.month = latestMonth;
                            var returnData = formatJsonForClient(options, content);
                            callback(null, returnData);
                            return;
                        });
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                } else if (options.month) {
                    // Now get the news IDs for the specified month
                    myFirebase.firebaseRest(`news/${options.year}/${options.month}.json?shallow=true`)
                    .then((content) => {
                        var returnData = formatJsonForClient(options, content);
                        callback(null, returnData);
                        return;
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                } else {
                    // Get the news IDs for the whole year
                    callback("Asking for all news story IDs for a year. Not currently implemented. Get all content instead.");
                    return;
                }
            } else {
                // Get the news IDs for all time
                callback("Asking for all news story IDs for all time. Not currently implemented. Get all content instead.");
                return;
            }
        } else {
            // Want news story content
            if (options.year == FETCH_LATEST) {
                if (options.month) {
                    // Only want a month's data, so need to parse out the year first
                    getLatestYear()
                    .then((latestYear) => {
                        if (options.month == FETCH_LATEST) {
                            // Only get the latest month
                            myFirebase.firebaseRest(`news/${latestYear}.json?orderBy=%22$key%22&limitToLast=1`)
                            .then((content) => {
                                options.year = latestYear;
                                options.month = null; // TODO: Bit of a hack
                                var returnData = formatJsonForClient(options, content);
                                callback(null, returnData);
                                return;
                            });
                        } else {
                            // Now get the news IDs for the specified month
                            myFirebase.firebaseRest(`news/${latestYear}/${options.month}.json`)
                            .then((content) => {
                                options.year = latestYear;
                                var returnData = formatJsonForClient(options, content);
                                callback(null, returnData);
                                return;
                            });
                        }
                    }).catch((e) => {
                        callback(e);
                        return;
                    });

                } else {
                    // Get the news for the whole year
                    myFirebase.firebaseRest("news.json?orderBy=%22$key%22&limitToLast=1")
                    .then((content) => {
                        options.year = null; // TODO: Bit of a hack
                        options.month = null; // TODO: Bit of a hack
                        var returnData = formatJsonForClient(options, content);
                        callback(null, returnData);
                        return;
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                }
            } else if (options.year) {
                if (options.month == FETCH_LATEST) {
                    // Now get the news for the month
                    myFirebase.firebaseRest(`news/${options.year}.json?orderBy=%22$key%22&limitToLast=1`)
                    .then((content) => {
                        options.month = null; // TODO: Bit of a hack
                        var returnData = formatJsonForClient(options, content);
                        callback(null, returnData);
                        return;
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                } else if (options.month) {
                    // Now get the news for the specified month
                    myFirebase.firebaseRest(`news/${options.year}/${options.month}.json`)
                    .then((content) => {
                        var returnData = formatJsonForClient(options, content);
                        callback(null, returnData);
                        return;
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                } else {
                    // Get the news for the whole year
                    myFirebase.firebaseRest(`news/${options.year}.json`)
                    .then((content) => {
                        var returnData = formatJsonForClient(options, content);
                        callback(null, returnData);
                        return;
                    }).catch((e) => {
                        callback(e);
                        return;
                    });
                }
            } else {
                // Get the news for all time
                myFirebase.firebaseRest("news.json")
                .then((content) => {
                    var returnData = formatJsonForClient(options, content);
                    callback(null, returnData);
                    return;
                }).catch((e) => {
                    callback(e);
                    return;
                });
            }
        }
    }

    // Get a single news story from our DB
    // options: contains year, month and id of the news story to find
    // callback: Should be callback(error, news)
    static findById(options, callback) {
        var err = validateOptions(options, true, true, true);
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
        var err = validateOptions(options, true, true, true);
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
}

module.exports = News;

// Get the most recent value from a list of IDs at a given URL, e.g.
//  "news.json?shallow=true" for most recent year
//  `news/${year}.json?shallow=true` for most recent month in a year
function getLatestIds(urlParams) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Get the ID of the most recent year
            myFirebase.firebaseRest(urlParams)
            .then((res) => {
                // Get the values as an array and sort them
                let sortedRes = Object.keys(res);
                sortedRes.sortBy(function(o){ return o });
                let latestRes = sortedRes[sortedRes.length-1];
                resolve(latestRes);
            }).catch((error) => {
                console.log("ERR: Problem fetching latest data:", error);
                reject(error);
            });
        }
    );
}

// Get the most recent year with data in it.
function getLatestYear() {
    return getLatestIds("news.json?shallow=true");
}

// Get the most recent month with data in it for a given year.
//  year should be 2017 or similar.
function getLatestMonth(year) {
    return getLatestIds(`news/${year}.json?shallow=true`);
}

// Get the most recent single news ID for the given year/month.
//  year should be 2017 or similar.
//  month should be 1-12.
function getLatestMonthContent(year, month) {
    return getLatestIds(`news/${year}/${month}.json?shallow=true`);
}

// Takes Firebase json data for news and formats it so that our react client can use it
function formatJsonForClient(options, news) {
    var returnData = {}

    // We may have got no data back
    if (!news)
        return returnData;

    if (options && options.year) {
        if (options.month) {
            // Specific Month. news will be all stories for one month, e.g.  {id: story, id: story, ...}

            // Output should be just an object with story_ids e.g. {2017: 12: [id, id]}
            // Or output should be an object with all story content e.g. {2017: 12: [{story}, {story}]}
            var monthData = options.listIDs ? Object.keys(news) : parseFirebaseNews(news);
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
                    var monthData = options.listIDs ? Object.keys(news[monthId]) : parseFirebaseNews(news[monthId]);
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
                    var monthData = options.listIDs ? Object.keys(news[yearId][monthId]) : parseFirebaseNews(news[yearId][monthId]);
                    if (!returnData[yearId])
                        returnData[yearId] = {};
                    returnData[yearId][monthId] = monthData;
                }
                --monthId;
            }
            --yearId;
        }
    }

    return returnData;
}

// news is a Firebase object that represents an array. Returns a javascript array of objects with ids.
function parseFirebaseNews(news) {
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
function validateOptions(options, requiresYear, requiresMonth, requiresId) {
    var errorMessage = null;
    // Make sure we actually have an options object
    if (options) {
        // Was a year passed in?
        if (options.year) {
            // Check the range of the year is valid
            var d = new Date();
            var year = d.getFullYear();
            // TODO: Could be more rigorous around whether LATEST is allowed, since it is not valid for all APIs
            if (options.year == FETCH_LATEST) {
                // Move along
            } else if (options.year > year || options.year < NEWS_FIRST_YEAR) {
                errorMessage = 'Error: year was out of range';
            }
        } else if (requiresYear) {
            // Error, year was required
            errorMessage = 'Error: year was required';
        }

        // Was a month passed in?
        if (options.month) {
            // Check the range of the month is valid
            // TODO: Could be more rigorous around whether LATEST is allowed, since it is not valid for all APIs
            if (options.month == FETCH_LATEST) {
                // Move along
            } else if (options.month < 1 || options.month > 12) {
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
        console.log('validateOptions: ', errorMessage);
        return {
            "status": 400,
            "message": "Invalid parameters. " + errorMessage
        };
    } else {
        return null;
    }
}
