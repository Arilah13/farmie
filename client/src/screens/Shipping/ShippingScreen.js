import React, { useState } from 'react'
import {
    Form,
    Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './../../components/CheckoutSteps/CheckoutSteps'
import FormContainer from '../../components/FormContainer/FormContainer'
import { saveShippingAddress } from './../../redux/actions/cartActions'
import Meta from '../../components/Helmet/Meta'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city }))
        history.push('/payment')
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <FormContainer>
                <Meta
                    title="Farmie | Shipping"
                />
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler} style={{ marginBottom: '40px' }}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>City <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit'>Continue</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ShippingScreen
