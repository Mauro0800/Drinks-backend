const router = require('express').Router();
const { register, login } = require('../controller/authController');
const { profile } = require('../controller/usersController');
const checkToken = require('../middleware/checkToken');

/* GET home page. */
router

  .get('/', function(req, res, next) {
    res.status(200).json({
      ok: true,
      message: "Done!!"
    })
  })

  .post("/api/register", register)
  .post("/api/login", login)

  .get("/api/profile", checkToken, profile)

module.exports = router;
