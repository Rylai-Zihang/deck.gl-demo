// @ts-nocheck
import * as React from 'react';
import { useState, useRef, useCallback } from "react";
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import geo2 from "./assets/points1.json"
import { MapboxLayer } from '@deck.gl/mapbox';

const MAPBOX_TOKEN = "pk.eyJ1IjoicnlsYWkiLCJhIjoiY2t2bHN0bXViZGhqdjJwbWFibXY2NGVndyJ9.kWVDaEW-3MW_Ny3KOq4ACw";

const initialViewState = {
    zoom: 12
};

const getInitialPosition = (data) => {
    const [longitude, latitude] = data['features'][0]['geometry']['coordinates']
    Object.assign(initialViewState, {
        longitude,
        latitude
    })
}

getInitialPosition(geo2)

export default function App() {
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(async () => {
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;
        // prevent flashing
        map.addLayer(
            new MapboxLayer({ 'id': "empty-layer", deck })
        );

        map.addSource('layer1', {
            'type': 'geojson',
            'data': geo2
        });

        /* addLayer: used to add a mix of deck.gl and Mapbox layers to the top of the layer stack from the currently loaded Mapbox style
        */
        map.addLayer({
            'id': 'layer1-point',
            'type': 'circle',
            'source': 'layer1',
            'paint': {
                'circle-radius': 3,
                'circle-color': '#B42222'
            },
            'filter': ['==', '$type', 'Point']
        });

        map.addLayer({
            'id': 'layer1-label',
            'type': 'symbol',
            'source': 'layer1',
            'layout': {
                'text-field': ['get', 'name'],
                'text-size': 12,
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-radial-offset': 0.5,
                'text-justify': 'auto'
            }
        });
    }, []);


    return (
        <DeckGL
            ref={deckRef}
            initialViewState={initialViewState}
            controller={true}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
        >
            {glContext && (
                /* Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    mapStyle="mapbox://styles/mapbox/light-v9"
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onLoad={onMapLoad}
                />
            )}
        </DeckGL>
    );
}