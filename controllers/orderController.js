const Orders = require('../models/orderModel')

const OrderController= {
    addOrderItems: async (req, res) => {
        try{
            const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

            if(!orderItems) return res.status(400).json({msg: "No Order Items"})

            const order = new Orders({
                orderItems: orderItems,
                user: req.user._id,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice,
            })

            const createdOrder = await order.save()

            res.json(createdOrder)
        } catch(err) {
            return res.status(500).json(req.headers)
        }
    },
    getOrderById: async (req, res) => {
        try{
            const order = await Orders.findById(req.params.id).populate('user', 'name email')

            if (!order) return res.status(400).json({msg: "Order Not Found"})

            res.json(order)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateOrderToPaid: async (req, res) => {
        try{
            const order = await Orders.findById(req.params.id)

            if(!order) return res.status(400).json({msg: "Order Not Found"})

            order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }

            const updatedOrder = await Orders.save()
            
            res.json(updatedOrder)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateOrderToDelivered: async(req, res) => {
        try{
            const order = await Orders.findById(req.params.id)

            if(!order) return res.status(400).json({msg: "Order Not Found"})

            order.isDelivered = true
            order.deliveredAt = Date.now()

            const updatedOrder = await Order.save()

            res.json(updatedOrder)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyOrders: async(req, res) => {
        try{
            const orders = await Orders.find({ user: req.user._id })
            res.json(orders)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getOrders: async(req, res) => {
        try{
            const orders = await Orders.find({}).populate('user', 'id name')
            res.json(orders)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = OrderController