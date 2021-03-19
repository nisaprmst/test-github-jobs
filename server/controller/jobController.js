'use strict';
const axios = require('axios');
const e = require('express');
const response = require('../helper/response')

exports.jobList = function(req, res) {
    axios.get('https://jobs.github.com/positions.json')
        .then(rows => {
            response.ok(rows.data, res);
        })
        .catch(err => {
            response.error("Error while getting job list from github", 400, res);
        })
}

exports.jobSearch = function(req, res) {
    axios.get('https://jobs.github.com/positions.json')
        .then(rows => {
            let description = req.query.description;
            let location = req.query.location;
            let fullTime = req.query.fullTime;
            let filtered = rows.data.filter(function(el) {
                if (description) {
                    if (location) {
                        if (fullTime) {
                            return el.description.includes(description) &&
                                    el.location.includes(location) &&
                                    el.fullTime === 'Full Time';
                        }
                        else {
                            return el.description.includes(description) &&
                                    el.location.includes(location);
                        }
                    } else {
                        if (fullTime) {
                            return el.description.includes(description) &&
                                    el.fullTime === 'Full Time';
                        }
                        else {
                            return el.description.includes(description);
                        }
                    }
                } else {
                    if (location) {
                        if (fullTime) {
                            return el.location.includes(location) &&
                                    el.fullTime === 'Full Time';
                        }
                        else {
                            return el.location.includes(location);
                        }
                    } else {
                        if (fullTime) {
                            return el.fullTime === 'Full Time';
                        }
                        else {
                            return el;
                        }
                    }
                }
            })
            response.ok(filtered, res);
        })
        .catch(err => {
            response.error("Error while filtering job list", 400, res);
        })
}

exports.jobDetail = function(req, res) {
    let id = req.params.ID;
    axios.get('https://jobs.github.com/positions/'+ id + '.json')
        .then(rows => {
            response.ok(rows.data, res);
        })
        .catch(err => {
            response.error("Error while getting detail job from github", 400, res);
        })
}