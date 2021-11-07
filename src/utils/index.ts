import { GeoData, InitialView, LayerOptions, LayerType } from '../types';
import _ from 'lodash';
import { DEFAULT_INITIAL_VIEW, DEFAULT_LAYER_OPTIONS } from './constants';

export const getInitialView = (data: GeoData): InitialView => {
    const [longitude, latitude] = data['features'][0]['geometry']['coordinates'];
    return { ...DEFAULT_INITIAL_VIEW, longitude, latitude };
};

export const getLayerOptions = (id: string, type: LayerType, source: string, options?: LayerOptions): LayerOptions => {
    const basicOptions = { id, type, source };
    const typeLayerOptions: LayerOptions = DEFAULT_LAYER_OPTIONS[type];
    const basicCircleOptions = { ...basicOptions, ...typeLayerOptions };
    const finalOptions = _.merge(basicCircleOptions, options);
    return finalOptions;
};
