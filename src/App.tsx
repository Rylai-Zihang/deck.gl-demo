import React from "react"
import { useReducer } from "react"

import Map from './components/Map'
import ControlPanel from './components/ControlPanel'
import Uploader from './components/Upload'

import ss from "./store"

export default function App() {
    const { reducer, store, Context } = ss
    const [state, dispatch] = useReducer(reducer, store)
    const api = { state, dispatch }

    return (
        <Context.Provider value={api}>
            <Map></Map>
            <ControlPanel></ControlPanel>
            <Uploader></Uploader>
        </Context.Provider>

    )
}