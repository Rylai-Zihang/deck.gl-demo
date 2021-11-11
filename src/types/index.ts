export interface GeoData {
    type: string;
    features: Array<Feature>;
}

interface Feature {
    properties: { name: string };
    geometry: { type: string; coordinates: PositionArray };
}

type PositionArray = [number, number];

export interface InitialView {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
}

interface LayerStatus {
    [layerName: string]: { checked: boolean; index: number };
}

export interface Store {
    fileContent: GeoData | null;
    clickedLayer: string;
    layerStatus: LayerStatus;
}

export type Action =
    | { type: 'setFileContent'; fileContent: GeoData | null }
    | { type: 'setClickedLayer'; clickedLayer: string }
    | { type: 'setLayerStatus'; layerStatus: LayerStatus };

export interface LayerOptions {
    id: string;
    source: string;
    type: LayerType;
    paint?: { [prop: string]: number | string };
    layout?: { [prop: string]: number | string | string[] };
    filter?: string[];
}

export type LayerType = 'circle' | 'symbol';
