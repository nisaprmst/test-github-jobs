'use strict';

const response = require('../helper/response')
exports.login = function(req, res) {
    if (req.body.username === "username" && req.body.password === "password") {
        response.ok("Login successful", res);
    } else {
        response.error("Invalid credentials", 401, res);
    }
}