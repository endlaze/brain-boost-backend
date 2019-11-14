'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  // Create icap json
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

    // Get icap json
    AppUser.get_icap_form = (req, callback) =>
    {
      let {idUser, formType} = req.body
      let ds = AppUser.dataSource;
      let sql = `select get_icap_${formType}($1)`;
  
      ds.connector.execute(sql, [idUser], (err, data) => {
  
      if (err) { return }
      else
      {
        callback(null, data[0][`get_icap_${formType}`])
      }
  
    })
  
    // callback(null, 'test')
    }
  
    AppUser.remoteMethod('get_icap_form', {
      accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
      http: { path: '/get', verb: 'get' },
      returns: { arg: 'response', type: 'string' },
    })
  


};
