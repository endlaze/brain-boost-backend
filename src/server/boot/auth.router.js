let authController = require('../../controllers/auth.controller')

module.exports = (server) => {
  let root = '/api/auth'
  let router = server.loopback.Router();
  router.post(root + '/login', authController.login)
  router.post(root + '/register', authController.register)
  server.use(router)
}