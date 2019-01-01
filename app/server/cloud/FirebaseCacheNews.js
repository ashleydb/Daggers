// Using Firebase
//var myFirebase = require('./firebase');
var FirebaseCache = require('./firebaseCache');

// For sorting arrays efficiently
var Sorter = require('../../Sorter');

// For specifying which news stories to download, if not All or a specific year or year/month
const FETCH_LATEST = 'latest';
const FETCH_RECENT = 'recent';

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

// How many stories to fetch from the server when getting Recent stories for the homepage
const NEWS_RECENT_STORY_COUNT = 5;

class FirebaseCacheNews extends FirebaseCache {
    constructor() {
        super('news');

        // Object with years as objects, which contain months as arrays of story objects (!)
        // {2017: {12: [{id: story, ...}, {...}], 11: [...], ...} 2016: {...}, ...}
        //this.firebaseData = {};

        // Used to cache the list of years and their months, rather than always calculating them
        this.years = null;
        this.months = {};

        // Used to cache the latest news stories or numerical year/month rather than always calculating them
        this.recentNews = null;
        this.latestYearNonAdmin = null;
        this.latestMonthNonAdmin = null;

        // BINDING: Keep 'this' scoped to this object in any handlers
        this.getYears = this.getYears.bind(this);
        this.getMonths = this.getMonths.bind(this);
        this.getLatestYear = this.getLatestYear.bind(this);
        this.getLatestMonth = this.getLatestMonth.bind(this);
    }

    parseSnapshot(snapshot) {
        var year = snapshot.key;
        // Always clear out so we don't have duplicate/old data
        this.firebaseData[year] = {};
        this.years = null;
        this.months = {};
        this.recentNews = null;
        this.latestYearNonAdmin = null;
        this.latestMonthNonAdmin = null;

        snapshot.forEach(function(monthSnapshot) {
            var month = monthSnapshot.key;
            // Always clear out so we don't have duplicate/old data
            this.firebaseData[year][month] = [];

            monthSnapshot.forEach(function(postSnapshot) {
                var newPost = postSnapshot.val();

                // Object for an individual news post
                var temp = {};
                temp.id = postSnapshot.key;
                temp.headline = newPost.headline;
                temp.summary = newPost.summary;
                temp.story = newPost.story;
                temp.image = newPost.image;
                temp.createdAt = newPost.createdAt;
                temp.updatedAt = newPost.updatedAt;
                temp.youtube = newPost.youtube;

                this.firebaseData[year][month].push(temp);
            }.bind(this));
        }.bind(this));
    }

    // Gets data from our firebase cache.
    // You can ask for:
    //  options.year (e.g. 2017), options.month (1-12) and options.id to get a specific story
    //  options.year and options.month to get a month's data
    //  options.year to get a year's data
    //  no options to get all data
    //  (TODO) options.listIDs (true/false) gets just the IDs, otherwise you get the content
    //  options.year can be FETCH_LATEST (the last year we have data for) or FETCH_RECENT (return at least NEWS_RECENT_STORY_COUNT stories, regardless of year or month)
    //  options.month can be FETCH_LATEST (the last month in the given year we have data for)
    getData(options) {
        var {year, month, id, listIDs, isAdmin} = options;
        var returnData = null;

        if (year == FETCH_RECENT) {
            // Admins never use RECENT, so we never return future stories here
            if (this.recentNews) {
                returnData = this.recentNews;
            } else {
                year = this.getLatestYear();
                month = this.getLatestMonth(year);

                returnData = {};
                returnData[year] = {};
                returnData[year][month] = this.hideFutureStories(this.firebaseData[year][month]);

                var count = returnData[year][month].length;
                if (count < NEWS_RECENT_STORY_COUNT) {
                    var _month = month - 1;
                    var _year = year;
                    while (_year > NEWS_FIRST_YEAR && count < NEWS_RECENT_STORY_COUNT) {
                        while (_month && count < NEWS_RECENT_STORY_COUNT) {
                            if (this.firebaseData[_year][_month]) {
                                if (!returnData[_year])
                                    returnData[_year] = {};
                                returnData[_year][_month] = this.hideFutureStories(this.firebaseData[_year][_month]);
                                count += returnData[_year][_month].length;
                            }
                            --_month;
                        }
                        --_year;
                        _month = 12;
                    }
                }

                this.recentNews = returnData;
            }

        } else if (year) {
            // Get ms since epoch right now
            var now = new Date();
            // A data object to work with for this request
            var requestDate = new Date();

            if (year == FETCH_LATEST) {
                // Only admins can request data for a future year
                if (isAdmin) {
                    year = this.getLatestYear();
                } else if (this.latestYearNonAdmin) {
                    year = this.latestYearNonAdmin;
                } else {
                    var years = this.getYears(); // Array of year values
                    var _year = 9999; // For our loop to find a valid year
                    var currentYear = now.getUTCFullYear(); // Year right now to compare against

                    for (i = 0; i < years.length; ++i) {
                        _year = years[i];
                        if (_year <= currentYear) {
                            break;
                        }
                    }
                    // One last final check that we didn't loop through the whole array
                    if (_year > currentYear)
                        return null;
                    else {
                        year = _year;
                        this.latestYearNonAdmin = _year;
                    }
                }
            }

            if (!this.firebaseData[year])
                return null;

            returnData = {};
            returnData[year] = {};

            if (month) {
                if (month == FETCH_LATEST) {
                    // Only admins can request data for a future year
                    if (isAdmin) {
                        month = this.getLatestMonth(year);
                    } else if ((year == this.latestYearNonAdmin) && this.latestMonthNonAdmin) {
                        month = this.latestMonthNonAdmin;
                    } else {
                        var months = this.getMonths(year); // Array of month values
                        var _month = 13; // For our loop to find a valid month
                        requestDate.setUTCFullYear(year);
                        var nowMs = now.getTime();

                        for (i = 0; i < months.length; ++i) {
                            _month = months[i];
                            // JS Date uses months as 0-11, but we setup Firebase as 1-12
                            requestDate.setUTCMonth(_month - 1);
                            if (requestDate.getTime() <= nowMs) {
                                break;
                            }
                        }
                        // One last final check that we didn't loop through the whole array
                        if (requestDate.getTime() > nowMs)
                            return null;
                        else {
                            month = _month;
                            this.latestMonthNonAdmin = _month;
                        }
                    }
                }

                if (!this.firebaseData[year][month])
                    return null;

                if (id) {
                    for(var i = 0; i < this.firebaseData[year][month].length; ++i) {
                        var story = this.firebaseData[year][month][i];
                        if (story.id == id) {
                            if (story.createdAt < now.getTime() || isAdmin) {
                                returnData[year][month] = [];
                                returnData[year][month].push(story);
                                break;
                            } else {
                                return null;
                            }
                        }
                    }
                } else {
                    // Parse out any future stories from this month, if needed
                    returnData[year][month] = isAdmin ? this.firebaseData[year][month] : this.hideFutureStories(this.firebaseData[year][month]);
                }
            } else {
                // Only admins can request all data without a year and month
                if (isAdmin)
                    returnData[year] = this.firebaseData[year];
                else
                    return null;
            }

        } else {
            // Only admins can request all data without a year and month
            if (isAdmin)
                returnData = this.firebaseData;
            else
                return null;
        }

        return returnData;
    }

    // Additional custom helpers
    getYears() {
        if (!this.years) {
            this.years = Object.keys(this.firebaseData).sortBy(function(o){ return -o; });
        }
        return this.years;
    }

    getMonths(year) {
        if (!this.months[year]) {
            this.months[year] = Object.keys(this.firebaseData[year]).sortBy(function(o){ return -o; });
        }
        return this.months[year];
    }

    getLatestYear() {
        return this.getYears()[0];
    }

    getLatestMonth(year) {
        return this.getMonths(year)[0];
    }

    // Pass in an array of story objects and this method will return a new array of stories with any future scheduled stories removed
    hideFutureStories(stories) {
        //stories is an array of story objects, e.g. [{id: story, ...}, {...}]
        var returnData = [];

        // Get ms since epoch right now
        var today = new Date().getTime();

        stories.forEach(element => {
            // Get ms since epoch of this story's publish time
            // var storyDate = new Date(element.createdAt).getTime();
            // if (storyDate <= today) {
            //     returnData.push(element);
            // }
            if (element.createdAt <= today) {
                returnData.push(element);
            }
        });

        return returnData;
    }
}

module.exports = FirebaseCacheNews;
