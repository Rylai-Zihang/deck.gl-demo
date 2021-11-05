
import * as React from 'react';
import { Switch } from 'antd';
import "./style.scss";

interface Props {
    layerArray: string[],
    visibilityArray: boolean[],
    setVisibilityArray: (newArray: boolean[]) => {}
}

const ControlPanel = (props: Props) => {
    const { layerArray, visibilityArray, setVisibilityArray } = props
    const onChange = (checked: boolean, index: number) => {
        const newArray = [...visibilityArray]
        newArray.splice(index, 1, checked)
        setVisibilityArray(newArray)
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
