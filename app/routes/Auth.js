var express = require('express');
var router = express.Router();

// TODO: Currently these aren't just models, but APIs which obfuscate the DB being used
// MODELS: Our data format
var Auth = require('../models/Auth');

// Routes that end in /login
// ----------------------------------------------------
router.route('/auth')

    // login to an account (accessed at POST http://localhost:8080/api/v1/auth)
    .post(Auth.login);

module.exports = router;
