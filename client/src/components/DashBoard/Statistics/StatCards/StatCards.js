import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { listUsers } from '../../../../redux/actions/userActions'
import { listOrders } from '../../../../redux/actions/orderActions'
import './StatCard.css'

const StatCards = () => {

    const dispatch = useDispatch()
    let history = useHistory()

    const [userCount, setUserCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)

    const userList = useSelector(state => state.userList)
    const { users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList

    useEffect(() => {
        if (userInfo && (userInfo.role === 3 || userInfo.role === 2)) {
            dispatch(listUsers())
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo, history])

    useEffect(() => {
        if (userInfo && (userInfo.role === 3 || userInfo.role === 2)) {
            if(users !== undefined && orders !== undefined )
            {
                const userLen = users.length - 1;
                const orderLen = orders.length;

                setUserCount(userLen)
                setOrderCount(orderLen)
            }
        } else {
            history.push('/login')
        }
    },[userList, orderList])

    return (
        <Row>
            <Card className="card-set-deck" border="primary" style={{ width: '16rem' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <i className="fas card-icon fa-users"></i>
                        </Col>
                        <Col>
                            <Row>
                                <Card.Text>
                                    <span className="card-text-name">All Users</span>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <span className="card-count">{userCount}</span>
                                </Card.Text>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="card-set-deck" border="primary" style={{ width: '16rem' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <i className="fas fa-sort-amount-down-alt"></i>
                        </Col>
                        <Col>
                            <Row>
                                <Card.Text>
                                    <span className="card-text-name">All Orders</span>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <span className="card-count">{orderCount}</span>
                                </Card.Text>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="card-set-deck" border="primary" style={{ width: '16rem' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <i className="fas fa-truck"></i>
                        </Col>
                        <Col>
                            <Row>
                                <Card.Text>
                                    <span className="card-text-name">Delivered</span>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <span className="card-count">{orderCount}
                                    </span>
                                </Card.Text>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default StatCards
