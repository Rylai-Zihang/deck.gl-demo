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

interface GeoLayer {
    index: number;
    checked: boolean;
}

export interface Store {
    fileContent: GeoData | null;
    layerArray: string[];
    visibilityArray: boolean[];
    clickedLayer: GeoLayer | null;
}

export type Action =
    | { type: 'setFileContent'; fileContent: GeoData | null }
    | { type: 'setLayerArray'; layerArray: string[] }
    | { type: 'setVisibilityArray'; visibilityArray: boolean[] }
    | { type: 'setClickedLayer'; clickedLayer: GeoLayer | null };

export interface LayerOptions {
    id: string;
    source: string;
    type: LayerType;
    paint?: { [prop: string]: number | string };
    layout?: { [prop: string]: number | string | string[] };
    filter?: string[];
}

export type LayerType = 'circle' | 'symbol';
