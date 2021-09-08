const mongoose = require('mongoose')

const productReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating : {
        type: String,
        required: true,
    },
    comment : {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: [productReviewSchema],
    rating: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    numReviews: {
        type: Number,
        default: 0
    },
    lat: {
        type: Number,
        default: 0 
    },
    lng: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: false
    },
    checked: {
        type: Boolean,
        default: false
    },
    staffrating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)