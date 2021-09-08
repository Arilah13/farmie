import React from 'react'
import {
    Container,
    Row,
} from 'react-bootstrap'
import './listStyles.css'
import { Scrollbar } from "react-scrollbars-custom";
import ProductList from './ProductList/ProductList'

const ProductListHome = () => {

    return (
        <Scrollbar style={{ width: '100%', height: 450 }}>
            <Container>
                <Row className="list-container">
                    <ProductList />
                </Row>
            </Container>
        </Scrollbar>
    )
}

export default ProductListHome
