import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps'
import Message from '../../Message/Message'
import Loader from '../../Loader/Loader'
import { listProducts } from '../../../redux/actions/productActions'
import MapStyles from './MapStyles'
import Rating from './Rating/Rating'

const Map = () => {

    const dispatch = useDispatch()

    const [selectedPlace, setSelectedPlace] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProducts, error: errorProducts, products } = productDetails

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <GoogleMap
            defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
            defaultZoom={10}
            defaultOptions={{ styles: MapStyles }}
            center={{ lat: products.lat, lng: products.lng }}
        >
            {
                loadingProducts ? <Loader />
                    : errorProducts
                        ? <Message variant='danger'>{errorProducts}</Message>
                        : (
                                <Marker
                                    key={products._id}
                                    position={{
                                        lat: products.lat,
                                        lng: products.lng
                                    }}
                                    onClick={() => {
                                        setSelectedPlace(true)
                                    }}
                                    icon={{
                                        url: '/mapIcon.svg',
                                        scaledSize: new window.google.maps.Size(25, 25)
                                    }}
                                />
                            )
            }
            {
                selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: products.lat,
                            lng: products.lng
                        }}
                        onCloseClick={() => {
                            setSelectedPlace(false)
                        }}
                    >
                        <div>
                                <p><Rating text="Staff-Rating" value={products.staffrating} /></p>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>

    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
