var jwt = require('jwt-simple');

var Auth = {

    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = Auth.validate(username, password);

        if (!dbUserObj) { // If authentication fails, we send a 401 back
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        if (dbUserObj) {

            // If authentication is success, we will generate a token
            // and dispatch it to the client

            res.json(genToken(dbUserObj));
        }

    },

    validate: function(username, password) {
        // TODO: Only spoofing the DB response for simplicity. Using env vars for a single user.
        if (username != process.env.AUTH_USERNAME || password != process.env.AUTH_PASSWORD)
            return null;
        
        var dbUserObj = { // spoofing a userobject from the DB. 
            name: 'Daggers Admin',
            role: 'admin',
            username: process.env.AUTH_USERNAME
        };

        return dbUserObj;
    },

    validateUser: function(username) {
        // TODO: Only spoofing the DB response for simplicity. Using an env var for a single user.
        if (username != process.env.AUTH_USERNAME)
            return null;

        var dbUserObj = { // spoofing a userobject from the DB. 
            name: 'Daggers Admin',
            role: 'admin',
            username: process.env.AUTH_USERNAME
        };

        return dbUserObj;
    }
}

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires,
        username: user.username
    }, process.env.AUTH_SECRET);

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = Auth;
