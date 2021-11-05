
import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from "react";
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';

import Uploader from './Upload'
import { getInitialView } from './utils';
import { FileContent, InitialView } from './utils/types';

const MAPBOX_TOKEN = "pk.eyJ1IjoicnlsYWkiLCJhIjoiY2t2bHN0bXViZGhqdjJwbWFibXY2NGVndyJ9.kWVDaEW-3MW_Ny3KOq4ACw";

export default function App() {
    const [glContext, setGLContext] = useState<any>();
    const [fileContent, setFileContent] = useState<FileContent>(null);
    const deckRef = useRef<any>(null);
    const mapRef = useRef<any>(null);
    const map = mapRef?.current?.getMap();
    const deck = deckRef?.current?.deck;

    const initialView: InitialView = getInitialView(fileContent);
    const onMapLoad = useCallback(() => {
        // prevent flashing
        map.addLayer(
            new MapboxLayer({ 'id': "empty-layer", deck })
        )
    }, []);

    useEffect(() => {
        const map = mapRef?.current?.getMap();
        fileContent &&
            map.addSource('layer1', {
                'type': 'geojson',
                'data': fileContent
            });

        fileContent &&
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

        fileContent &&
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
    }, [fileContent])


    return (
        <DeckGL
            ref={deckRef}
            initialViewState={initialView}
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
            <Uploader setFileContent={setFileContent}></Uploader>
        </DeckGL>
    );
}