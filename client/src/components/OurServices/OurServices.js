import React from 'react'
import {
    Col,
    Container,
    Row,
    Image
} from 'react-bootstrap'
import './ourSerices.css'

const OurServices = () => {
    return (
        <Container className="main" fluid>
            <h1 className="main-title">COMPREHENSIVE SERVICES</h1>
            <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nunc non arcu aliquet sollicitudin. Sed elementum placerat ex. Donec a lectus vel lectus faucibus mattis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nunc non arcu aliquet sollicitudin. Sed elementum placerat ex. Donec a lectus vel lectus faucibus mattis
            </p>
            <Container className="services">
                <Row>
                    <Col md={3}>
                        <h5 className="sub-title">Fruit &amp; Vegetable</h5>
                        <Image className="img" src="https://res.cloudinary.com/rilah/image/upload/v1631075431/agrocare/14_bcydyw.jpg" fluid />
                        <p className="sub-desc">Intiam eu sagittis est, aster cosmo lacini libero. Praesent dignissim sed odio velo aliquam manta legolas. </p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Meat &amp; Eggs</h5>
                        <Image className="img" src="https://res.cloudinary.com/rilah/image/upload/v1631075434/agrocare/9_h6h8i4.jpg" fluid />
                        <p className="sub-desc">Intiam eu sagittis est, aster cosmo lacini libero. Praesent dignissim sed odio velo aliquam manta legolas. </p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Milk &amp; Cheese</h5>
                        <Image className="img" src="https://res.cloudinary.com/rilah/image/upload/v1631075434/agrocare/istockphoto-1297005217-170667a_twd2qo.jpg" fluid />
                        <p className="sub-desc">Intiam eu sagittis est, aster cosmo lacini libero. Praesent dignissim sed odio velo aliquam manta legolas. </p>
                    </Col>
                    <Col md={3}>
                        <h5 className="sub-title">Rice &amp; Corn</h5>
                        <Image className="img" src="https://res.cloudinary.com/rilah/image/upload/v1631075432/agrocare/corn_farm_fishhawk_via_Flickr_jay9hj.jpg" fluid />
                        <p className="sub-desc">Intiam eu sagittis est, aster cosmo lacini libero. Praesent dignissim sed odio velo aliquam manta legolas. </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default OurServices
