import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Form,
    Button,
    Row,
    Col,
    Container
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Meta from '../../components/Helmet/Meta'
import { createProducts } from '../../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../redux/constants/productConstants'
import axios from 'axios'
import OverLay from '../../components/Map/OverLay'

const ProductSubmit = ({history}) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState(null)
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading, success, error } = productCreate

    let file = ('')
    let image = ('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
        
    }, [])

    const imageHandler = (e) => {
        file = e.target.files[0]
    }

    const uploadHandler = async (e) => {
        try{
            let formData = new FormData()
            await formData.append('image', file)

            const res = await axios.post('/products/image', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}`}
            })

            image = await res.data.url
        } catch (err) {
            return (err)
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        await uploadHandler()
        dispatch(createProducts({
            name: name,
            price: price,
            countInStock: quantity,
            category: category,
            image: image,
            description: description,
            lat: lat,
            lng: long
        }))
    }

    useEffect(() => {
        if(success) {
            setMessage('Product Added Successfully')
            dispatch({
                type: PRODUCT_CREATE_RESET
            })
            history.push()
        } 
    },[dispatch, history, success])

    return (

        <Container>
            <Meta
                title="Farmie | ProductSubmit"
            />
            <h1 style={{ marginTop: '120px', textAlign: 'center' }}>Submit Product</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message> }
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Row>
                    <Col md={4}>
                        <Form.Group controlId='name'>
                            <Form.Label>Product Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Product Price (Rs.) <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Price"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='quantity'>
                            <Form.Label>Product Quantity<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Quantity"
                                value={quantity}
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Product Category <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                as="Select"
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value=''>Select...</option>
                                <option value='fruits'>Fruits</option>
                                <option value='vegetables'>Vegetables</option>
                                <option value='grains'>Grains</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Product Description<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Enter Product Description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Product Image <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.File
                                id='image'
                                label='Choose Image'
                                required
                                onChange={imageHandler}
                            ></Form.File>
                        </Form.Group>
                    </Col>
                    <Col md={8} style={{marginTop: '3.3rem'}}>
                        <OverLay lat={lat}
                                 lng={long}
                                 />
                    </Col>
                    <Button style={{marginLeft: "30rem", marginBottom: "3rem", marginTop: "2rem"}} type="submit" variant="primary">Submit Product</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default ProductSubmit
