import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
        userDeleteReducer, 
        userDetailsReducer, 
        userListReducer,
        userLoginReducer,
        userRegisterReducer,
        userUpdateProfileReducer,
        userUpdateReducer
         } from './reducers/userReducer'

import {
    productCreateReducer,
    productListReducer,
    productDeleteReducer,
    productDetailsReducer,
    productReviewCreatereducer,
    productUpdatereducer,
    listProductsreducer,
    setProductsreducer
} from './reducers/productReducer'

import {
    cartReducer
} from './reducers/cartReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListReducer,
    orderListMyReducer,
    orderDeliverreducer
} from './reducers/orderReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    productCreate: productCreateReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreatereducer,
    productUpdate: productUpdatereducer,
    listProducts: listProductsreducer,
    setProducts: setProductsreducer,

    cart: cartReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverreducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    },
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store