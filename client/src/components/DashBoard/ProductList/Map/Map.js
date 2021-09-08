import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../../../redux/actions/productActions'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps'
import {
    Button,
    Form,
    Image
} from 'react-bootstrap'
import MapStyles from './MapStyles'

const Map = ({latd, longd, rating, id, approved, image, name}) => {

    const dispatch = useDispatch()

    const [click, setClick] = useState(false)
    const [Rating, setRating] = useState('')
    const [status, setStatus] = useState('')

    const setproduct = useSelector(state => state.setProducts)
    const { error, success } = setproduct

    useEffect(() => {
        setRating(rating)
        setStatus(approved)
    }, [])

    const handleClick = () => setClick(true)
    const handleClickClose = () => setClick(false)

    useEffect(() => {
        handleClickClose()
    }, [dispatch, success, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setProducts({
            productID: id,
            approved: status,
            staffrating: Rating
        }))
    }

    return (
        <>
        <GoogleMap
            defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
            defaultZoom={11}
            defaultOptions={{ styles: MapStyles }}
            center={{lat: parseFloat(latd), lng: parseFloat(longd)}}
        >
        <Marker
            position={{ lat: parseFloat(latd), lng: parseFloat(longd) }}
            icon={{
                url: '/mapIcon.svg',
                scaledSize: new window.google.maps.Size(25, 25)
            }}
            onClick={handleClick}
        />
        {
        click && (
        <InfoWindow
            position={{
                lat: latd,
                lng: longd
            }}
            onCloseClick={() => {
                handleClickClose()
            }}
            options={{ maxWidth: 500,
            maxHeight: 700 }}
        >
            <div>
                <Form onSubmit={submitHandler}>
                <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={image} alt={name} />
                <p style={{marginTop: '0.3rem'}}>Accept Product:&nbsp;&nbsp;
                    {status === true ? (
                        <>
                        <input type="radio" value="true" name="approve" checked onChange={(e) => setStatus(e.target.value)} 
                        />
                        <label>Accept</label>&nbsp;&nbsp;
                        <input type="radio" value="false" name="approve" onChange={(e) => setStatus(e.target.value)} />
                        <label>Decline</label> 
                        </>
                    ) : (
                        <>
                        <input type="radio" value="true" name="approve" onChange={(e) => setStatus(e.target.value)} 
                        />
                        <label>Accept</label>&nbsp;&nbsp;
                        <input type="radio" value="false" name="approve" checked onChange={(e) => setStatus(e.target.value)} />
                        <label>Decline</label> 
                        </>
                    )}                             
                </p>
                <p>Rating:&nbsp;&nbsp;
                    <select 
                        onChange={(e) => setRating(e.target.value)}
                        defaultValue={Rating}>
                        <option value="0">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </p>
                <Button style={{marginLeft: "1rem", marginTop: "0.2rem"}} type="submit" variant="primary">Update Product</Button>
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
