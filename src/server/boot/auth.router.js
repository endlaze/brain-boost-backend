let authController = require('../../controllers/auth.controller')
let cors = require('cors')


module.exports = (server) => {
  let root = '/api/auth'
  let router = server.loopback.Router();
  router.options('/', cors())
  router.post(root + '/login',cors(), authController.login)
  router.post(root + '/register',cors(), authController.register)
  server.use(router)
}