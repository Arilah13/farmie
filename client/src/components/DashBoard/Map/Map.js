import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Form, Button } from 'react-bootstrap'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps'
import Message from '../../Message/Message'
import Loader from '../../Loader/Loader'
import { listPendingProducts, setProducts } from '../../../redux/actions/productActions'
import MapStyles from './MapStyles'

const Map = () => {

    const dispatch = useDispatch()

    const [selectedPlace, setSelectedPlace] = useState(null)
    const [status, setStatus] = useState(null)
    const [rating, setRating] = useState(null)
    const [message, setMessage] = useState('')

    const productList = useSelector(state => state.productList)
    const { loading: loadingProducts, error: errorProducts, products } = productList

    const setproduct = useSelector(state => state.setProducts)
    const { loading, error, success } = setproduct

    useEffect(() => {
        dispatch(listPendingProducts())
        setMessage('')
    }, [dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setProducts({
            productID: selectedPlace._id,
            approved: status,
            staffrating: rating
        }))
        setMessage('Product set successfully')
        setSelectedPlace('')
    }

    return (
        <>
        <GoogleMap
            defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
            defaultZoom={10}
            defaultOptions={{ styles: MapStyles }}
        >
            <div style={{position: 'fixed'}}>
                {message && <Message variant='success'>{message}</Message>}
                {   
                    loading ? <Loader /> 
                        : error
                            ? <Message variant='danger'>{error}</Message>
                                :''             
                }
            </div>
            {
                loadingProducts ? <Loader />
                    : errorProducts
                        ? <Message variant='danger'>{errorProducts}</Message>
                        : (
                            products.map(place => (
                                <Marker
                                    key={place._id}
                                    position={{
                                        lat: place.lat,
                                        lng: place.lng
                                    }}
                                    onClick={() => {
                                        setSelectedPlace(place)
                                    }}
                                    icon={{
                                        url: '/mapIcon.svg',
                                        scaledSize: new window.google.maps.Size(25, 25)
                                    }}
                                />
                            ))
                        )

            }
            {
                selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.lat,
                            lng: selectedPlace.lng
                        }}
                        onCloseClick={() => {
                            setSelectedPlace(null)
                        }}
                        option={{
                            maxWidth: 500
                        }}
                    >
                        <div>
                            <Form onSubmit={submitHandler}>
                            <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={selectedPlace.image} alt={selectedPlace.name} />
                            <p style={{marginTop:'1rem'}}>Crop Name: {selectedPlace.name}</p>
                            <p>Crop Type: {selectedPlace.type}</p>
                            <p>Crop Quantity: {selectedPlace.countInStock}</p>
                            <p>Crop Price: Rs.{selectedPlace.price}</p>
                            <p>Accept Product:&nbsp;&nbsp;
                                <input type="radio" name="stat" value="true" onClick={(e) => setStatus(e.target.value)} />
                                <label>Accept</label>&nbsp;&nbsp;
                                <input type="radio" name="stat" value="false" onClick={(e) => setStatus(e.target.value)} />
                                <label>Decline</label>                              
                            </p>
                            <p>Rating:&nbsp;&nbsp;
                                <select onChange={(e) => setRating(e.target.value)}>
                                    <option value="0">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </p>
                            <Button style={{marginLeft: "1rem", marginTop: "0.2rem"}} type="submit" variant="primary">Submit Product</Button>
                            </Form>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>
        </>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
