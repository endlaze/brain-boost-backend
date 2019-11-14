'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  // Create Reminder
  AppUser.create_icap_form = (req, callback) =>
  {
    let {idUser, jsonForm, formType} = req.body
    let ds = AppUser.dataSource;
    let sql = `select create_icap_${formType}($1, $2)`;

    ds.connector.execute(sql, [idUser, jsonForm], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('create_icap_form', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/create', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })


};
