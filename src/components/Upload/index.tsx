// @ts-nocheck
import * as React from 'react';
import { useContext } from 'react';
import { Upload, Button } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import store from '../../store';

export default function Uploader() {
    const { state, dispatch } = useContext(store.Context);
    const { visibilityArray, layerArray } = state
    const options = {
        name: 'file',
        accept: ".geojson",
        showUploadList: false,
        beforeUpload(file) {
            if (layerArray.indexOf(file.name) > -1) return
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    dispatch({ type: "setFileContent", fileContent: JSON.parse(e.target.result) });
                };
                reader.readAsText(file);
                dispatch({ type: "setLayerArray", layerArray: [...layerArray, file.name] });
                dispatch({ type: "setVisibilityArray", visibilityArray: [...visibilityArray, true] });
                // Prevent upload
                return false;
            });
        }
    };
    return (
        <Upload {...options}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    )
}
