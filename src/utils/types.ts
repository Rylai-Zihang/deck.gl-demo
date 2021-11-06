interface GeoData {
    type: string,
    features: Array<Feature>
}

export type FileContent = GeoData | null

interface Feature {
    properties: { "name": string },
    geometry: { "type": string, "coordinates": PositionArray }
}

type PositionArray = [number, number]

export type InitialView = {
    zoom: number,
    longitude:number,
    latitude:number
}

interface GeoLayer {
    index: number,
    checked: boolean
}

export type ClickedLayer = GeoLayer | null


export type Store = {
    fileContent: FileContent,
    layerArray: string[],
    visibilityArray: boolean[],
    clickedLayer: ClickedLayer,
}

export type Action = { type: string, [key: string]: any }