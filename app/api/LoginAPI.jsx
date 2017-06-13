// API to login to our server and manage an access token for future requests

var Axios = require('axios');

/*
// EXAMPLE: User object you will get back from a successful login
  {
    token: token,               // For use in API requests
    expires: expires,           // When the token will expire, meaning the user needs to login again
    user: {
        name: name,             // Display name for the user
        role: 'admin',          // Type of user this is, for various privileges
        username: name          // Name the user types to login with
    };
  };
*/

export function login(username, password) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            try {
                Axios.post('/auth', {
                    username,
                    password
                })
                .then(function (response) {
                    //console.log("DEBUG: LoginAPI.login() res=", response);
                    resolve(response.data);
                })
                .catch(function (error) {
                    // TODO: Show error message on UI
                    console.log("ERROR: LoginAPI.login() error=", error.response.data);
                    reject(error.response.data);
                });
            } catch(e) {
                // try failed
                console.log("ERR: LoginAPI.login() failed:", e);
                reject(e);
            }
        }        
    );  
};
