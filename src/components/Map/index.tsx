import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import DeckGL from '@deck.gl/react';
import { MapRef, StaticMap } from 'react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';

import store from '../../store';
import { getInitialView, getLayerOptions } from '../../utils';
import { InitialView } from '../../types';
import { MAPBOX_TOKEN, POINT_COLORS, DEFAULT_INITIAL_VIEW } from '../../utils/constants';

export default function Map() {
    const { state, dispatch } = useContext(store.Context);
    const { fileContent, layerArray, clickedLayer, visibilityArray } = state;
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
        // prevent flashing
        map.addLayer(new MapboxLayer({ id: 'empty-layer', deck }));
        mapInstanceRef.current.map = map;
    }, []);

    useEffect(() => {
        if (!fileContent) return;
        const { map } = mapInstanceRef.current;
        // get the newest layer
        const newIndex = layerArray.length - 1;
        const layerName = layerArray[newIndex];
        map.addSource(layerName, {
            type: 'geojson',
            data: fileContent
        });
        const pointLayerOptions = getLayerOptions(`${layerName}-point`,'circle',layerName, {paint: { 'circle-color': POINT_COLORS[newIndex]}})
        const symbolLayerOptions = getLayerOptions(`${layerName}-label`,'symbol',layerName)
        map.addLayer(pointLayerOptions)
        map.addLayer(symbolLayerOptions)
    }, [fileContent]);

    useEffect(() => {
        if (!clickedLayer) return;
        const { index, checked } = clickedLayer;
        const { map } = mapInstanceRef.current;
        const visibilityState = checked ? 'visible' : 'none';
        const layerName = layerArray[index];
        map?.setLayoutProperty(`${layerName}-point`, 'visibility', visibilityState);
        map?.setLayoutProperty(`${layerName}-label`, 'visibility', visibilityState);
        const newArray = [...visibilityArray];
        newArray.splice(index, 1, checked);
        dispatch({ type: 'setVisibilityArray', visibilityArray: newArray });
    }, [clickedLayer]);

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
        </DeckGL>
    );
}
