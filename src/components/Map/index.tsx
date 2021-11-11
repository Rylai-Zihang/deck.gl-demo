import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import DeckGL from '@deck.gl/react';
import { MapRef, StaticMap } from 'react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';

import store from '../../store';
import { getInitialView, getLayerOptions } from '../../utils';
import { InitialView } from '../../types';
import { MAPBOX_TOKEN, POINT_COLORS, DEFAULT_INITIAL_VIEW } from '../../utils/constants';

export default function Map() {
    const { state } = useContext(store.Context);
    const { fileContent, clickedLayer, layerStatus } = state;
    const [glContext, setGLContext] = useState<WebGLRenderingContext>();

    const deckRef = useRef<DeckGL>(null);
    const mapRef = useRef<MapRef>(null);
    const mapInstanceRef = useRef<{ map: any }>({
        map: null
    });

    const initialView: InitialView = fileContent ? getInitialView(fileContent) : DEFAULT_INITIAL_VIEW;

    const onMapLoad = useCallback(() => {
        const map = mapRef.current?.getMap();
        const deck = deckRef.current?.deck;
        // Initialize an empty deck.gl layer to prevent flashing
        map.addLayer(new MapboxLayer({ id: 'empty-layer', deck }));
        mapInstanceRef.current.map = map;
    }, []);

    // Sort the layer array according to the index property
    const layerArray = Object.keys(layerStatus).sort((a, b) => {
        return layerStatus[a].index - layerStatus[b].index;
    });

    useEffect(() => {
        if (!fileContent) return;
        const { map } = mapInstanceRef.current;
        // Get the newest layer
        const newIndex = layerArray.length - 1;
        const layerName = layerArray[newIndex];
        map.addSource(layerName, {
            type: 'geojson',
            data: fileContent
        });
        map.addLayer(
            getLayerOptions({
                id: `${layerName}-point`,
                type: 'circle',
                source: layerName,
                paint: {
                    'circle-color': POINT_COLORS[newIndex]
                }
            })
        );
        map.addLayer(
            getLayerOptions({
                id: `${layerName}-label`,
                type: 'symbol',
                source: layerName
            })
        );
    }, [fileContent]);

    useEffect(() => {
        if (!clickedLayer) return;
        const { map } = mapInstanceRef.current;
        const { checked } = layerStatus[clickedLayer];
        const visibilityState = checked ? 'visible' : 'none';
        map?.setLayoutProperty(`${clickedLayer}-point`, 'visibility', visibilityState);
        map?.setLayoutProperty(`${clickedLayer}-label`, 'visibility', visibilityState);
    }, [clickedLayer, layerStatus]);

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
                // Mapbox must be instantiated after the WebGLContext is available
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
