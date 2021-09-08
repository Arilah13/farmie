import * as actionTypes from '../constants/productConstants'

export const productListReducer = (state = { products: [], filteredproducts: [] }, action) => {
    switch(action.type) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true, ...state }
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, filteredproducts: [] }
        case actionTypes.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.FILTER_PRODUCTS_BY_CATEGORY_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FILTER_PRODUCTS_BY_CATEGORY_SUCCESS:
            return { loading: false, filteredproducts: action.payload.filteredproducts, products: action.payload.products }
        case actionTypes.FILTER_PRODUCTS_BY_CATEGORY_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.SORT_PRODUCTS_REQUEST:
            return { ...state, loading: true }
        case actionTypes.SORT_PRODUCTS_SUCCESS:
            return { loading: false, filteredproducts: action.payload.filteredproducts, products: action.payload.products }
        case actionTypes.SORT_PRODUCTS_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state
    }
}

export const productDetailsReducer = (state = { products: { reviews: [] } }, action) => {
    switch(action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, products: action.payload }
        case actionTypes.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case actionTypes.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const productCreateReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case actionTypes.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case actionTypes.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PRODUCT_CREATE_RESET:
            return { product: [] }
        default: 
            return state
    }
}

export const productUpdatereducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case actionTypes.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case actionTypes.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const productReviewCreatereducer = (state = { product: { review: [] } }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const listProductsreducer = (state = { products: [] }, action) => {
    switch (action.types) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true }
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case actionTypes.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const setProductsreducer = (state = {}, action) => {
    switch (action.types) {
        case actionTypes.SET_PRODUCTS_REQUEST:
            return { loading: true }
        case actionTypes.SET_PRODUCTS_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.SET_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}