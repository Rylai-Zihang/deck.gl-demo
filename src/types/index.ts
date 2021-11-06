export interface GeoData {
    type: string,
    features: Array<Feature>
}

interface Feature {
    properties: { "name": string },
    geometry: { "type": string, "coordinates": PositionArray }
}

type PositionArray = [number, number]

export type InitialView = {
    longitude: number,
    latitude: number,
    zoom: number,
    pitch: number,
    bearing: number
}

interface GeoLayer {
    index: number,
    checked: boolean
}

export type Store = {
    fileContent: GeoData | null,
    layerArray: string[],
    visibilityArray: boolean[],
    clickedLayer: GeoLayer | null
}

export type Action = { type: string, [key: string]: any }