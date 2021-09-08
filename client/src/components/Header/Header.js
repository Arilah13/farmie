import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import './Header.css'

import { logout } from './../../redux/actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" fixed="top">
        <LinkContainer to="/">
            <Navbar.Brand className="nav-cal" >
                <Image width="80px"src="https://res.cloudinary.com/rilah/image/upload/v1631078010/agrocare/logo_ku7ird.png" />
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ">

                {
                    (!userInfo || (userInfo.role !== 3 && userInfo.role !== 2)) && (
                    <LinkContainer to="/">
                        <Nav.Link className="nav-cal">HOME</Nav.Link>
                    </LinkContainer>
                    )
                }

                {
                    (userInfo && userInfo.role === 1)  && (
                        <NavDropdown title="PRODUCTS" id="products">
                            <LinkContainer to='/products'>
                                <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/farmer/submit'>
                                <NavDropdown.Item>SUBMIT PRODUCT</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/myproducts'>
                                <NavDropdown.Item>MY PRODUCTS</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    ) 
                }  

                {
                    ((userInfo && userInfo.role === 0) || (!userInfo)) && (
                        <LinkContainer to="/products">
                            <Nav.Link className="nav-cal">PRODUCTS</Nav.Link>
                        </LinkContainer>
                    ) 
                }   

                {
                    userInfo && ( userInfo.role === 0 || userInfo.role === 1 )  && (
                        <LinkContainer to="/myorders">
                            <Nav.Link className="nav-cal">MY ORDERS</Nav.Link>
                        </LinkContainer>
                    )
                }

                {
                    
                    userInfo && ( userInfo.role === 0 || userInfo.role === 1 ) && (
                        <LinkContainer to="/cart" >
                            <Nav.Link className="cart nav-cal">
                                <i className="fas fa-shopping-cart"></i>
                                CART
                            </Nav.Link>
                        </LinkContainer>
                    )
                }

                {
                    userInfo ? (
                        <>
                        {
                            (userInfo.role === 3 || userInfo.role === 2) &&
                            <Nav.Link className="admin nav-cal"></Nav.Link>
                        }
                        <NavDropdown title={userInfo.name.toUpperCase()} id='username'>
                            {
                                userInfo.role === 3 ? (
                                    <LinkContainer to='/admin/profile'>
                                        <NavDropdown.Item>PROFILE</NavDropdown.Item>
                                    </LinkContainer>
                                ) :
                                (userInfo.role === 1 || userInfo.role === 0) ? (
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>PROFILE</NavDropdown.Item>
                                    </LinkContainer>
                                ) : 
                                (
                                    <LinkContainer to='/staff/profile'>
                                        <NavDropdown.Item>PROFILE</NavDropdown.Item>
                                    </LinkContainer>
                                ) 
                            }
                            <LinkContainer to='/login'>
                                <NavDropdown.Item onClick={logoutHandler}>LOGOUT</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        </>
                    ) : (
                            <LinkContainer to="/login">
                                <Nav.Link className="login nav-cal">SIGN IN</Nav.Link>
                            </LinkContainer>
                        )
                }
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
