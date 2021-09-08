import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../../components/Helmet/Meta'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listMyOrders } from '../../redux/actions/orderActions'
import './OrderList.css'

const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading, error, orders } = orderListMy

    useEffect(() => {
        if (userInfo ) {
            dispatch(listMyOrders())
        }
    }, [dispatch, userInfo, history])

    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Farmie | My Orders"
            />
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <h4 style={{textAlign: "center"}}>My Orders</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div style={{ marginTop: '20px' }}>
                            <Container>
                                {loading ? <Loader />
                                    : error ? <Message variant='danger'>{error}</Message>
                                        : (
                                            <Table style={{ marginBottom: '223px' }} striped bordered hover responsive className='table-sm'>
                                                <thead>
                                                    <tr align="center">
                                                        <td>ID</td>
                                                        <td>DATE</td>
                                                        <td>TOTAL PRICE</td>
                                                        <td>DELIVERED</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    </tr>
                                                </thead>
                                                <tbody>                                              
                                                    {
                                                        orders !== [] ? (
                                                            orders.map(order => (
                                                                <tr align="center" key={order._id}>
                                                                    <td>{order._id}</td>
                                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                                    <td>{order.totalPrice}</td>                                                
                                                                    <td>
                                                                        {order.isDelivered ? (
                                                                            order.paidAt.substring(0, 10)
                                                                        ) : (
                                                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                                            )}
                                                                    </td>
                                                                    <td>
                                                                        <LinkContainer to={`/order/${order._id}/detail`}>
                                                                            <Button varinat='light' className='btn-sm'>
                                                                                Details
                                                                            </Button>
                                                                        </LinkContainer>
                                                                        {order.isDelivered ? ( '' ) 
                                                                        : (
                                                                            <LinkContainer to={`/order/${order._id}/edit`}>
                                                                                <Button variant='danger' className='btn-sm add-space'>
                                                                                    Cancel
                                                                                </Button>
                                                                            </LinkContainer>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : ( <td align="center" colSpan="5">No Order Available</td> )
                                                    }
                                                </tbody>
                                            </Table>
                                        )
                                }
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderListScreen
