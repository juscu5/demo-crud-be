const userController = require('../controllers/userController.js')

const router = require('express').Router()

router.get('/getUser', userController.getUser)
router.post('/addUser', userController.addUser)
router.put('/editUser/:id', userController.editUser)
router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router