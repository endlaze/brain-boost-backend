'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  // Create Reminder
  AppUser.createReminder = (req, callback) =>
  {
    let {id, name, description, active, all_day, days, start_date, en_date, last_modification} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select create_reminder($1, $2, $3, $4, $5, $6, $7, $8, $9)';

    ds.connector.execute(sql, [id, name, description, active, all_day, days, start_date, en_date, last_modification], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('createReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/create', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })



  // Edit Reminder
  AppUser.editReminder = (req, callback) =>
  {
    let {id, id_reminder, name, description, active, all_day, days, start_date, en_date, last_modification} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select edit_reminder($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

    ds.connector.execute(sql, [id, id_reminder, name, description, active, all_day, days, start_date, en_date, last_modification], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('editReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/edit', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })


  // Delete reminder
  AppUser.deleteReminder = (req, callback) =>
  {
    let {id, id_reminder} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select delete_reminder($1, $2)';

    ds.connector.execute(sql, [id, id_reminder], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('deleteReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/delete', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })


};
