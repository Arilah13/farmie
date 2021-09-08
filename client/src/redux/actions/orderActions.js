import axios from 'axios'
import * as actionTypes from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo }} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post('/orders/', order, config)

        dispatch({
            type: actionTypes.ORDER_CREATE_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_CREATE_FAIL,
            payload: err.response.data.msg 
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/orders/${id}`, config)

        dispatch({
            type: actionTypes.ORDER_DETAILS_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_DETAILS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_DELIVER_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: actionTypes.ORDER_DELIVER_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_DELIVER_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const payOrder = ( orderId, paymentResult ) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        
        const { data } = await axios.put(`/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: actionTypes.ORDER_PAY_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_PAY_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/orders/myorders`, config)

        dispatch({
            type: actionTypes.ORDER_LIST_MY_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_LIST_MY_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        
        const { data } = await axios.get(`/orders`, config)

        dispatch({
            type: actionTypes.ORDER_LIST_SAVE,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ORDER_LIST_FAIL,
            payload: err.response.data.msg
        })
    }
}