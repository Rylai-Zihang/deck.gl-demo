
import * as React from 'react';
import { Switch } from 'antd';
import "./style.scss";
import { ClickedLayer } from '../../utils/types';


interface Props {
    layerArray: string[],
    visibilityArray: boolean[],
    setClickedLayer: (clickedLayer: ClickedLayer) => void
}

const ControlPanel = (props: Props) => {
    const { layerArray, visibilityArray, setClickedLayer } = props
    const onChange = (checked: boolean, index: number) => {
        setClickedLayer({ index, checked })
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
