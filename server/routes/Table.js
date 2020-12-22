var express = require('express');
var router = express.Router();

// Note the Table model has a built in cache since it relies on a third party data source
var Table = require('../models/Table');
var _Table = new Table();

// Routes that end in /table
// ----------------------------------------------------
router.route('/v1/table')

    // get the table (accessed at GET http://localhost:8080/api/v1/table)
    // No authentication required.
    .get(function(req, res) {
        _Table.fetch(function(err, table) {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(table);
            }
        });
    });

module.exports = router;
