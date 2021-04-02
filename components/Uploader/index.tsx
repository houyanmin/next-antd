import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd'
import { getCosConfig } from '../../utils/util'
import './index.less'

const COS = require('cos-js-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDGHA5j680YruhEUHIJ3WjHZbNt93gbB3f',
  SecretKey: 'VK3buynNgjbGk4C9qHSO4UhdJyYsvjGW'
})
const config = getCosConfig()
const dir = 'shgj-client/resource/'

const Uploader = (props: any) => {
  const [unique, setUnique] = useState<any>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 这里可以做上传之前的操作，比如文件大小的校验等
  const beforeUpload = (file: any, fileList: any) => {
    setUnique(new Date().getTime())
    return file
    // console.log(file, fileList);
    // return new Promise(resolve => {
    //   console.log('start check');
    //   setTimeout(() => {
    //     console.log('check finshed');
    //     resolve(file);
    //   }, 3000);
    // });
  }

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    multiple: false,
    accept: '.png, .jpg, .jpeg, .gif',
    action: '',
    beforeUpload: beforeUpload,
    // 这里需要指定文件上传的content-type
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    // 自定文件上传的方法，覆盖组件的 onChange 方法，可以定义上传不同阶段的行为（由 axios 默认提供）
    onStart(file: any) {
      console.log('onStart', file, file.name)
    },
    onSuccess(ret: any, file: any) {
      console.log('onSuccess', ret, file)

      let nameArr = file.name.split('.')
      let src = `${config.domain}${dir}${nameArr[0]}_${unique}.${
        nameArr[nameArr.length - 1]
      }`
      props.getData(src)
      setImageUrl(src)
    },
    onProgress({ percent }: any, file: any) {
      console.log('onProgress', `${percent}%`, file.name)
    },
    onError(err: any) {
      console.log('onError', err)
    },
    customRequest({
      action,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials
    }: any) {
      // 使用 FileReader 将上传的文件转换成二进制流，满足 'application/octet-stream' 格式的要求
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      let fileData = null
      reader.onload = (e: any) => {
        fileData = e.target.result
        let nameArr = file.name.split('.')
        let key = `${dir}${nameArr[0]}_${unique}.${nameArr[nameArr.length - 1]}`
        cos.putObject(
          {
            Bucket: config.bucket,
            Region: 'ap-guangzhou',
            Key: key,
            Body: fileData, // 上传文件对象
            onTaskReady: function(taskId: any) {
              // TaskId = taskId
            },
            onProgress: function(info: any) {
              // 进行上传进度输出，更加直观
              onProgress({ percent: info.percent }, file)
            }
          },
          (err: any, data: any) => {
            if (err && err.error) {
              message.error(`上传失败 statusCode${err.statusCode ? err.statusCode : ''}`)
              onError(err, file)
            } else {
              onSuccess(data, file)
            }
          }
        )
      }
    }
  }

  const remove = () => {
    setImageUrl('')
    props.getData('')
  }

  return (
    <div className="_renderer_components_uploader">
        {imageUrl ? (
          <>
            <span
              className="iconfont icon-circle-remove"
              onClick={remove}
            ></span>
            <img className="img" src={imageUrl} alt="二维码" />
          </>
        ) : (
          <Upload {...uploadProps}>
            <div className="uploader">
              <i className="iconfont icon-jia" style={{ fontSize: 40, color: 'rgba(0, 0, 0, 0.3)' }}></i>
              <div style={{ marginTop: 20, color: 'rgba(0, 0, 0, 0.5)' }}>上传</div>
            </div>
          </Upload>
        )}
    </div>
  )
}

export default Uploader
