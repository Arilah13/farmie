import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { MDBFooter } from 'mdbreact'

import './Footer.css'

const Footer = () => {
    return (
        <BrowserRouter>
            <MDBFooter>
            <footer class="site-footer">
                <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                    <h6>About</h6>
                    <p class="text-justify"></p>
                    </div>
        
                    <div class="col-xs-6 col-md-3">
                    <h6>Categories</h6>
                    <ul class="footer-links">
                        <li><a href="#">Vegetables</a></li>
                        <li><a href="#">Fruits</a></li>
                        <li><a href="#">Meat</a></li>
                    </ul>
                    </div>
        
                    <div class="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul class="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    </div>
                </div>
                <hr/>
                </div>
                <div class="container">
                <div class="row">
                    <div class="col-md-8 col-sm-6 col-xs-12">
                    <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
                <a href="#"> Rilah</a>.
                    </p>
                    </div>
        
                    <div class="col-md-4 col-sm-6 col-xs-12">
                    <ul class="social-icons">
                        <li><a class="facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a class="twitter" href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a class="dribbble" href="#"><i class="fab fa-google-plus-g"></i></a></li>
                        <li><a class="linkedin" href="#"><i class="fab fa-linkedin-in"></i></a></li>   
                    </ul>
                    </div>
                </div>
                </div>
            </footer>
            </MDBFooter>
        </BrowserRouter>
    )
}

export default Footer
