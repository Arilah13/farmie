import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import FormContainer from '../FormContainer/FormContainer'
import { register } from '../../redux/actions/userActions'
import Meta from '../Helmet/Meta'

const Register = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerrole, setRegisterrole] = useState('customer')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: LoginInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const redirectAdmin = location.search ? location.search.split('=')[1] : '/admin'
    const redirectStaff = location.search ? location.search.split('=')[1] : '/staff'
    const redirectFarmer = location.search ? location.search.split('=')[1] : '/farmer'

    useEffect(() => {
        if(LoginInfo)
        {
            if (LoginInfo.role === 0) {
                history.push(redirect)
            }
            else if (LoginInfo.role === 1) {
                history.push(redirectFarmer)
            }
            else if (LoginInfo.role === 2) {
                history.push(redirectStaff)
            }
            else if (LoginInfo.role === 3) {
                history.push(redirectAdmin)
            }
        }
    }, [LoginInfo, history, redirect, redirectAdmin, redirectStaff, redirectFarmer])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, registerrole))
        }
    }

    return (

        <FormContainer>
            <Meta
                title="Farmie | Register"
            />
            <h1 style={{ marginTop: '120px' }}>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address / NIC <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="nic"
                                placeholder="Enter email or NIC"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='register'>
                            <Form.Label>Register As<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                as="Select"
                                value={registerrole}
                                required
                                onInput={(e) => setRegisterrole(e.target.value)}
                            >
                                <option value=''>Select...</option>
                                <option value='customer'>Customer</option>
                                <option value='farmer'>Farmer</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='password'>
                            <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm password <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>                                           
                    </Col>
                    <div className="col text-center">
                        <Button style={{alignItems: "center"}} type="submit" variant="primary">Register</Button>
                    </div>
                </Row>
            </Form>
            <Row className='py-3'>
                <Col style={{ marginBottom: '30px' }}>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
