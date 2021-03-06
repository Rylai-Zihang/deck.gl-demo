import { GeoData, InitialView, LayerOptions, LayerType } from '../types';
import _ from 'lodash';
import { DEFAULT_INITIAL_VIEW, DEFAULT_LAYER_OPTIONS } from './constants';

export const getInitialView = (data: GeoData): InitialView => {
    const [longitude, latitude] = data['features'][0]['geometry']['coordinates'];
    return { ...DEFAULT_INITIAL_VIEW, longitude, latitude };
};

export function getLayerOptions(options: LayerOptions): LayerOptions {
    const { type } = options;
    const typeLayerOptions = DEFAULT_LAYER_OPTIONS[type];
    const finalOptions = _.merge(typeLayerOptions, options);
    return finalOptions;
}
