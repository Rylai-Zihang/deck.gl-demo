import React, { useState, useRef, useCallback, useEffect, useContext } from "react"
import DeckGL from "@deck.gl/react"
import { StaticMap } from "react-map-gl"
import { MapboxLayer } from "@deck.gl/mapbox"

import store from "../../store"
import { getInitialView } from "../../utils"
import { InitialView } from "../../types"
import { MAPBOX_TOKEN, POINT_COLORS } from '../../utils/constants'

export default function Map() {
    const { state, dispatch } = useContext(store.Context)
    const { fileContent, layerArray, clickedLayer, visibilityArray } = state
    const [glContext, setGLContext] = useState<any>()

    const deckRef = useRef<any>(null)
    const mapRef = useRef<any>(null)
    const map = mapRef?.current?.getMap()
    const deck = deckRef?.current?.deck

    const initialView: InitialView =
        fileContent ?
            getInitialView(fileContent) :
            { zoom: 12, longitude: 114.05, latitude: 22.55 }


    const onMapLoad = useCallback(() => {
        // prevent flashing
        map?.addLayer(
            new MapboxLayer({ 'id': "empty-layer", deck })
        )
    }, [])

    useEffect(() => {
        // get the newest layer
        const newIndex = layerArray.length - 1
        const layerName = layerArray[newIndex]
        if(fileContent) {
            map.addSource(layerName, {
                'type': 'geojson',
                'data': fileContent
            })
            map.addLayer({
                'id': `${layerName}-point`,
                'type': 'circle',
                'source': layerName,
                'paint': {
                    'circle-radius': 3,
                    'circle-color': POINT_COLORS[newIndex]
                },
                'filter': ['==', '$type', 'Point']
            })
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
            })
        }
    }, [fileContent])

    useEffect(() => {
        if(!clickedLayer) return
        const { index, checked } = clickedLayer
        const visibilityState = checked ? 'visible' : 'none'
        const layerName = layerArray[index]
        map?.setLayoutProperty(
            `${layerName}-point`,
            'visibility',
            visibilityState
        )
        map?.setLayoutProperty(
            `${layerName}-label`,
            'visibility',
            visibilityState
        )
        const newArray = [...visibilityArray]
        newArray.splice(index, 1, checked)
        dispatch({ type: "setVisibilityArray", visibilityArray: newArray })
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
        </DeckGL>
    )
}