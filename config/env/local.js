'use strict';

module.exports = {
  db: {
    //uri: 'mongodb://localhost/local-dwtc',
    uri: 'mongodb://dwtc:tester123@ds133428.mlab.com:33428/dwtc_poc',
    options: {
      user: '',
      pass: ''
    }
  },
  sessionSecret: process.env.SESSION_SECRET || 'youshouldchangethistosomethingsecret',
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  }
};