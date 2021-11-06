import { FileContent, InitialView } from "../types"

export const getInitialView = (data: FileContent): InitialView => {
    const [longitude, latitude] = data ? data['features'][0]['geometry']['coordinates'] : [114.05, 22.55]
    return {
        zoom: 12,
        longitude,
        latitude
    }
}