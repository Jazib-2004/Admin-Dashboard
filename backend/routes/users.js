const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const {auth, register, login, getUsers } = require('../controllers/users')


router.get('/auth',validateToken,auth)
router.post('/register',register)
router.post('/login',login)
router.get('/',getUsers)
module.exports = router
