// Model for league table from http://api.football-data.org
var Axios = require('axios');

const TABLE_API_URL = 'http://api.football-data.org/v1/competitions/442/leagueTable';
const CACHE_EXPIRES = 1000 * 60 * 30; // 30 Mins

// Makes requests to get table data from an API, caching it to save from hitting the URL too often
class Table {
    constructor() {
        this.tableData = {};
        this.nextUpdate = 0;
    }

    // Get table data as JSON
    // callback: Should be callback(error, table)
    fetch(callback) {
        // Check if our cache has expired
        var now = new Date().getTime();
        if (now > this.nextUpdate) {
            this.nextUpdate = now + CACHE_EXPIRES;

            // TODO: How do I do binding for Axios?
            let that = this;

            Axios.get(TABLE_API_URL)
            .then(function (response) {
                var table = response.data;

                if (table) {
                    // Cool, we got content
                    that.tableData = table;
                    callback(null, table);
                } else {
                    console.log('WARN: Table.fetch() was empty');
                    callback('No Table data available.');
                }
            })
            .catch(function (error) {
                console.log("ERR: Problem fetching table:", error);
                callback(error);
            });
        } else {
            //console.log('DEBUG: Returning Table form cache');
            callback(null, this.tableData);
        }
    }
}

module.exports = Table;
