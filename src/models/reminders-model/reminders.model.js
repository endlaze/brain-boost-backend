'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  // Create Reminder
  AppUser.createReminder = (req, callback) =>
  {
    let {idUser, active, title, description, reminderTime} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select create_reminder($1, $2, $3, $4, $5)';

    ds.connector.execute(sql, [idUser, active, title, description, reminderTime], (err, data) => {

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
    let {id, idUser, description, active, title, reminderTime} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select edit_reminder($1, $2, $3, $4, $5, $6)';

    ds.connector.execute(sql, [idUser, id, active, title, description, reminderTime], (err, data) => {

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
    let {id, idUser} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select delete_reminder($1, $2)';

    ds.connector.execute(sql, [id, idUser], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('deleteReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/delete', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })

  // Cancel reminder (edit active to false)
  AppUser.cancelReminder = (req, callback) =>
  {
    let {id, idUser} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select cancel_reminder($1, $2)';

    ds.connector.execute(sql, [id, idUser], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('cancelReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/cancel', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })

  // Active reminder (edit active to true)
  AppUser.activeReminder = (req, callback) =>
  {
    let {id, idUser} = req.body
    let ds = AppUser.dataSource;
    let sql = 'select active_reminder($1, $2)';

    ds.connector.execute(sql, [id, idUser], (err, data) => {

    if (err) { return }

  })

  callback(null, 'test')
  }

  AppUser.remoteMethod('activeReminder', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/active', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })

  // Get all the reminders of an specific user
  // AppUser.eachReminder = (req, callback) =>
  // {
  //   let {idUser} = req.body
  //   let ds = AppUser.dataSource;
  //   let sql = 'select each_reminder($1)';
  //   let callbackMsg = {};
  //
  //   ds.connector.execute(sql, [idUser], (err, data) => {
  //
  //   if (err) { return }
  //   else {
  //     callbackMsg = data;
  //   }
  //
  // })
  //
  // callback(callbackMsg)
  // }
  //
  // AppUser.remoteMethod('eachReminder', {
  //   accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
  //   http: { path: '/each', verb: 'get' },
  //   returns: { arg: 'message', type: 'string' },
  // })


};
