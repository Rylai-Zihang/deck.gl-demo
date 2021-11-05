// @ts-nocheck
import { Upload, Button } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';

export default function Uploader(props) {
    const { setFileContent, visibilityArray, setVisibilityArray, layerArray, setLayerArray } = props
    const options = {
        name: 'file',
        accept: ".geojson",
        showUploadList: false,
        beforeUpload(file) {
            if (layerArray.indexOf(file.name) > -1) return
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    setFileContent(JSON.parse(e.target.result));
                };
                reader.readAsText(file);
                setLayerArray([...layerArray, file.name]);
                setVisibilityArray([...visibilityArray, true]);
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
