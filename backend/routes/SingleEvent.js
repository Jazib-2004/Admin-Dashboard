const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const {createSingleEvent,allSingleEvents, updateSingleEvent, deleteSingleEvent} = require('../controllers/singleEventController')
const singleUpload = require('../middlewares/multer')


router.post('/createSingleEvent',validateToken,singleUpload,createSingleEvent)
router.get('/allSingleEvents',validateToken,allSingleEvents)
router.put('/updateSingleEvent/:id',validateToken,singleUpload,updateSingleEvent)
router.delete('/deleteSingleEvent/:id',validateToken,deleteSingleEvent)

module.exports = router