// Using Firebase
var myFirebase = require('./firebase');
var FirebaseCache = require('./firebaseCache');

// For sorting arrays efficiently
var Sorter = require('../../Sorter');

// For specifying which news stories to download, if not All or a specific year or year/month
const FETCH_LATEST = 'latest';
const FETCH_RECENT = 'recent';

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

class FirebaseCacheNews extends FirebaseCache {
    constructor() {
        super('news');

        // Object with years as objects, which contain months as arrays of story objects (!)
        // {2017: {12: [{id: story, ...}, {...}], 11: [...], ...} 2016: {...}, ...}
        //this.firebaseData = {};

        // Used to cache the list of years and their months, rather than always calculating them
        this.years = null;
        this.months = {};

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
    //  options.year can be FETCH_LATEST (the last year we have data for) or FETCH_RECENT (return at least 6 stories, regardless of year or month)
    //  options.month can be FETCH_LATEST (the last month in the given year we have data for)
    getData(options) {
        var {year, month, id, listIDs} = options;
        var returnData = null;

        if (year == FETCH_RECENT) {
            year = this.getLatestYear();
            month = this.getLatestMonth(year);

            returnData = {};
            returnData[year] = {};
            returnData[year][month] = this.firebaseData[year][month];

            var count = this.firebaseData[year][month].length;
            if (count < 6) {
                var _month = month - 1;
                var _year = year;
                while (_year > NEWS_FIRST_YEAR && count < 6) {
                    while (_month && count < 6) {
                        if (this.firebaseData[_year][_month]) {
                            if (!returnData[_year])
                                returnData[_year] = {};
                            returnData[_year][_month] = this.firebaseData[_year][_month];
                            count += this.firebaseData[_year][_month].length;
                        }
                        --_month;
                    }
                    --_year;
                    _month = 12;
                }
            }

        } else if (year) {
            if (year == FETCH_LATEST) {
                year = this.getLatestYear();
            }

            if (!this.firebaseData[year])
                return null;

            returnData = {};
            returnData[year] = {};

            if (month) {
                if (month == FETCH_LATEST) {
                    month = this.getLatestMonth();
                }

                if (!this.firebaseData[year][month])
                    return null;

                if (id) {
                    for(var i = 0; i < this.firebaseData[year][month].length; ++i) {
                        if (this.firebaseData[year][month][i].id == id) {
                            returnData[year][month] = [];
                            returnData[year][month].push(this.firebaseData[year][month][i]);
                            break;
                        }
                    }
                } else {
                    returnData[year][month] = this.firebaseData[year][month];
                }
            } else {
                returnData[year] = this.firebaseData[year];
            }

        } else {
            returnData = this.firebaseData;
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
}

module.exports = FirebaseCacheNews;
