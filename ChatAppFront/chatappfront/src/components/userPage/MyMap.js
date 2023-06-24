import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './MyMap.css';

const MyMap = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vemVuYmVyZyIsImEiOiJjbGphZHY3YjMxbjI0M2Rxem4ybHF1ZWc5In0.e5wmrFTSG5JBOz84CCgvsw';

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: 0, // Initial latitude
        longitude: 0, // Initial longitude
        zoom: 10, // Initial zoom level
    });



    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vemVuYmVyZyIsImEiOiJjbGphZHY3YjMxbjI0M2Rxem4ybHF1ZWc5In0.e5wmrFTSG5JBOz84CCgvsw';
        const bounds = [
            [20.2611, 43.6187], // Southwest coordinates [longitude, latitude]
            [29.7497, 48.2656], // Northeast coordinates [longitude, latitude]
        ];


        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // Replace with your desired map style
            bounds: bounds, // Set the initial boundaries to focus on Romania
            maxBounds: bounds, // Restrict panning and zooming outside of Romania
            minZoom: 5, // Set the minimum allowed zoom level
            attributionControl: false, // Hide the Mapbox logo and attribution
        });

        return () => {
            map.remove(); // Clean up the map when the component unmounts
        };
    }, []);


    return (


        <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken="pk.eyJ1IjoiZm9vemVuYmVyZyIsImEiOiJjbGphZHY3YjMxbjI0M2Rxem4ybHF1ZWc5In0.e5wmrFTSG5JBOz84CCgvsw"
        >
            {/* Add any additional components or overlays */}
        </ReactMapGL>


    );
};


export default MyMap;