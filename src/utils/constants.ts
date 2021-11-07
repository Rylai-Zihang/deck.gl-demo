export const MAPBOX_TOKEN = 'pk.eyJ1IjoicnlsYWkiLCJhIjoiY2t2bHN0bXViZGhqdjJwbWFibXY2NGVndyJ9.kWVDaEW-3MW_Ny3KOq4ACw';

export const POINT_COLORS = ['#669900', '#990055', '#3E71F6'];

export const DEFAULT_INITIAL_VIEW = {
    zoom: 12,
    longitude: 114.05,
    latitude: 22.55,
    pitch: 0,
    bearing: 0
};

export const CIRCLE_LAYER_OPTIONS = {
    paint: {
        'circle-radius': 3,
        'circle-color': '#ff6600'
    },
    filter: ['==', '$type', 'Point']
};

export const SYMBOL_LAYER_OPTIONS = {
    layout: {
        'text-field': ['get', 'name'],
        'text-size': 12,
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto'
    }
};

export const DEFAULT_LAYER_OPTIONS = {
    circle: CIRCLE_LAYER_OPTIONS,
    symbol: SYMBOL_LAYER_OPTIONS
};
