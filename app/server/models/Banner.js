// Model for individual Banner

// Using Firebase
var myFirebase = require('../cloud/firebase');

// Represents a Banner
// Class API is modeled after the Google Cloud Datastore API.
class Banner {
    constructor() {
        this.image = null;
        this.link = null;
        this.description = null;

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // TODO: Do I really need this helper? Seems so, since I don't want to send the id field.
    toObj() {
        var obj = {
            "image": this.image,
            "link": this.link,
            "description": this.description
        };
        
        return obj;
    }

    // Save this banner data to our DB
    // callback: Should be callback(error, success)
    save(callback) {
        //console.log('DEBUG: Banner.save() this=', this);
        
        // Note: We are using this.name (e.g. tickets) instead of null for a new id from Firebase
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'banner',
                                   'banner',
                                   this.toObj())
        .then((id) => {
            //Success
            callback(null, "Banner Saved!");
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get all banner data from our DB
    // callback: Should be callback(error, banner)
    static find(callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   'banner/banner')
        .then((banner) => {
            //Success
            callback(null, banner);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete banner from our DB
    // callback: Should be callback(error, message)
    static remove(callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef, 'banner/banner')
        .then((result) => {
            if (result) {
                //Success
                callback(null, "Banner Removed.");
            } else {
                callback('Error removing banner.');
            }
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = Banner;
