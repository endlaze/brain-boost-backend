let contactController = require('../../controllers/contact.controller')

module.exports = (server) => {
  let root = '/contact'
  let router = server.loopback.Router();
  router.post(root + '/question', contactController.sendQuestion)
  server.use(router)
}