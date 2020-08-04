// Validation layer for API requests. Does the user have permission?

var jwt = require('jwt-simple');
var validateUser = require('../models/Auth').validateUser;

var ValidateAuth = {
    // Check if the user is logged in as an admin
    isAdmin: function(req, res, next) {
        validateAuthentication(true, req, res, next);
    },
    // Check if the user is logged in
    isUser: function(req, res, next) {
        validateAuthentication(false, req, res, next);
    },
    // Non-middleware admin check. Returns true if an admin, false if not or on error
    checkAdmin(req) {
        var token = (req.body && req.body.access_token) ||
                    (req.query && req.query.access_token) ||
                    req.headers['x-access-token'];
        
        if (token) {
            try {
                var decoded = jwt.decode(token, process.env.AUTH_SECRET);
                if (decoded.exp > Date.now()) {
                    // Token not expired. Authorize the user to see if s/he can access our resources
                    var dbUser = validateUser(decoded.username); // The key would be the logged in user's username
                    if (dbUser && dbUser.role == 'admin') {
                        return true;
                    }
                }
            } catch (err) {
                return false;
            }
        }
        return false;
    }
}

// Private Functions

function validateAuthentication(checkAdmin, req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    // TODO: Security risk of this is if someone steals your access token, they can be you. Does HTTPS help?
    
    var token = (req.body && req.body.access_token) ||
                (req.query && req.query.access_token) ||
                req.headers['x-access-token'];
    //console.log("DEBUG: token=", token)
    
    if (token) {
        try {
            var decoded = jwt.decode(token, process.env.AUTH_SECRET);
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }

            // Authorize the user to see if s/he can access our resources
            var dbUser = validateUser(decoded.username); // The key would be the logged in user's username
            if (dbUser) {
                // We have found the user, so they are authenticated. But are they authorized?

                // See if they need to be an admin and if so, check that they are
                if (!checkAdmin || dbUser.role == 'admin') {
                    next(); // To move to next middleware
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                    return;
                }
            } else {
                // No user with this name exists, respond back with a 401
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User"
                });
                return;
            }

        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
            console.log("ERR: 500 error in validateRequest")
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
};

module.exports = ValidateAuth;
