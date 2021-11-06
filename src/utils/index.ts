import { GeoData, InitialView } from "../types"

export const getInitialView = (data: GeoData): InitialView => {
    const [longitude, latitude] = data['features'][0]['geometry']['coordinates']
    return {
        zoom: 12,
        longitude,
        latitude
    }
}