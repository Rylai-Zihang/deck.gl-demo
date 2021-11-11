import React, { useContext } from 'react';
import { Upload, Button, message, UploadProps } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import store from '../../store';

export default function Uploader() {
    const { state, dispatch } = useContext(store.Context);
    const { layerStatus } = state;
    const layerArray = Object.keys(layerStatus);
    const options: UploadProps = {
        name: 'file',
        accept: '.geojson',
        showUploadList: false,
        beforeUpload(file) {
            const fileName = file.name;
            if (layerArray.indexOf(fileName) > -1) {
                message.warning('该图层已存在哦');
                return;
            }
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result;
                    let fileContent = JSON.parse(result as string);
                    dispatch({ type: 'setFileContent', fileContent });
                };
                reader.readAsText(file);
                dispatch({
                    type: 'setLayerStatus',
                    layerStatus: {
                        ...layerStatus,
                        [fileName]: {
                            checked: true,
                            index: layerArray.length
                        }
                    }
                });
                // Prevent upload
                return false;
            });
        }
    };
    return (
        <Upload {...options}>
            <Button icon={<UploadOutlined />}>添加图层</Button>
        </Upload>
    );
}
