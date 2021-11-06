import React from "react"
import { useReducer } from "react"

import Map from './components/Map'
import ControlPanel from './components/ControlPanel'
import Upload from './components/Upload'

import myStore from "./store"

export default function App() {
    const { reducer, store, Context } = myStore
    const [state, dispatch] = useReducer(reducer, store)
    const api = { state, dispatch }

    return (
        <Context.Provider value={api}>
            <Map></Map>
            <ControlPanel></ControlPanel>
            <Upload></Upload>
        </Context.Provider>

    )
}