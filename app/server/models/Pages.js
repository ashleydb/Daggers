// Model for individual Pages, (e.g. ticket sales)

// Using Firebase
var myFirebase = require('../cloud/firebase');

// Represents a Page
// Class API is modeled after the Google Cloud Datastore API.
class Pages {
    constructor() {
        this.id = 'new'; //Same as DEFAULT_PAGE_ID
        this.name = 'Placeholder';
        this.content = 'Placeholder';
        
        // These are added when calling POST or PUT respectively
        //this.createdAt = 0;
        //this.updatedAt = 0;

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // TODO: Do I really need this helper? Seems so, since I don't want to send the id field.
    toObj() {
        var obj = {
            "name": this.name,
            "content": this.content
        };
        
        if (this.updatedAt) {
            obj.updatedAt = this.updatedAt;
        }
        // TODO: Remove this, since we should always have createdAt?
        if (this.createdAt) {
            obj.createdAt = this.createdAt;
        }
        
        return obj;
    }

    // Save this page data to our DB
    // callback: Should be callback(error, id)
    save(callback) {
        //console.log('DEBUG: Pages.save() this=', this);
        
        // Note: We are using this.name (e.g. tickets) instead of null for a new id from Firebase
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'pages',
                                   this.name, // TODO: Make this canonical? Note it ends up as an update() call to firebase when this value isn't null
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

    // Get all pages data from our DB
    // callback: Should be callback(error, pages)
    static find(callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   'pages')
        .then((pages) => {
            //Success

            // This will be the output array we want
            var parsedPages = [];

            // id will be the id values we need, which is the object (array index) name in the firebase object.
            // Would be easy with the spread operator...
            Object.keys(pages).forEach((id) => {
                
                var name = pages[id].name;
                var content = pages[id].content;
                var createdAt = pages[id].createdAt;
                var updatedAt = pages[id].updatedAt;
                
                parsedPages.push({
                    id, name, content, createdAt, updatedAt
                });
            });

            callback(null, parsedPages);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get a single page from our DB
    // pageId: id of the page to find
    // callback: Should be callback(error, page)
    static findById(pageId, callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   `pages/${pageId}`)
        .then((page) => {
            //Success
            page.id = pageId;
            callback(null, page);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete a single page from our DB
    // params: contains an _id of the page to find
    // callback: Should be callback(error, page)
    static remove(params, callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `pages/${params._id}`)
        .then((id) => {
            //Success
            var page = {id: params._id};
            callback(null, page);
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = Pages;
