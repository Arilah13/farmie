const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/').get(productController.getProducts).post(auth, productController.createProduct)

router.route('/myproducts').get(auth, productController.getMyProducts)

router.post('/image', productController.uploadImage)

router.post('/:id/reviews', auth, productController.createProductReview)

router.route('/:id').get(productController.getProductById).delete(auth, productController.deleteProduct).put(auth, productController.updateProduct)

router.get('/admin/products', auth, authAdmin, productController.getAllProducts)

router.get('/admin/pending', auth, authAdmin, productController.getPendingProducts)

router.put('/admin/product/:id', auth, authAdmin, productController.setProducts)

module.exports = router

