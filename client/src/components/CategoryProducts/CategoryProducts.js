import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Col, Button } from 'react-bootstrap';
import './CategoryStyles.css'
import Rating from '../Rating/Rating';

const Products = ({ _id, name, rating, image, reviews, price }) => {
    return (
        <Col sm={12} md={6} lg={3} style={{marginLeft: "3rem", marginRight: "3rem"}}>
            <Card className="my-3 p-3 ">
                <Card.Img className="image card-image mx-auto" src={image} variant="top" />
                <Card.Body>
                    <LinkContainer to={`/products/${_id}`}>
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
                    
                    <LinkContainer to={`/products/${_id}`}>
                        <Button className="ad-space btn-preview" varient="success">Preview here</Button>
                    </LinkContainer>
                                      
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Products
