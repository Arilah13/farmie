import React, { useEffect, useState } from 'react'
import {
    Table,
    Button,
    Container,
    Modal,
    Form,
    Row,
    Col
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../..//../components/Message/Message'
import Loader from '../../../components/Loader/Loader'
import { listUsers, deleteUsers, updateUser, useradd } from './../../../redux/actions/userActions'
import { useHistory } from 'react-router'

const UserList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerrole, setRegisterrole] = useState('staff')
    const [edit, setEdit] = useState(false)
    const [_id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [errmess, setErrmess] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const editClose = () => setEdit(false)
    const editShow = () => setEdit(true)

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const userUpdte = useSelector(state => state.userUpdate)
    const { loading: loadingupdate, success } = userUpdte

    const userRegister = useSelector(state => state.userRegister)
    const { success: successRegister } = userRegister

    useEffect(() => {
        if (userInfo && (userInfo.role === 3 || userInfo.role === 2)) {
            dispatch(listUsers())
            setMessage('')
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo, success, successRegister])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUsers(id))
        }
    }

    const editHandler = async (Name, Id, Email, Role) => {
        await setName(Name)
        await setEmail(Email)
        await setRegisterrole(Role)
        await setId(Id)
        editShow()
    }

    const editSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            name,
            _id,
            email,
            registerrole
        }))
        editClose()
        setMessage('Product Updated successfully')
        setName('')
        setEmail('')
        setRegisterrole('')
        setId('')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrmess('Passwords do not match')
        } else {
            dispatch(useradd(name, email, password, registerrole))
            handleClose()
            setMessage('User added successfully')
            setName('')
            setEmail('')
            setPassword('')
            setRegisterrole('')
            setConfirmPassword('')
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1 style={{ marginBottom: '20px' }}>Users</h1>               
                </Col>          
                <Col>
                    <Button className="my-3 float-right" onClick={handleShow}>
                        <i className='fas fa-plus'></i>ADD USERS
                    </Button>
                </Col>
            </Row>
            <Container>
                {message && <Message variant='success'>{message}</Message> }
                {errmess && <Message variant='danger'>{errmess}</Message> }
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message> 
                            : loadingupdate ? <Loader />
                        : (
                            <Table style={{ marginBottom: '223px' }} striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr style={{textAlign: 'center'}}>
                                        <td>ID</td>
                                        <td>NAME</td>
                                        <td>EMAIL / NIC</td>
                                        <td>ROLE</td>
                                        {
                                            userInfo.role === 3 ?
                                            (
                                                <td>EDIT / DELETE</td>
                                            ) :
                                            ('')
                                        }
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.filter((user) => user.role !== 3).map(user => (
                                            <tr style={{textAlign: 'center'}} key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>                                             
                                                <td>                                                   
                                                <a href={`mailto:${user.email}`}>{user.email}</a></td>
                                                {
                                                    user.role === 0 ? (
                                                        <td>Customer</td>
                                                    ) : user.role === 1 ? (
                                                        <td>Farmer</td>
                                                    ) : (
                                                        <td>Staff</td>
                                                    )
                                                }
                                                {
                                                userInfo.role === 3 ?
                                                (
                                                    <td>
                                                        <Button variant="light" className="btn btn-sm" onClick={() => editHandler(user.name, user._id, user.email, user.role)}>
                                                            <i className="fas fa-edit"></i>
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            className="btn-sm mr-2"
                                                            onClick={() => deleteHandler(user._id)}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </Button>
                                                    </td>
                                                ) : (
                                                    ''
                                                )
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                }
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>User Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                {
                                    userInfo.role === 3 ?
                                    (
                                        <Form.Group controlId='register'>
                                            <Form.Label>Register As<span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                as="Select"
                                                value={registerrole}
                                                required
                                                onInput={(e) => setRegisterrole(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='staff'>Staff</option>
                                                <option value='farmer'>Farmer</option>
                                            </Form.Control>
                                        </Form.Group>
                                    ) :
                                    (
                                        <Form.Group controlId='register'>
                                            <Form.Label>Register As<span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                as="Select"
                                                value={registerrole}
                                                required
                                                onInput={(e) => setRegisterrole(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='farmer'>Farmer</option>
                                            </Form.Control>
                                        </Form.Group>
                                    )
                                }
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
                </Modal.Body>
            </Modal>
            <Modal show={edit} onHide={editClose}>
                <Modal.Header closeButton>
                <Modal.Title>User Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editSubmit}>
                        <Row>
                            <Col md={12}>
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
                                {
                                    userInfo.role === 3 ?
                                    (
                                        <Form.Group controlId='register'>
                                            <Form.Label>Register As<span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                as="Select"
                                                value={registerrole}
                                                required
                                                onInput={(e) => setRegisterrole(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='staff'>Staff</option>
                                                <option value='farmer'>Farmer</option>
                                                <option value='customer'>Customer</option>
                                            </Form.Control>
                                        </Form.Group>
                                    ) :
                                    (
                                        <Form.Group controlId='register'>
                                            <Form.Label>Register As<span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                as="Select"
                                                value={registerrole}
                                                required
                                                onInput={(e) => setRegisterrole(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='farmer'>Farmer</option>
                                                <option value='customer'>Customer</option>
                                            </Form.Control>
                                        </Form.Group>
                                    )
                                }
                                <div className="col text-center">
                                    <Button style={{alignItems: "center"}} type="submit" variant="primary">Update</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserList
