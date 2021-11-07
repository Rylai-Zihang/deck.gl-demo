import { GeoData, InitialView } from '../types'
import { DEFAULT_INITIAL_VIEW } from './constants'

export const getInitialView = (data: GeoData): InitialView => {
    const [longitude, latitude] = data['features'][0]['geometry']['coordinates']
    return { ...DEFAULT_INITIAL_VIEW, longitude, latitude }
}
