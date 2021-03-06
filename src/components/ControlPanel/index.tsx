import React, { useContext } from 'react';
import { Switch } from 'antd';
import './style.scss';
import store from '../../store';
import { POINT_COLORS } from '../../utils/constants';

const ControlPanel = () => {
    const { state, dispatch } = useContext(store.Context);
    const { layerStatus } = state;
    // Sort the layer array according to the index property
    const layerArray = Object.keys(layerStatus).sort((a, b) => {
        return layerStatus[a].index - layerStatus[b].index;
    });
    const onChange = (checked: boolean, index: number) => {
        const layerName = layerArray[index];
        dispatch({ type: 'setClickedLayer', clickedLayer: layerName });
        dispatch({ type: 'setLayerStatus', layerStatus: { ...layerStatus, [layerName]: { index, checked } } });
    };
    return (
        <div className="layer-control-panel">
            <h2>图层管理</h2>
            {layerArray.length > 0 ? (
                layerArray.map((layer, index) => {
                    return (
                        <div key={layer} className="layer-container">
                            <span style={{ color: `${POINT_COLORS[index]}` }}>
                                图层{index + 1}: {layer}
                            </span>
                            <Switch
                                checked={layerStatus[layer]['checked']}
                                onChange={(checked) => onChange(checked, index)}
                            />
                        </div>
                    );
                })
            ) : (
                <div className="layer-empty">暂无图层</div>
            )}
        </div>
    );
};

export default ControlPanel;
