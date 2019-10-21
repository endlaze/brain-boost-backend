'use strict';

const bcrypt = require('bcrypt');
const authController = require('../../controllers/auth.controller');
let jwt = require('jsonwebtoken');

module.exports = function (AppUser) {

  //Create user

  AppUser.createUser = (req, callback) => {

    let { id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday, user_subroles } = req.body
    password = bcrypt.hashSync(password, 10)

    let ds = AppUser.dataSource
    let sql = 'select create_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
    ds.connector.execute(sql, [id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday], (err, data) => {

      if (err) { return }

      let subrolesSQL = "select create_user_subrole($1, $2)"

      user_subroles.forEach(subrole => {
        let { subrole_id } = subrole
        ds.connector.execute(subrolesSQL, [id, subrole_id], (err, data) => { })
      });
    })

    callback(null, 'test')
  }

  AppUser.remoteMethod('createUser', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/create', verb: 'post' },
    returns: { arg: 'message', type: 'string' },
  })

  //Login

  AppUser.auth = (req, callback) => {
    let { username, password, username_type } = req.body

    let ds = AppUser.dataSource
    let queryParam = (username_type === 0) ? 'id' : 'email'

    let sql = `select * from get_login_info_by_${queryParam}($1)`

    ds.connector.execute(sql, [username], (err, data) => {
      let callbackMsg = { status: 0, message: '' }

      if (data && data !== undefined && data.length !== 0) {
        let user = data.pop()

        if (authController.comparePassword(password, user.user_pw)) {
          let resToken = jwt.sign({ user_id: user.user_id, password: password }, 'brain-boost')
          let resUser = { user_id: user.user_id }
          callbackMsg = { status: 200, message: 'Usuario autenticado', token: resToken, user: resUser }
        } else {
          callbackMsg = { status: 401, message: 'Contraseña incorrecta' }
        }

      } else {
        callbackMsg = { status: 404, message: 'El usuario no existe' }
      }

      callback(null, callbackMsg)
    })
  }

  AppUser.remoteMethod('auth', {
    accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
    http: { path: '/auth', verb: 'post' },
    returns: { arg: 'response', type: 'any' },
  })
};
