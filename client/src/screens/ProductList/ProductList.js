import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Products from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';

import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listMyProducts, listMyProductsByCategory, sortMyProducts } from '../../redux/actions/productActions'
import Meta from '../../components/Helmet/Meta';
import Filter from '../../components/Filter/Filter';

const ProductListScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, filteredproducts } = productList

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage]  = useState(9)
    const [Sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(listMyProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    let count = products.length
    if( category !== '' || Sort !== '')
    {
        count = filteredproducts.length
    }

    const handleChangeSort = (e) => {
        const sorT = e.target.value
        if(e.target.value === "")
        {
            setSort(sorT)
        }
        else {
            setSort(sorT)
            dispatch(sortMyProducts(products, category, sorT))
        }
    }

    const handleFilterProducts = (e) => {
        const Category = e.target.value
        if(Category === ""){
            setCategory(Category)
        } else {
            setCategory(Category)
            dispatch(listMyProductsByCategory(products ,Category, Sort))
        }
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
                                            return(
                                            <Products
                                                key={item._id}
                                                _id={item._id}
                                                name={item.name}
                                                image={item.image}
                                                rating={item.rating}
                                                reviews={item.numReviews}
                                                price={item.price}
                                                userid={item.user}
                                                approved={item.approved}
                                                checked={item.checked}
                                            />)
                                        }) :
                                        products.slice(indexOfFirstItem, indexOfLastItem).map(item => {
                                            return(
                                            <Products
                                                key={item._id}
                                                _id={item._id}
                                                name={item.name}
                                                image={item.image}
                                                rating={item.rating}
                                                reviews={item.numReviews}
                                                price={item.price}
                                                userid={item.user}
                                                approved={item.approved}
                                                checked={item.checked}
                                            /> )
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

export default ProductListScreen
