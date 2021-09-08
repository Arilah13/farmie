import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OverLay from '../../../components/DashBoard/Map/OverLay'
import Meta from '../../../components/Helmet/Meta'
import SideBarComponents from '../../../components/SideBar/SideBarComponents'

const StaffMapScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Farmie | Staff Map"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <h4>Pending Products</h4>
                    </Col>
                    <Col md={9}>
                        <h4 style={{ marginLeft: "30px" }}>Products Pending List</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <OverLay />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StaffMapScreen
