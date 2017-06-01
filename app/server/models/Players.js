// Model for teams of Players

// Using Firebase
var myFirebase = require('../cloud/firebase');

// Represents a Player
// Class API is modeled after the Google Cloud Datastore API.
class Players {
    constructor() {
        this.id = 0; //Same as DEFAULT_PLAYER_ID
        this.first_name = ''; //Scott
        this.last_name = ''; //Doe
        this.date_of_birth = 0; // 846835200000 = 1-NOV-1996
        this.image = '/player/bg_player_231by264.png';
        this.shirt_number = 0; //4
        this.position = 'Defender';
        this.short_description = ''; //Kit sponsored by Haines Watts
        this.biography = ''; //Some HTML
        this.height = '0 Metres'; //1.85 Metres
        this.weight = '0 Kilograms'; //77 Kilograms
        this.nationality = 'English';
        this.onloan_status = 'No';
        this.status = 'Active';
        this.team = 'First'; // First team, Academy, etc.

        // Make sure we bind 'this' in save for the promise
        //this.save = this.save.bind( this );
    }

    // TODO: Do I really need this helper? Seems so, since I don't want to send the id field.
    toObj() {
        var obj = {
            "first_name": this.first_name,
            "last_name": this.last_name,
            "date_of_birth": this.date_of_birth,
            "image": this.image,
            "shirt_number": this.shirt_number,
            "position": this.position,
            "short_description": this.short_description,
            "biography": this.biography,
            "height": this.height,
            "weight": this.weight,
            "nationality": this.nationality,
            "onloan_status": this.onloan_status,
            "status": this.status,
            "team": this.team
        };
        
        return obj;
    }

    // Save this player data to our DB
    // callback: Should be callback(error, id)
    save(callback) {
        //console.log('DEBUG: Players.save() this=', this);
        
        myFirebase.writeToFirebase(myFirebase.firebaseRef,
                                   'players',
                                   this.id === 0 ? null : this.id,
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

    // Get all players data from our DB
    // callback: Should be callback(error, pages)
    static find(callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   'players')
        .then((players) => {
            //Success

            // This will be the output array we want
            var parsedPlayers = [];

            // id will be the id values we need, which is the object (array index) name in the firebase object.
            // Would be easy with the spread operator...
            Object.keys(players).forEach((id) => {
                var first_name = players[id].first_name;
                var last_name = players[id].last_name;
                var date_of_birth = players[id].date_of_birth;
                var image = players[id].image;
                var shirt_number = players[id].shirt_number;
                var position = players[id].position;
                var short_description = players[id].short_description;
                var biography = players[id].biography;
                var height = players[id].height;
                var weight = players[id].weight;
                var nationality = players[id].nationality;
                var onloan_status = players[id].onloan_status;
                var status = players[id].status;
                var team = players[id].team;
                
                parsedPlayers.push({
                    id, first_name, last_name, date_of_birth, image, shirt_number, position, short_description,
                    biography, height, weight, nationality, onloan_status, status, team
                });
            });

            callback(null, parsedPlayers);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Get a single player from our DB
    // playerId: id of the player to find
    // callback: Should be callback(error, page)
    static findById(playerId, callback) {
        myFirebase.readFromFirebase(myFirebase.firebaseRef,
                                   `players/${playerId}`)
        .then((player) => {
            //Success
            player.id = playerId;
            callback(null, player);
        }, (e) => {
            // Error
            callback(e);
        });
    }

    // Delete a single player from our DB
    // params: contains an _id of the page to find
    // callback: Should be callback(error, page)
    static remove(params, callback) {
        myFirebase.removefromFirebase(myFirebase.firebaseRef,
                                   `players/${params._id}`)
        .then((id) => {
            //Success
            var player = {id: params._id};
            callback(null, player);
        }, (e) => {
            // Error
            callback(e);
        });
    }
}

module.exports = Players;
