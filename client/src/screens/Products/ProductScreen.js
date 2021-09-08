import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Products from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import './ProductStyles.css'

import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listProducts, listProductsByCategory, sortProducts } from '../../redux/actions/productActions'
import Meta from '../../components/Helmet/Meta';
import Filter from '../../components/Filter/Filter';

const Farmer_ProductSeedScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, filteredproducts } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage]  = useState(9)
    const [Sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(listProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    let count
    
    if(userInfo)
    {
        count = products.filter((item) => item.user !== userInfo._id).length
        if( category !== '' || Sort !== '')
        {
            count = filteredproducts.filter((item) => item.user !== userInfo._id).length
        }
    }
    else{
        count = products.length
        if( category !== '' || Sort !== '')
        {
            count = filteredproducts.length
        }
    }

    const handleChangeSort = (e) => {
        const sorT = e.target.value
        setSort(sorT)
        dispatch(sortProducts(products, category, sorT))
    }

    const handleFilterProducts = (e) => {
        const Category = e.target.value
        setCategory(Category)
        dispatch(listProductsByCategory(products ,Category, Sort))
    }

    return (

        <div className="ProductSeedScreen">
            <Meta
                title="Farmie | Products"
            />
            <Container>
                <h1 className="p-3" style={{ textAlign: 'center' }}>Products</h1>
                <Filter 
                    category={category} 
                    Sort={Sort} 
                    handleChangeSort={handleChangeSort}
                    count={count}
                    handleFilterProducts={handleFilterProducts}
                        />
                {
                    loading
                        ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            :
                            (<Row>
                                {
                                    (category !== '' || Sort !== '' ) ?
                                        filteredproducts.slice(indexOfFirstItem, indexOfLastItem).map(item => {
                                            return (!userInfo) || (userInfo && userInfo._id !== item.user) ?
                                            <Products
                                                key={item._id}
                                                _id={item._id}
                                                name={item.name}
                                                image={item.image}
                                                rating={item.rating}
                                                reviews={item.numReviews}
                                                price={item.price}
                                                userid={item.user}
                                            /> : ''
                                        }) :
                                        products.slice(indexOfFirstItem, indexOfLastItem).map(item => {
                                            return (!userInfo) || (userInfo && userInfo._id !== item.user) ?
                                            <Products
                                                key={item._id}
                                                _id={item._id}
                                                name={item.name}
                                                image={item.image}
                                                rating={item.rating}
                                                reviews={item.numReviews}
                                                price={item.price}
                                                userid={item.user}
                                            /> : ''
                                        })
                                }                                 
                               
                            </Row>)
                } 
                <Row className="justify-content-md-center "> 
                    <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={count} 
                        paginate={paginate}
                    />
                </Row>
            </Container>
        </div>
    )
}

export default Farmer_ProductSeedScreen
