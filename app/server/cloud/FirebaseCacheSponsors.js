// Using Firebase
var myFirebase = require('./firebase');
var FirebaseCache = require('./firebaseCache');

class FirebaseCacheSponsors extends FirebaseCache {
    constructor() {
        super('sponsors');

        // this.firebaseData will be an array of sponsor objects
        // [{id:123, name:'BT Sport',...}, {...}, ...]
        this.firebaseData = [];
    }

    parseSnapshot(snapshot) {        
        // Object for an individual sponsor
        var temp = {};
        var newSponsor = snapshot.val();
        temp.id = snapshot.key;
        temp.name = newSponsor.name;
        temp.link = newSponsor.link;
        temp.image = newSponsor.image;
        temp.type = newSponsor.type;

        var newEntry = true;
        for(var i = 0; i < this.firebaseData.length; ++i) {
            if (this.firebaseData[i].id == temp.id) {
                this.firebaseData[i] = temp;
                newEntry = false;
                break;
            }
        }
        if (newEntry)
            this.firebaseData.push(temp);
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
