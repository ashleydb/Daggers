// Using Firebase
//var myFirebase = require('./firebase');
var FirebaseCache = require('./firebaseCache');

class FirebaseCacheSponsors extends FirebaseCache {
    constructor() {
        super('sponsors');

        // this.firebaseData will be an array of sponsor objects
        // [{id:123, name:'BT Sport',...}, {...}, ...]
        this.firebaseData = [];
    }

    parseSnapshot(snapshot) {        
        var id = snapshot.key; // should be 'snapshot'
        // Always clear out so we don't have duplicate/old data
        this.firebaseData = [];
        
        snapshot.forEach(function(sponsorSnapshot) {
            var newSponsor = sponsorSnapshot.val();

            // Object for an individual sponsor
            var temp = {};
            temp.id = sponsorSnapshot.key; // should be '-kweroingslsDFG' or similar
            temp.name = newSponsor.name;
            temp.link = newSponsor.link;
            temp.image = newSponsor.image;
            temp.type = newSponsor.type;

            this.firebaseData.push(temp);
        }.bind(this));
    }

    // Gets data from our firebase cache.
    // You can ask for:
    //  options.id to get a specific story
    //  no options (pass in {}) to get all data
    // Returns an array, (maybe containing just one object if searching by ID)
    getData(options) {
        var {id} = options;
        var returnData = null;

        if (id) {
            for(var i = 0; i < this.firebaseData.length; ++i) {
                if (this.firebaseData[i].id == id) {
                    returnData = [];
                    returnData.push(this.firebaseData[i]);
                    break;
                }
            }
        } else {
            returnData = this.firebaseData;
        }

        return returnData;
    }
}

module.exports = FirebaseCacheSponsors;
