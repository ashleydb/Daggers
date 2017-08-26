// Model for Sponsors Articles

// Using Firebase with a cache to represent Sponsors data from our DB
var myFirebase = require('../cloud/firebase');
var FirebaseCacheSponsors = require('../cloud/FirebaseCacheSponsors');
var sponsorsCache = new FirebaseCacheSponsors();

// Represents a Sponsor and interacting with Sponsors.
class Sponsors {
    constructor() {
        this.id = 'new'; //Same as DEFAULT_SPONSOR_ID
        this.name = "Placeholder";
        this.link = "https://www.placeholder.co.uk/";
        this.image = "/sponsors/the-national-league.jpg";
        this.type = "Official Club Partner";

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // Seem to need this helper, since I don't want to send the id field to Firebase
    toObj() {
        var obj = {
            "name": this.name,
            "link": this.link,
            "image": this.image,
            "type": this.type
        };
        
        return obj;
    }

    // Save this sponsors data to our DB
    // callback: Should be callback(error, id)
    save(callback) {
        //console.log('DEBUG: Sponsors.save() this=', this);
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'sponsors/sponsors',
                                   this.id === 'new' ? null : this.id,
                                   this.toObj())
        .then((id) => {
            //Success
            //this.id = id;
            callback(null, id);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get all sponsors data from our DB
    // callback: Should be callback(error, sponsors)
    static find(callback) {
        var sponsors = sponsorsCache.getData({}); // May get back null
        if (!sponsors) {
            callback({
                status: 404,
                message: "Error: Object not found in DB."
            });
        } else {
            callback(null, sponsors);
        }
    }

    // Get a single sponsor from our DB
    // options: contains id of the sponsor to find
    // callback: Should be callback(error, sponsors)
    static findById(options, callback) {
        var sponsors = sponsorsCache.getData(options); // May get back null
        if (!sponsors) {
            callback({
                status: 404,
                message: "Error: Object not found in DB.",
                id: options.id
            });
        } else {
            callback(null, sponsors);
        }
    }

    // Delete a single sponsor from our DB
    // options: contains id of the sponsors sponsor to find
    // callback: Should be callback(error, sponsorsId)
    static remove(options, callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `sponsors/sponsors/${options.id}`)
        .then((result) => {
            if (result) {
                //Success
                callback(null, options.id);
            } else {
                callback(`Error removing object: ${options.id}`);
            }
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = Sponsors;
