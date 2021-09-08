import React, { useEffect, useState } from 'react'
import {
    Table,
    Button,
    Row,
    Col,
    Container,
    Modal,
    Form
} from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../Message/Message'
import Loader from '../../../Loader/Loader'
import { listAllProducts, deleteProducts } from '../../../../redux/actions/productActions'
import OverLay from '../Map/OverLay'

const ProductList = () => {

    const dispatch = useDispatch()
    let history = useHistory()

    const [edit, setEdit] = useState(false)
    const [rating, setRating] = useState('')
    const [id, setId] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [approved, setApproved] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')

    const editShow = () => setEdit(true)

    const productList = useSelector(state => state.productList)
    const { loading: loadingProduct, error: errorProduct, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success: successProductDelete, loading: loadingDelete, error: errorDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo.role !== 3 && !userInfo) {
            history.push('/login')
        } else {
            dispatch(listAllProducts())
        }
    }, [dispatch, history, userInfo, successProductDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProducts(id))
        }
    }

    const editHandler = async (Rating, Id, Lat, Lng, Approved, Image, Name) => {
        await setRating(Rating)
        await setId(Id)
        await setLat(Lat)
        await setLng(Lng)
        await setApproved(Approved)
        await setImage(Image)
        await setName(Name)
        editShow()
    }

    const CloseHandler = () => {
        setEdit(false)
        dispatch(listAllProducts())
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 style={{ marginBottom: '20px' }}>Products</h1>
                    </Col>
                </Row>
                { loadingDelete && <Loader />}
                { errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {loadingProduct ? <Loader />
                    : errorProduct ? <Message variant='danger'>{errorProduct}</Message>
                        : (
                            <Table style={{ marginBottom: '50px' }} striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr style={{textAlign: 'center'}}>
                                        <td>ID</td>
                                        <td>NAME</td>
                                        <td>CATEGORY</td>
                                        <td>PRICE (Rs.)</td>
                                        <td>EDIT / DELETE</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr style={{textAlign: 'center'}} key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <Button variant="light" className="btn btn-sm" onClick={() => editHandler(product.staffrating, product._id, product.lat, product.lng, product.approved, product.image, product.name)}>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        className="btn-sm mr-2"
                                                        onClick={() => deleteHandler(product._id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                }
            </Container>
            <Modal show={edit} onHide={CloseHandler}>
                <Modal.Header closeButton>
                <Modal.Title>User Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <OverLay 
                                    rating={rating}
                                    id={id}
                                    lat={lat}
                                    lng={lng}
                                    approved={approved}
                                    image={image}
                                    name={name}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductList
