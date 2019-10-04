'use strict';

const bcrypt = require('bcrypt');

module.exports = function (AppUser) {

  AppUser.createUser = (req, callback) => {

    let { id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday, user_subroles } = req.body
    password = bcrypt.hashSync(password, 10)

    let ds = AppUser.dataSource
    let sql = 'select create_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
    ds.connector.execute(sql, [id, name, first_last_name, second_last_name, email, address, password, phone_number, user_role, birthday], (err, data) => {

      if (err) {
        return
      }

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
};
