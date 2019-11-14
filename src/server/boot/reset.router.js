let ResetPasswordController = require('../../controllers/ResetPasswordController')
let cors = require('cors')

module.exports = (server) => {
  let root = '/api/app_user'
  let router = server.loopback.Router();
  router.options('/', cors())
  router.post(root + '/send_html', cors(), ResetPasswordController.sendHtml)
  server.use(router)
}