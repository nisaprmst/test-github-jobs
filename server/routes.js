'use strict';

module.exports = function(app) {
    const login = require('./controller/loginController')
    const job = require('./controller/jobController')

    app.route('/login')
        .post(login.login);

    app.route('/job/list')
        .get(job.jobList);
    
    app.route('/job/search')
        .get(job.jobSearch);
    
    app.route('/job/details/:ID')
        .get(job.jobDetail);
};