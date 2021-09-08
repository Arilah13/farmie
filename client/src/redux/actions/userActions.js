import axios from 'axios'
import * as actionTypes from '../constants/userConstants'

export const Login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post('/users/login', { email, password }, config )

        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: actionTypes.USER_LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const register = ( name, email, password, registerrole ) => async(dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            '/users/register',
            { name, email, password, registerrole },
            config,
        )

        dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS
        })

        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            payload: data
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.USER_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/users/${id}`, config)

        dispatch({
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.USER_DETAILS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put('/users/profile', user, config)

        dispatch({
            type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.USER_UPDATE_PROFILE_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/users/', config)

        dispatch({
            type: actionTypes.USER_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.USER_LIST_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const deleteUsers = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/users/${id}`, config)

        dispatch({
            type: actionTypes.USER_DELETE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: actionTypes.USER_DELETE_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.USER_UPDATE_REQUEST,
        })
        console.log(user)
        const { userLogin: { userInfo }} = getState()
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/users/${user._id}`, user, config)

        dispatch({
            type: actionTypes.USER_UPDATE_SUCCESS
        })

        dispatch({
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.USER_UPDATE_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const useradd = ( name, email, password, registerrole ) => async(dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            '/users/register',
            { name, email, password, registerrole },
            config,
        )

        dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS
        })
        
    } catch (err) {
        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

    dispatch({ type: actionTypes.USER_LOGOUT })

}