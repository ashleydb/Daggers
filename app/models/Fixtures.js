// Model for Fixtures

var myFirebase = require('../cloud/firebase');

// DEBUG: Loading in some static json data to use for fixtures
//var DEBUG_FIXTURE_DATA = require( "./fixtures.json" );

// Represents a Fixture and can get a List
// Class API is modeled after the Google Cloud Datastore API.
class Fixtures {
    constructor(_id = undefined, _date = undefined, _home_away = undefined,
                _team = undefined, _logo = undefined, _competition = undefined,
                _w_l_d = undefined, _attendance = undefined, _report = undefined, _result = undefined) {
        this.id = _id || 0; //Same as DEFAULT_FIXTURE_ID
        this.date = _date || '01-JAN-2100';
        this.home_away = _home_away || 'H';
        this.competition = _competition || 'Vanarama National League';
        this.logo = _logo || undefined;
        this.team = _team || undefined;
        this.w_l_d = _w_l_d || undefined;
        this.attendance = _attendance || undefined;
        this.report = _report || undefined;
        this.result = _result || undefined;
    }

    // TODO: Do I really need this helper? Seems so, since I don't want to send the id field, (that is a separate parameter to Firebase,) and also need to make sure there is a value on each variable, (otherwise Firebase barfs.)
    toObj() {
        var obj = {}
        
        if (this.date && this.date != '')
            obj.date = this.date;
        
        if (this.home_away && this.home_away != '')
            obj.home_away = this.home_away;
        
        if (this.competition && this.competition != '')
            obj.competition = this.competition;
        
        if (this.logo && this.logo != '')
            obj.logo = this.logo;
        
        if (this.w_l_d && this.w_l_d != '')
            obj.w_l_d = this.w_l_d;
        
        if (this.attendance && this.attendance != '')
            obj.attendance = this.attendance;
        
        if (this.team && this.team != '')
            obj.team = this.team;
        
        if (this.report && this.report != '')
            obj.report = this.report;
        
        if (this.result && this.result != '')
            obj.result = this.result;
        
        console.log("DEBUG: Fixtures.toObj(): ", obj)
        return obj;
    }

    // Save this fixture data to our DB
    // callback: Should be callback(error, id)
    save(callback) {
        //console.log('DEBUG: Fixture.save() this=', this);
        
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'fixtures',
                                   this.id === 'new' ? null : this.id,
                                   this.toObj())
            .then((id) => {
            //Success
            this.id = id;
            callback(null, id);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get all fixtures data from our DB
    // callback: Should be callback(error, news)
    static find(callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   'fixtures')
        .then((fixtures) => {
            //Success
            
            // This will be the output array we want
            var parsedFixtures = [];

            // id will be the id values we need, which is the object (array index) name in the firebase object.
            // Would be easy with the spread operator...
            Object.keys(fixtures).forEach((id) => {
                var date = fixtures[id].date;
                var home_away = fixtures[id].home_away;
                var logo = fixtures[id].logo;
                var team = fixtures[id].team;
                var w_l_d = fixtures[id].w_l_d;
                var competition = fixtures[id].competition;
                var attendance = fixtures[id].attendance;
                var report = fixtures[id].report;
                var result = fixtures[id].result;
                
                parsedFixtures.push({
                    id, date, home_away, logo, team, w_l_d, competition, attendance, report, result
                });
            });

//            // DEBUG / TODO: Remove this and actually have the date in Firebase
//            console.log("DEBUG: Fixtures.find(): fixtures=", fixtures)
//            if (parsedFixtures.length == 0) {
//                // No fixture data in Firebase, so return some default data
//                callback(null, DEBUG_FIXTURE_DATA);
//                return;
//            }
            
            callback(null, parsedFixtures);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get a single fixture from our DB
    // fixtureId: id of the fixture to find
    // callback: Should be callback(error, news)
    static findById(fixtureId, callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   `fixtures/${fixtureId}`)
        .then((fixture) => {
            //Success
            fixture.id = fixtureId;
            callback(null, fixture);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete a single fixture from our DB
    // params: contains an _id of the fixture to find
    // callback: Should be callback(error, news)
    static remove(params, callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `fixtures/${params._id}`)
        .then((id) => {
            //Success
            var fixture = {id: params._id};
            callback(null, fixture);
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = Fixtures;
