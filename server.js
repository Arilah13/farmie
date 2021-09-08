require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const path = require("path")

const userRoutes = require('./routes/userRouter')
const productRoutes = require('./routes/productRouter')
const orderRoutes = require('./routes/orderRouter')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static(path.join(__dirname, "client", "build")))

connectDB();

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})