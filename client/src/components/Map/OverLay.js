import React from 'react'
import WrappedMap from './Map'
import { Scrollbar } from "react-scrollbars-custom";

const OverLay = ({lat, lng}) => {
    return (
        <Scrollbar style={{ width: '100%', height: 480 }}>
            <div style={{ width: '100%', height: '100vh' }}>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBnDykjegyIx7y8RFt0HL1jWbsDCG12PiU`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100vh' }} />}
                    latd={lat}
                    longd={lng}
                />
            </div>
        </Scrollbar>
    )
}

export default OverLay
