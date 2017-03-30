// Script to upload an array of new football fixtures, based on JSON data.
// Uses Axios to POST requests, so requires our local server to be running for this script to hit.

var Axios = require('axios');
var fixtureData = require( "./app/models/fixtures.json" );

console.log("INFO: Fixtures to upload: ", fixtureData.length);

for (i = 0; i < fixtureData.length; ++i) {
    //console.log("DEBUG: Fixture: ", fixtureData[i]);
    Axios.post('http://localhost:3000/api/v1/fixtures', fixtureData[i])
    .then(function (response) {
        console.log("OK: Fixture saved ", response.data.id);
    })
    .catch(function (error) {
        console.log("ERR: Fixture not saved: ", error.response.data);
    });
}

console.log("INFO: Fixture list complete.");
