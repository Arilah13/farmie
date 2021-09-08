import React from 'react';
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Col, Button } from 'react-bootstrap'
import './ProductStyles.css'
import Rating from '../Rating/Rating'

const Products = ({ _id, name, rating, image, reviews, price, userid, checked, approved }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    return (
        <Col sm={12} md={6} lg={4}>
            <Card className="my-3 p-3 ">
                <Card.Img className="image card-image mx-auto" src={image} variant="top" />
                <Card.Body>
                    <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
                        <Card.Title className="title">
                            <strong>{name}</strong>
                        </Card.Title>
                    </LinkContainer>
                    <Card.Text>
                        <Rating
                            value={rating}
                            text={`${reviews} reviews`}
                        />
                    </Card.Text>
                    <Card.Text>
                        <h4>RS.{price}</h4>
                    </Card.Text>
                    
                        {
                            userInfo && userInfo._id === userid ? (
                                <>
                                    {
                                        checked === true ? (                                        
                                            approved === true ? (
                                                <Button className="status-approve btn-preview" variant="success">Approved</Button>
                                            ) : (
                                                <Button className="status-disapprove btn-preview" variant="danger">Not Approved</Button>
                                            )   
                                        ) : (
                                            <Button className="status-notcheck btn-preview" variant="danger">Not Checked</Button>
                                        )
                                    }
                                    <LinkContainer to={`/products/${_id}`}>
                                        <Button className="addd-space btn-preview" variant="success">View Product</Button>
                                    </LinkContainer>
                                    <LinkContainer to={`/myproducts/${_id}`}>
                                        <Button className="addd-space btn-preview" variant="success">Edit</Button>
                                    </LinkContainer>
                                </>
                            ) : (
                                <LinkContainer to={`/products/${_id}`}>
                                    <Button className="btn-preview ad-space" variant="success">Preview here</Button>
                                </LinkContainer>
                            )
                        }                                          
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Products
