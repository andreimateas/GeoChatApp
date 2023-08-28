import React, {useState, useEffect, useRef} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './MyMap.css';
import romaniaStates from './ro_judete_poligon.geojson';
import MapboxGlSupported from 'mapbox-gl-supported';

const MyMap = ({initialLocation, onMapChange}) => {

    const mapContainerRef = useRef(null);

    const [selectedState, setSelectedState] = useState(initialLocation);

    /**
     * Effect that updates the map when the selected state changes.
     */
    useEffect(() => {

        console.log('Selected State:', selectedState);
        document.getElementById("city-header").textContent=selectedState;
        onMapChange();

    }, [selectedState]);


    /**
     * Effect that initializes the map when the component mounts.
     */
    useEffect(() => {
        const isMapboxSupported = MapboxGlSupported();

        if (isMapboxSupported) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vemVuYmVyZyIsImEiOiJjbGphZHY3YjMxbjI0M2Rxem4ybHF1ZWc5In0.e5wmrFTSG5JBOz84CCgvsw';

            const bounds = [
                [20.2611, 43.6187],
                [29.7497, 48.2656],
            ];

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                bounds: bounds,
                maxBounds: bounds,
                minZoom: 5,
                attributionControl: false,
            });

            map.on('load', () => {
                map.addSource('romania-states', {
                    type: 'geojson',
                    data: romaniaStates,
                });

                map.addLayer({
                    id: 'romania-states-fill',
                    type: 'fill',
                    source: 'romania-states',
                    layout: {},
                    paint: {
                        'fill-color': [
                            'case',
                            ['==', ['get', 'name'], selectedState],
                            '#d97581',
                            'transparent',
                        ],
                        'fill-opacity': 0.5,
                    },
                });

                map.on('click', 'romania-states-fill', (e) => {
                    const clickedState = e.features[0].properties.name;

                    if (selectedState === clickedState) {

                        setSelectedState(null);
                    } else {
                        setSelectedState(clickedState);
                    }
                });

                map.on('mousemove', 'romania-states-fill', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', 'romania-states-fill', () => {
                    map.getCanvas().style.cursor = '';
                });
            });

            return () => {
                map.remove();
            };
        }
    }, [selectedState]);


    return (


        <div

            style={{
                width: '75%',
                margin: '0 auto',
                height: '500px',
                borderRadius: '10px',
                overflow: 'hidden',

            }}
            id="map-container"
            ref={mapContainerRef}
        />


    );
};


export default MyMap;