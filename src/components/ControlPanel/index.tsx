
import * as React from 'react';
import { useContext } from 'react';
import { Switch } from 'antd';
import "./style.scss";
import store from '../../store';

const ControlPanel = () => {
    const { state, dispatch } = useContext(store.Context);
    const { layerArray, visibilityArray } = state
    const onChange = (checked: boolean, index: number) => {
        dispatch({ type: "setClickedLayer", clickedLayer: { index, checked } })
    }
    return (
        <div className="control-panel">
            <h2>图层管理</h2>
            {layerArray?.map((layer, index) => {
                return <div key={layer} className="layer-container">
                    <span>图层{index + 1}: {layer}</span>
                    <Switch checked={visibilityArray[index]} onChange={(checked) => onChange(checked, index)} />
                </div>
            })}
        </div>
    )
}

export default ControlPanel
