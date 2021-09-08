const router = require('express').Router()
const orderController = require('../controllers/orderController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/').post(auth, orderController.addOrderItems).get(auth, authAdmin, orderController.getOrders)
router.route('/myorders').get(auth, orderController.getMyOrders)
router.route('/:id').get(auth, orderController.getOrderById)
router.route('/:id/pay').put(auth, orderController.updateOrderToPaid)
router.route('/:id/deliver').put(auth, authAdmin, orderController.updateOrderToDelivered)

module.exports = router
