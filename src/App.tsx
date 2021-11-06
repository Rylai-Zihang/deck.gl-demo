
import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from "react";
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';

import ControlPanel from './components/ControlPanel'
import Uploader from './components/Upload'
import { getInitialView } from './utils';
import { ClickedLayer, FileContent, InitialView } from './utils/types';
import { MAPBOX_TOKEN, POINT_COLORS } from './utils/constants';


export default function App() {
    const [glContext, setGLContext] = useState<any>();
    const [fileContent, setFileContent] = useState<FileContent>(null);
    const [layerArray, setLayerArray] = useState<string[]>([]);
    const [visibilityArray, setVisibilityArray] = useState<boolean[]>([]);
    const [clickedLayer, setClickedLayer] = useState<ClickedLayer>(null);

    const deckRef = useRef<any>(null);
    const mapRef = useRef<any>(null);
    const map = mapRef?.current?.getMap();
    const deck = deckRef?.current?.deck;

    const initialView: InitialView = getInitialView(fileContent);

    const onMapLoad = useCallback(() => {
        // prevent flashing
        map?.addLayer(
            new MapboxLayer({ 'id': "empty-layer", deck })
        )
    }, [map]);

    useEffect(() => {
        const length = layerArray.length
        // the newest layer
        const layerName = layerArray[length - 1]
        if (fileContent) {
            map.addSource(layerName, {
                'type': 'geojson',
                'data': fileContent
            });
            map.addLayer({
                'id': `${layerName}-point`,
                'type': 'circle',
                'source': layerName,
                'paint': {
                    'circle-radius': 3,
                    'circle-color': POINT_COLORS[length - 1]
                },
                'filter': ['==', '$type', 'Point']
            });
            map.addLayer({
                'id': `${layerName}-label`,
                'type': 'symbol',
                'source': layerName,
                'layout': {
                    'text-field': ['get', 'name'],
                    'text-size': 12,
                    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'auto'
                }
            });
        }
    }, [fileContent])

    useEffect(() => {
        if (!clickedLayer) return
        const { index, checked } = clickedLayer
        const visibilityState = checked ? 'visible' : 'none'
        const layerName = layerArray[index]
        map?.setLayoutProperty(
            `${layerName}-point`,
            'visibility',
            visibilityState
        );
        map?.setLayoutProperty(
            `${layerName}-label`,
            'visibility',
            visibilityState
        );
        const newArray = [...visibilityArray]
        newArray.splice(index, 1, checked)
        setVisibilityArray(newArray)
    }, [clickedLayer])

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
            <ControlPanel
                layerArray={layerArray}
                visibilityArray={visibilityArray}
                setClickedLayer={setClickedLayer}></ControlPanel>
            <Uploader
                layerArray={layerArray}
                setFileContent={setFileContent}
                setLayerArray={setLayerArray}
                visibilityArray={visibilityArray}
                setVisibilityArray={setVisibilityArray}></Uploader>
        </DeckGL>
    );
}