import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'
import MapStyles from './MapStyles'

const Map = ({latd, longd}) => {

    return (
        <GoogleMap
            defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
            defaultZoom={11}
            defaultOptions={{ styles: MapStyles }}
            center={{lat: latd, lng: longd}}
        >
            {
                latd !== '' || longd !== '' ? (
            <Marker
                position={{ lat: parseFloat(latd), lng: parseFloat(longd) }}
                icon={{
                    url: '/mapIcon.svg',
                    scaledSize: new window.google.maps.Size(25, 25)
                }}
                />
                ) : (
                    ''
                )
            }
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
