import axios from 'axios'
import * as actionTypes from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({
            type: actionTypes.PRODUCT_LIST_REQUEST
        })

        const { data } = await axios.get('/products/')

        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: { products: data }
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.msg
                            ? err.response.data.msg
                            : err.msg
        })
    }
}

export const sortProducts = (Products, Category, Sort) => async (dispatch) => {
    try{
        dispatch({
            type: actionTypes.SORT_PRODUCTS_REQUEST
        })

        const { data } = await axios.get('/products/')

        let final = []

        const sorted =  await Products.sort((item_1, item_2) => (
                        (Sort === 'pricelow') ? ((item_1.price > item_2.price) ? 1 : -1) :
                        (Sort === 'pricehigh') ? ((item_1.price < item_2.price) ? 1 : -1) :
                        (Sort === 'ratinglow') ? ((item_1.rating > item_2.rating) ? 1 : -1) :
                        (Sort === 'ratinghigh') ? ((item_1.rating < item_2.rating) ? 1 : -1) :
                        (Sort === 'quantitylow') ? ((item_1.countInStock > item_2.countInStock) ? 1 : -1 ) :
                        (Sort === 'quantityhigh') ? ((item_1.countInStock < item_2.countInStock) ? 1 : -1 ) :
                        (Sort === 'reviewlow') ? ((item_1.numReviews > item_2.numReviews) ? 1 : -1) :
                        (Sort === 'reviewhigh') ? ((item_1.numReviews < item_2.numReviews) ? 1 : -1 ) :
                                ((item_1._id < item_2._id) ? 1 : -1)
                        ))
        final = sorted

        if(Category !== '')
        {
            const categoried = await sorted.filter(product => product.category.indexOf(Category) >= 0)
            final = categoried
        }

        dispatch({
            type: actionTypes.SORT_PRODUCTS_SUCCESS,
            payload: { filteredproducts: final, products: data }
        })

    } catch (err) {
        dispatch({
            type: actionTypes.SORT_PRODUCTS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listProductsByCategory = (Products, Category, Sort) => async (dispatch) => {
    try{
        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_REQUEST
        })

        const { data } = await axios.get('/products/')

        let final = []

        const categoried = await Products.filter(product => product.category.indexOf(Category) >= 0)
        final = categoried

        if(Sort !== '')
        {
            const sorted =  await categoried.sort((item_1, item_2) => (
                (Sort === 'pricelow') ? ((item_1.price > item_2.price) ? 1 : -1) :
                (Sort === 'pricehigh') ? ((item_1.price < item_2.price) ? 1 : -1) :
                (Sort === 'ratinglow') ? ((item_1.rating > item_2.rating) ? 1 : -1) :
                (Sort === 'ratinghigh') ? ((item_1.rating < item_2.rating) ? 1 : -1) :
                (Sort === 'quantitylow') ? ((item_1.countInStock > item_2.countInStock) ? 1 : -1 ) :
                (Sort === 'quantityhigh') ? ((item_1.countInStock < item_2.countInStock) ? 1 : -1 ) :
                (Sort === 'reviewlow') ? ((item_1.numReviews > item_2.numReviews) ? 1 : -1) :
                (Sort === 'reviewhigh') ? ((item_1.numReviews < item_2.numReviews) ? 1 : -1 ) :
                        ((item_1._id < item_2._id) ? 1 : -1)
                ))
            final = sorted
        }

        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: { filteredproducts: final, products: data }
        })

    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_FAIL,
            payload: err.response.data.msg
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/products/${id}`)

        dispatch({
            type: actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const deleteProducts = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_DELETE_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/products/${id}`, config)

        dispatch({
            type: actionTypes.PRODUCT_DELETE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_DELETE_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const createProducts = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post('/products/', product, config)

        dispatch({
            type: actionTypes.PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_CREATE_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const updateProducts = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        
        const { data } = await axios.put(`/products/${product._id}`, product, config)

        dispatch({
            type: actionTypes.PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_UPDATE_FAIL,
            payload: err.response.data.msg
        })
    }
} 

export const createProductReview = ( productId, review ) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo }, } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`/products/${productId}/reviews`, review, config)

        dispatch({
            type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listMyProducts = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.PRODUCT_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get('/products/myproducts', config)

        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: { products: data }
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const sortMyProducts = ( Products, Category, Sort ) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.SORT_PRODUCTS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get('/products/myproducts', config)

        let final = []

        const sorted =  await Products.sort((item_1, item_2) => (
                        (Sort === 'pricelow') ? ((item_1.price > item_2.price) ? 1 : -1) :
                        (Sort === 'pricehigh') ? ((item_1.price < item_2.price) ? 1 : -1) :
                        (Sort === 'ratinglow') ? ((item_1.rating > item_2.rating) ? 1 : -1) :
                        (Sort === 'ratinghigh') ? ((item_1.rating < item_2.rating) ? 1 : -1) :
                        (Sort === 'quantitylow') ? ((item_1.countInStock > item_2.countInStock) ? 1 : -1 ) :
                        (Sort === 'quantityhigh') ? ((item_1.countInStock < item_2.countInStock) ? 1 : -1 ) :
                        (Sort === 'reviewlow') ? ((item_1.numReviews > item_2.numReviews) ? 1 : -1) :
                        (Sort === 'reviewhigh') ? ((item_1.numReviews < item_2.numReviews) ? 1 : -1 ) :
                                ((item_1._id < item_2._id) ? 1 : -1)
                        ))
        final = sorted

        if(Category !== '')
        {
            const categoried = await sorted.filter(product => product.category.indexOf(Category) >= 0)
            final = categoried
        }

        dispatch({
            type: actionTypes.SORT_PRODUCTS_SUCCESS,
            payload: { filteredproducts: final, products: data }
        })

    } catch (err) {
        dispatch({
            type: actionTypes.SORT_PRODUCTS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listMyProductsByCategory = ( Products, Category, Sort ) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get('/products/myproducts', config)

        let final = []

        const categoried = await Products.filter(product => product.category.indexOf(Category) >= 0)
        final = categoried

        if(Sort !== '')
        {
            const sorted =  await categoried.sort((item_1, item_2) => (
                (Sort === 'pricelow') ? ((item_1.price > item_2.price) ? 1 : -1) :
                (Sort === 'pricehigh') ? ((item_1.price < item_2.price) ? 1 : -1) :
                (Sort === 'ratinglow') ? ((item_1.rating > item_2.rating) ? 1 : -1) :
                (Sort === 'ratinghigh') ? ((item_1.rating < item_2.rating) ? 1 : -1) :
                (Sort === 'quantitylow') ? ((item_1.countInStock > item_2.countInStock) ? 1 : -1 ) :
                (Sort === 'quantityhigh') ? ((item_1.countInStock < item_2.countInStock) ? 1 : -1 ) :
                (Sort === 'reviewlow') ? ((item_1.numReviews > item_2.numReviews) ? 1 : -1) :
                (Sort === 'reviewhigh') ? ((item_1.numReviews < item_2.numReviews) ? 1 : -1 ) :
                        ((item_1._id < item_2._id) ? 1 : -1)
                ))
            final = sorted
        }

        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: { filteredproducts: final, products: data }
        })

    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_PRODUCTS_BY_CATEGORY_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listPendingProducts = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.PRODUCT_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get('/products/admin/pending', config)

        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: { products: data }
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.msg
                            ? err.response.data.msg
                            : err.msg
        })
    }
}

export const setProducts = (setproduct) => async(dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.SET_PRODUCTS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.put(`/products/admin/product/${setproduct.productID}`, setproduct, config)

        dispatch({
            type: actionTypes.SET_PRODUCTS_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: actionTypes.SET_PRODUCTS_FAIL,
            payload: err.response.data.msg
        })
    }
}

export const listAllProducts = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.PRODUCT_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get('/products/admin/products', config)

        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: { products: data }
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.msg
                            ? err.response.data.msg
                            : err.msg
        })
    }
}