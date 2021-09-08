import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'
import { listProductsDetails, updateProducts } from '../../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productConstants'
import Meta from '../../components/Helmet/Meta'

const ProductEditScreen = ({ match }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, products, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/myproducts')
        } else {
            if (!products.name || products._id !== productId) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(products.name)
                setDescription(products.description)
                setPrice(products.price)
                setCategory(products.category)
                setCountInStock(products.countInStock)
                setImage(products.image)
            }
        }
    }, [history, products, dispatch, productId, successUpdate])

    
    let file = ('')
    let Image = ('')

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

            Image = res.data.url 
            console.log(name, description, category, price, countInStock, image)
        } catch (err) {
            return (err)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await uploadHandler()
        dispatch(updateProducts({
            _id: productId,
            name,
            Image,
            description,
            category,
            price,
            countInStock
        }))
    }

    return (
        <Container style={{ marginBottom: '50px' }}>
            <Meta
                title="Farmie | Product Edit"
            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Product Edit</h2>
                <Link to='/myproducts' className='btn btn-primary my-3'>
                    GO BACK
                </Link>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated!</Message>}
                {loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message> :
                    <Form onSubmit={submitHandler} >
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.File
                                        id='image'
                                        label='Choose Image'
                                        required
                                        onChange={imageHandler}
                                    ></Form.File>
                                </Form.Group>
                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        type="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="category"
                                        placeholder="Enter price"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="price"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Count in stock</Form.Label>
                                    <Form.Control
                                        type="countInStock"
                                        placeholder="Enter count in stock"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary">Update</Button>
                            </Col>
                        </Row>
                    </Form> 
                }
            </FormContainer>
        </Container>
    )
}

export default ProductEditScreen 
