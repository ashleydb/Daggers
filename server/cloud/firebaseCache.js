// Using Firebase
var myFirebase = require('./firebase');

// Base class to create Cache classes from
class FirebaseCache {
    constructor(childName) {
        this.ref = myFirebase.firebaseRef.child(childName);

        // BINDING: Keep 'this' scoped to this object in any handlers
        this.childAdded = this.childAdded.bind(this);
        this.childRemoved = this.childRemoved.bind(this);
        this.childChanged = this.childChanged.bind(this);
        this.parseSnapshot = this.parseSnapshot.bind(this);
        this.getData = this.getData.bind(this);

        // Our cached data which will be automatically updated as new data is posted from any source.
        this.firebaseData = {};

        // Retrieve new data as children are added to our database
        this.ref.on("child_added", this.childAdded);

        // Get the data under this ref once a direct child has been removed
        this.ref.on("child_removed", this.childRemoved);

        // Get the data under this ref once a direct child is modified
        this.ref.on("child_changed", this.childChanged);
    }

    // Optionally override these methods to deal with Firebase's listeners for this specific ref
    childAdded(snapshot, prevChildKey) {
        this.parseSnapshot(snapshot);
    }
    childRemoved(snapshot) {
        this.parseSnapshot(snapshot);
    }
    childChanged(snapshot) {
        this.parseSnapshot(snapshot);
    }

    // Most likely want to override this to parse the incoming data
    parseSnapshot(snapshot) {
        this.firebaseData = snapshot.val();
    }

    // Override this to add options for what data is returned from this.firebaseData
    getData(options) {
        return this.firebaseData;
    }
};

module.exports = FirebaseCache;
