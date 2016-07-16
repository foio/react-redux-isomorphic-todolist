'use strict';

var index = require('../../app/controllers/index.server.controller');

module.exports = function (app) {
    app.route('/')
        .get(index.render);
};