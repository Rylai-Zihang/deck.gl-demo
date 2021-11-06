import React, { useContext } from "react"
import { Upload, Button, UploadProps } from "antd"
import "antd/dist/antd.css"
import { UploadOutlined } from '@ant-design/icons'
import store from '../../store'

export default function Uploader() {
    const { state, dispatch } = useContext(store.Context)
    const { visibilityArray, layerArray } = state
    const options: UploadProps = {
        name: 'file',
        accept: ".geojson",
        showUploadList: false,
        beforeUpload(file) {
            if(layerArray.indexOf(file.name) > -1) return
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const result = e.target?.result
                    let fileContent = JSON.parse((result as string))
                    dispatch({ type: "setFileContent", fileContent })
                }
                reader.readAsText(file)
                dispatch({ type: "setLayerArray", layerArray: [...layerArray, file.name] })
                dispatch({ type: "setVisibilityArray", visibilityArray: [...visibilityArray, true] })
                // Prevent upload
                return false
            })
        }
    }
    return (
        <Upload {...options}>
            <Button icon={<UploadOutlined />}>添加图层</Button>
        </Upload>
    )
}
