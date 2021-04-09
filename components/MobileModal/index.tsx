import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Modal } from "antd";
import emitEv from '@/utils/events'
import { postAuth, getVerify } from '@/pages/api/user'
import './style.less'

var rockon: any;

const MobileModal: React.FC<any> = (): JSX.Element => {
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(false);
  const [rockonTime, setRockonTime] = useState(0);
  let [btnLoad, setBtnLoad] = useState(false)

  useEffect(() => {
    emitEv.on('event-mobile-modal', () => {
      setIsShow(true)
    })
    return () => {
      emitEv.removeAllListeners('event-mobile-modal')
    }
  },[])

  const onFinish = (v: any) => {
    setBtnLoad(true)
    postAuth(v).then((res: any) => {
      setBtnLoad(false)
      if (res.code == 200) {
        emitEv.emit('event-user-info')
        setIsShow(false)
        return
      }
      message.error(res.message)
    })
  }

  const rockonFn = () => {
    let t = 60
    setRockonTime(t)
    rockon = setInterval(() => {
      if (t < 1) {
        clearInterval(rockon)
      }

      setRockonTime(--t)
    }, 1000)
  }

  const getAuthCode = () => {
    if (rockonTime > 1) return
    form.validateFields(['mobile']).then((r: any) => {
        getVerify(r.mobile).then((res: any) => {
          if (res.code == 200) {
            // 计时1分钟
            rockonFn()
            return
          }
          message.error(res.message)
        })
      })
      .catch(() => { })
  }

  const mobileChange = () => {
    if (rockon) clearInterval(rockon)
    setRockonTime(0)
    form.setFieldsValue({ code: undefined })
  }

  return <Modal wrapClassName='mobile-modal' centered visible={isShow} footer={null} closable={false} maskClosable={false} width={360}>
    <div className="mobile-modal-title">请完善手机号码</div>
    <Form form={form} onFinish={onFinish}>
        <Form.Item name="mobile" validateTrigger={["onBlur"]}
          rules={[
            {required: true,message: "请填写手机号",},
            {required: false,pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),message: "请填写正确的手机号",},
          ]}
        >
          <Input size="large" maxLength={11} addonBefore="手机号码 +86" placeholder="请填写手机号码" onChange={mobileChange}/>
        </Form.Item>
        <Form.Item name="code" rules={[{ required: true, message: "请填写短信验证码!" }]}>
          <Input size="large" maxLength={6} addonAfter={
              <div style={{cursor: 'pointer'}} onClick={getAuthCode}>
                {rockonTime < 1 ? "获取验证码" : rockonTime + "秒后再获取"}
              </div>
            }
            placeholder="请填写短信验证码"
          />
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Button type="primary" htmlType="submit" loading={btnLoad} style={{ width: "100%", height: 40 }}>确 定</Button>
        </Form.Item>
      </Form>
  </Modal>
}

export default MobileModal;