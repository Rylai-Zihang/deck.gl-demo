// @ts-nocheck
import { Upload, message, Button } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';




export default function Uploader(props) {
    const { setFileContent } = props
    const options = {
        name: 'file',
        accept: ".geojson",
        showUploadList: false,
        beforeUpload(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    setFileContent(JSON.parse(e.target.result));
                };
                reader.readAsText(file);
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
