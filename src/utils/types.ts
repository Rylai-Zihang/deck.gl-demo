export type FileContent = GeoData | null

interface GeoData {
    type: string,
    features: Array<Feature>
}

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
