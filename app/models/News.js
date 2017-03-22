// Model for News Articles

/*
// Using Google DataStore
var gstore = require('gstore-node');
var Schema = gstore.Schema;

var newsSchema = new Schema({
    id: {type: 'number'},
    headline: {type: 'string'},
    image: {type: 'string'},
    summary: {type: 'string'},
    story: {type: 'string'}
});

// create the model for news and expose it to our app
module.exports = gstore.model('News', newsSchema);
*/

// Using Firebase
//import firebase, {firebaseRef} from '../cloud/firebase'

var myFirebase = require('../cloud/firebase');
//   myFirebase.writeToFirebase, getFirebaseRef, firebaseRef

// Represents a News story.
// Class API is modeled after the Google Cloud Datastore API.
class News {
//    constructor(_id, _headline, _image, _summary, _story) {
//        var id = _id || 'new'; //Same as DEFAULT_STORY_ID
//        var headline = _headline || 'Placeholder';
//        var image = _image || '/images/news-thumbnail.jpg';
//        var summary = _summary || 'Placeholder';
//        var story = _story || 'Placeholder';
//
//        // Make sure we bind 'this' in save for the promise
//        //this.save = this.save.bind( this );
//    }
    
    constructor() {
        this.id = 'new'; //Same as DEFAULT_STORY_ID
        this.headline = 'Placeholder';
        this.image = '/images/news-thumbnail.jpg';
        this.summary = 'Placeholder';
        this.story = 'Placeholder';
        
        // These are added when calling POST or PUT respectively
        //this.createdAt = 0;
        //this.updatedAt = 0;
        
        // These are optional components of a story
        //this.youtube = null;

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // TODO: Do I really need this helper?
    toObj() {
        var obj = {
            "headline": this.headline,
            "image": this.image,
            "summary": this.summary,
            "story": this.story
        };
        
        if (this.updatedAt) {
            obj.updatedAt = this.updatedAt;
        }
        // TODO: Remove this, since we should always have createdAt
        if (this.createdAt) {
            obj.createdAt = this.createdAt;
        }
        if (this.youtube) {
            obj.youtube = this.youtube;
        }
        
        return obj;
    }

    // Save this news data to our DB
    // callback: Should be callback(error, id)
    save(callback) {
        console.log('DEBUG: News.save() this=', this);
        
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'news',
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

    // Get all news data from our DB
    // callback: Should be callback(error, news)
    static find(callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   'news')
        .then((news) => {
            //Success

            // This will be the output array we want
            var parsedNews = [];

            // id will be the id values we need, which is the object (array index) name in the firebase object.
            // Would be easy with the spread operator...
            Object.keys(news).forEach((id) => {
                
                var headline = news[id].headline;
                var summary = news[id].summary;
                var story = news[id].story;
                var image = news[id].image;
                var createdAt = news[id].createdAt;
                var updatedAt = news[id].updatedAt;
                var youtube = news[id].youtube;
                
                parsedNews.push({
                    id, headline, summary, story, image, createdAt, updatedAt, youtube
                });
            });

            callback(null, parsedNews);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get a single news story from our DB
    // newsId: id of the news story to find
    // callback: Should be callback(error, news)
    static findById(newsId, callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   `news/${newsId}`)
        .then((news) => {
            //Success
            news.id = newsId;
            callback(null, news);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete a single news story from our DB
    // params: contains an _id of the news story to find
    // callback: Should be callback(error, news)
    static remove(params, callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `news/${params._id}`)
        .then((id) => {
            //Success
            var news = {id: params._id};
            callback(null, news);
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = News;
