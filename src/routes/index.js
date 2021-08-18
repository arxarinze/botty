var express = require('express');
var router = express.Router();
const Authorization = require('../core/authorization');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(inception.inceptions)
  console.log(inception.subscriptions)
  console.log(memory.clients)
  res.send('Am I Human?')
});
router.post('/auth/get-key', Authorization.auth)


// not neccessary now untill everyone understands E2EE
// router.post('/register/public-key', function (req, res, next) {
//   let body = req.body
// })

// router.post('/encrypt-message', function (req, res, next) {

// })

module.exports = router;
