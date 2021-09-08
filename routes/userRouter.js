const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.post('/refresh_token', auth, userController.refreshtoken)

router.route('/profile').get(auth, userController.getUserProfile).put(auth, userController.updateUserProfile)

router.route('/:id').get(auth, userController.getUserById).delete(auth, authAdmin, userController.deleteUser).put(auth, authAdmin, userController.updateUser)

router.get('/', auth, authAdmin, userController.getAllUsers)

module.exports = router