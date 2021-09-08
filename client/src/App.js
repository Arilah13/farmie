import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LoginComponent from './components/Login/LoginCompponent'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import Register from './components/Register/Register'

import HomeScreen from './screens/Home/HomeScreen'
import ProductScreen from './screens/Products/ProductScreen'
import ProductDetailsScreen from './screens/Products/Productdetails'
import CartScreen from './screens/Cart/Cart'
import ShippingScreen from './screens/Shipping/ShippingScreen'
import PaymentScreen from './screens/Payment/PaymentScreen'
import OrderScreen from './screens/Order/OrderScreen'
import ProductSubmit from './screens/Products/ProductSubmit'
import OrderListScreen from './screens/OrderList/OrderList'
import ProductListScreen from './screens/ProductList/ProductList'
import ProductEditScreen from './screens/ProductList/ProductEdit'
import UserListScreen from './screens/Admin-Staff/Dashboard/UserListScreen'
import DashboardScreen from './screens/Admin-Staff/Dashboard/DashboardScreen'
import ProfileScreen from './screens/Admin-Staff/Dashboard/ProfileScreen'
import ProductList from './screens/Admin-Staff/Dashboard/ProductListScreen'
import OrderList from './screens/Admin-Staff/Dashboard/OrderListScreen'
import MapScreen from './screens/Admin-Staff/Dashboard/MapScreen'
import CProfileScreen from './screens/Profile/Profile'
import StaffMapScreen from './screens/Admin-Staff/Staff-Dashboard/PendingProductsScreen'
import StaffDashboardScreen from './screens/Admin-Staff/Staff-Dashboard/DashboardScreen'
import StaffOrderListScreen from './screens/Admin-Staff/Staff-Dashboard/OrderListScreen'
import StaffProductListScreen from './screens/Admin-Staff/Staff-Dashboard/ProductListScreen'
import StaffProfileScreen from './screens/Admin-Staff/Staff-Dashboard/ProfileScreen'
import StaffUserListScreen from './screens/Admin-Staff/Staff-Dashboard/UserListScreen'

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/profile" component={CProfileScreen} />
          <Route exact path="/products" component={ProductScreen} />
          <Route exact path="/products/:id" component={ProductDetailsScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/myorders" component={OrderListScreen} />
          
          <Route exact path="/farmer/submit" component={ProductSubmit} />     
          <Route exact path="/myproducts" component={ProductListScreen} />
          <Route exact path="/myproducts/:id" component={ProductEditScreen} />

          <Route exact path="/admin/dashboard" component={DashboardScreen} />
          <Route exact path="/admin/profile" component={ProfileScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/admin/productlist" component={ProductList} />
          <Route exact path="/admin/orderlist" component={OrderList} />
          <Route exact path="/admin/map" component={MapScreen} />

          <Route exact path="/staff/dashboard" component={StaffDashboardScreen} />
          <Route exact path="/staff/profile" component={StaffProfileScreen} />
          <Route exact path="/staff/productlist" component={StaffProductListScreen} />
          <Route exact path="/staff/orderlist" component={StaffOrderListScreen} />
          <Route exact path="/staff/map" component={StaffMapScreen} />
          <Route exact path="/staff/userlist" component={StaffUserListScreen} />
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;
