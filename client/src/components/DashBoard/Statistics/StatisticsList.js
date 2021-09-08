import React, { useEffect } from 'react'
import {
    Col,
    Container,
    Row,
} from 'react-bootstrap'
import './listStyles.css'
import { Scrollbar } from "react-scrollbars-custom"
import StatCards from './StatCards/StatCards'
import Bar from './BarChart/Bar'
import LineChart from './LineChart/LineChart'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { listUsers } from '../../../redux/actions/userActions'
import moment from 'moment'

const StatisticsList = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && (userInfo.role === 3 || userInfo.role ===2)) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <Scrollbar style={{ width: '100%', height: 500 }}>
            <Container>
                <Row className="list-container">
                    <StatCards />
                </Row>
                <Row>
                    <Bar />
                </Row>
                <Row style={{ marginBottom: "50px"}}>
                    <Col md={6}>
                        <LineChart />
                    </Col>
                </Row>
            </Container>
        </Scrollbar>
    )
}

export default StatisticsList
