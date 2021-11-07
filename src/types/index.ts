export interface GeoData {
    type: string
    features: Array<Feature>
}

interface Feature {
    properties: { name: string }
    geometry: { type: string; coordinates: PositionArray }
}

type PositionArray = [number, number]

export interface InitialView {
    longitude: number
    latitude: number
    zoom: number
    pitch: number
    bearing: number
}

interface GeoLayer {
    index: number
    checked: boolean
}

export interface Store {
    fileContent: GeoData | null
    layerArray: string[]
    visibilityArray: boolean[]
    clickedLayer: GeoLayer | null
}

export interface Action {
    type: string
    [key: string]: any
}
