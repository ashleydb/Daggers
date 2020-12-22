// Model for league table from http://import.io, based on nationalleague.org.uk
var Axios = require('axios');

const TABLE_API_URL = process.env.LEAGUE_TABLE_URL;
const CACHE_EXPIRES = 1000 * 60 * 30; // 30 Mins

// Makes requests to get table data from an API, caching it to save from hitting the URL too often
class Table {
    constructor() {
        this.tableData = {};
        this.nextUpdate = 0;

        this.fetch = this.fetch.bind( this );
        this.parseTableData = this.parseTableData.bind( this );
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
                    that.parseTableData(table.results);
                    callback(null, that.tableData);
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

    parseTableData(table) {
    //   {
    //   "_links": {
    //     "team": {
    //       "href": "http://api.football-data.org/v1/teams/1114"
    //     }
    //   },
    //   "position": 4,
    //   "teamName": "Dagenham &amp; Redbridge",
    //   "crestURI": "",
    //   "playedGames": 46,
    //   "points": 84,
    //   "goals": 79,
    //   "goalsAgainst": 53,
    //   "goalDifference": 26,
    //   "wins": 26,
    //   "draws": 6,
    //   "losses": 14,
    //   "home": {
    //     "goals": 37,
    //     "goalsAgainst": 28,
    //     "wins": 12,
    //     "draws": 5,
    //     "losses": 6
    //   },
    //   "away": {
    //     "goals": 42,
    //     "goalsAgainst": 25,
    //     "wins": 14,
    //     "draws": 1,
    //     "losses": 8
    //   }
    // }
        var tempTable = {
            "leagueCaption": "English National League",
            "standing": []
        };
        table.forEach(function(element, index) {
            tempTable.standing[index] = {
                "_links": {
                    "team": {
                        "href": element.team_link
                    }
                },
                "position": element.number,
                "teamName": element['team_link/_text'],
                "crestURI": '',
                "playedGames": element.pl_number,
                "points": element.pts_number,
                "goals": element.f_number,
                "goalsAgainst": element.a_number,
                "goalDifference": element.diff_number,
                "wins": element.w_number,
                "draws": element.d_number,
                "losses": element.l_number,
                "home": {
                    "goals": '',
                    "goalsAgainst": '',
                    "wins": element.hw_number,
                    "draws": element.hd_number,
                    "losses": element.hl_number
                },
                "away": {
                    "goals": '',
                    "goalsAgainst": '',
                    "wins": element.aw_number,
                    "draws": element.ad_number,
                    "losses": element.al_number
                }
            };
        }, this);
        this.tableData = tempTable;
    }
}

module.exports = Table;
