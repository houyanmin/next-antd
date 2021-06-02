
import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Cookies from 'js-cookie';
// import {useStore} from '@/stores';
import { Form, Select, Button, message, Spin } from 'antd';
import Link from "next/link";
import { useRouter } from 'next/router'
import { getQrcode } from '@/pages/api/user';
import emitEv from '@/utils/events';
import { getCosConfig } from '@/utils/util';
import Head from 'next/head'
import './login.module.less'


const FormItem = Form.Item
const Option = Select.Option

const Login: React.FC<any> = (props: any): JSX.Element => {
  let ws: WebSocket
  let qrcodeTimer: any = null; // 二维码计时

  // const { userStore } = useStore()

  const history = useRouter()
  const query:any = history.query;
  const { wsUrl, domain } = props.config;
  const [qrcode, setQrcode] = useState<any>('')
  const [past, setPast] = useState<boolean>(false) // 二维码过期

  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      history.push('/');
      message.warning('您已登录成功，请勿重复登录！')
    }

    return () => {
      if (ws) {
        ws.close()
      }
      if (qrcodeTimer) clearTimeout(qrcodeTimer)
      if (heartCheck.timeoutObj) clearInterval(heartCheck.timeoutObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (qrcodeTimer) clearTimeout(qrcodeTimer)
    if (heartCheck.timeoutObj) clearInterval(heartCheck.timeoutObj)
    getQrcodeFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getQrcodeFn = () => {
    setQrcode('')
    let params = {
      fetchAll: '*'
    }
    getQrcode(params).then((res: any) => {
      console.log(res)

        if (res.code == 200) {
          setPast(false)
          // 二维码5分钟后过期
          qrcodeTimer = setTimeout(() => {
            setPast(true)
          }, 1000 * 60 * 5)
          console.log(res)
          setQrcode(res.data.qrcode)
          createWebSocket(res)
          return;
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const createWebSocket = (res: any) => {
    console.log(wsUrl)
    ws = new WebSocket(wsUrl)
    init(res)
  }

  const init = (res: any) => {
    ws.onclose = function () {
      console.log('链接关闭')
    }
    ws.onerror = function () {
      console.log('发生异常了')
      // 关闭socket
      ws.close()
      // 清除
      if (heartCheck.timeoutObj) {
        clearInterval(heartCheck.timeoutObj)
      }
      // 清除二维码过期定时
      if (qrcodeTimer) clearTimeout(qrcodeTimer)
      setPast(true)
    }
    ws.onopen = function () {
      //心跳检测重置
      heartCheck.start(res)
    }
    ws.onmessage = function (event: any) {
      let { data } = event
      let resp: any = data !== 'Opened' ? JSON.parse(data) : null
      if (resp && resp.code == 200) {

        // 关闭socket
        ws.close()
        // 清除
        if (heartCheck.timeoutObj) {
          clearInterval(heartCheck.timeoutObj)
        }
        // 清除二维码过期定时
        if (qrcodeTimer) clearTimeout(qrcodeTimer)
        setPast(true)

        // token、expires存cookie
        let inFifteenMinutes = new Date(resp.data.expires * 1000)
        Cookies.set('token', resp.data.token ,{ 
          expires: inFifteenMinutes, 
          path: '/',
          domain: process.env.REACT_APP_BASE_DOMAIN
        });

        // isBindMobile存localStorage
        // 广播登录
        emitEv.emit('event-user-info')
        if(query.s && query.s == 1){
          history.push('/member/pay')
        } else {
          history.push('/')
        }
      }
    }
  }

  //心跳检测
  const heartCheck: any = {
    timeout: 2000, //每隔二秒发送心跳
    timeoutObj: null,
    start: function (res: any) {
      const _this = this
      if (this.timeoutObj) clearInterval(this.timeoutObj)
      this.timeoutObj = setInterval(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (ws.readyState == 3) {
          if (_this.timeoutObj) clearInterval(_this.timeoutObj)
          return
        }
        //onmessage拿到返回的心跳就说明连接正常
        ws.send(
          JSON.stringify({ code: res.headers.code, sign: res.headers.sign })
        ) // 心跳包
      }, this.timeout)
    }
  }

  const reagin = () => {
    getQrcodeFn()
  }

  return (
    <div className="layout-content-login" style={{ backgroundImage: `url(${domain}/shgj-client/resource/login-banner.jpg)` }}>
      <Head>
        <title>早蝶数据 - 视频号数据分析平台</title>
			  <meta name="description" content="早蝶数据支持微信视频号查找，多维度数据分析，热门视频、话题趋势追踪，热门榜单，挂链分析，视频监测，视频号直播数据分析等功能，助力视频号运营创作。" />
    		<meta name="keywords" content="早蝶,早蝶数据,视频号,视频号数据,视频号数据分析,视频号运营,视频号搜索,视频号监测,视频号直播,视频号点赞,视频10万赞,视频号直播带货,视频号变现,视频号榜单,视频号排行榜" />
      </Head>
      <div className="mask"></div>
      <div className="layout-content">
        <div className="container">
          <div className="title">微信扫码登录</div>
          <div className="qrcode-box">
            <Spin spinning={qrcode ? false : true}>
              <div className="qrcode">
                {qrcode && (
                  <img className="qrcode" src={qrcode} alt="早蝶指数" />
                )}
              </div>
            </Spin>
            {
              past
              &&
              <div className="btn-box">
                <div className="expire">
                  <div className="info">二维码已过期</div>
                  <Button type="primary" ghost onClick={reagin}>刷新二维码</Button>
                </div>
              </div>
            }
          </div>
          <div className="tips">打开<i className="iconfont icon-weixin"></i>扫一扫，关注公众号后即可登录/注册</div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (e) => {
  return {
    props: {
      config: {
        wsUrl: process.env.REACT_APP_BASE_SOCKET,
        ...getCosConfig() 
      }
    }
  }
}

export default Login