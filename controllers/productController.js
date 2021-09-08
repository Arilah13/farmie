const Products = require('../models/productModel')
const cloudinary = require('cloudinary')
const fs = require('fs')

const productController = {
    getProducts: async(req, res) => {
        try {
            const products = await Products.find({approved: "true"})
            res.json(products)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductById: async(req, res) => {
        try {
            const product = await Products.findById(req.params.id);

            if(!product) return res.status(400).json({msg: "Product does not exist"})
            res.json(product)

        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) => {
        try {
            const product = await Products.findById(req.params.id);

            if(!product) return res.status(400).json({msg: "Product does not exist"})

            product.remove()
            res.json({msg: "Product removed"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) => {
        try {
            const { name, price, image, description, category, countInStock, lat, lng } = req.body

            const product  = new Products({
                name: name,
                user: req.user._id,
                image: image,
                description: description,
                category: category,
                price: price,
                countInStock: countInStock,
                lat: lat,
                lng: lng
            })

            const createdProduct = await product.save()
            res.json(createdProduct)

        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async (req, res) => {
        try{
            const { name, price, Image, description, category, countInStock } = req.body

            const updateProduct = await Products.findById(req.params.id)

            if(!updateProduct) return res.status(400).json({msg: "Product does not exist"})

            updateProduct.name = name
            updateProduct.price = price
            updateProduct.image = Image
            updateProduct.description = description
            updateProduct.category = category
            updateProduct.countInStock = countInStock

            const updatedProduct = await updateProduct.save()
            res.json(updatedProduct)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProductReview: async (req, res) => {
        try{
            const { rating , comment } = req.body

            const product = await Products.findById(req.params.id)

            if(!product) return res.status(400).json({msg: "Product does not exist"})
            const isReviewexist = product.reviews.find(
                review => review.user.toString() === req.user._id.toString())
            if(isReviewexist) {
                return res.status(400).json({msg: "Product is reviewed already"})
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment: comment,
                user: req.user._id
            }

            product.reviews.push(review)

            product.numReviews = product.reviews.length

            product.rating = await product.reviews.reduce((total, item) => total + item.rating, 0) / product.reviews.length

            await product.save()

            res.json({ msg: "Review Added"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    uploadImage: async(req, res) => {
        try{
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET
            })

            const { image } = req.files

            cloudinary.v2.uploader.upload(image.tempFilePath, {folder: "agrocare"}, (err, result) =>{
                if(err) throw err;

                removeTmp(image.tempFilePath)

                res.json({public_id: result.public_id, url: result.secure_url})
            })

            const removeTmp = (path) => {
                fs.unlink(path, err=>{
                    if(err) throw err;
                })
            }

        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyProducts: async (req, res) => {
        try {
            const products = await Products.find({user: req.user._id})
            res.json(products)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPendingProducts: async (req, res) => {
        try {
            const products = await Products.find({checked: 'false'})
            res.json(products)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    setProducts: async (req, res) => {
        try {
            const { staffrating, approved } = req.body

            const updateProduct = await Products.findById(req.params.id)
            if(!updateProduct) return res.status(400).json({msg: "Product does not exist"})

            updateProduct.staffrating = staffrating
            updateProduct.approved = approved
            updateProduct.checked = 'true'

            const updatedProduct = await updateProduct.save()
            res.json(updatedProduct)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllProducts: async(req, res) => {
        try {
            const products = await Products.find({})
            res.json(products)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = productController