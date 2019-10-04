let personalDataController = require('../../controllers/personalData.controller')

module.exports = (server) => {
  let root = '/api/personalData'
  let router = server.loopback.Router();
  router.post(root, personalDataController.findById)
  server.use(router)
}