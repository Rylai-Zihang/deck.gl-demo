import React, { useContext } from "react"
import { Switch } from "antd"
import "./style.scss"
import store from '../../store'
import { POINT_COLORS } from '../../utils/constants'

const ControlPanel = () => {
    const { state, dispatch } = useContext(store.Context)
    const { layerArray, visibilityArray } = state
    const onChange = (checked: boolean, index: number) => {
        dispatch({ type: "setClickedLayer", clickedLayer: { index, checked } })
    }
    return (
        <div className="layer-control-panel">
            <h2>图层管理</h2>
            {layerArray.length > 0 ? layerArray.map((layer, index) => {
                return <div key={layer} className="layer-container">
                    <span style={{ color: `${POINT_COLORS[index]}` }}>图层{index + 1}: {layer}</span>
                    <Switch checked={visibilityArray[index]} onChange={(checked) => onChange(checked, index)} />
                </div>
            }) : <div className="layer-empty">暂无图层</div>}
        </div >
    )
}

export default ControlPanel
