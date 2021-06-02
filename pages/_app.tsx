import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextComponentType } from 'next'
import { AppContext, AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import { StoreProvider, useStore } from '@/stores';
import "@/styles/globals.less";
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale/zh_CN';
import HeaderComp from "@/components/Layout/header";
import FooterComp from "@/components/Layout/footer";
import emitEv from '@/utils/events'
import Cookies from 'js-cookie';
import "./style.less";

type TAppProps = {
  a: string
  initial_redux_state?: any
}
type TProps = {
  [key in string]: string
}
export interface ModifiedAppInitialProps<TAppProps> {
  appProps: TAppProps
}

export interface ExtendedAppProps<TProps, TAppProps>
  extends AppProps<TProps>,
    ModifiedAppInitialProps<TAppProps> {}

const AppCom: NextComponentType<
  AppContext,
  ModifiedAppInitialProps<TAppProps>,
  ExtendedAppProps<TProps, TAppProps>
> = ({ Component, appProps, pageProps }) => {
  // redux store init state
  let router = useRouter()
  let { userStore } = useStore()
  let {getUserInfo, loginout} = userStore;

  let [isLogin, setIsLogin] = useState(false)
  let [userInfo, serUserInfo] = useState(null)
  

  useEffect(() => {
    const token = Cookies.get('token');
    if(token) {
      getUser()
    }
    emitEv.on('event-user-info', () => {
      getUser()
    })
    emitEv.on('event-user-logout', async () => {
      await loginout()
      Cookies.remove('token', { path: '/',domain: process.env.REACT_APP_BASE_DOMAIN });
      serUserInfo(null)
      setIsLogin(false)
      router.push('/')
    })
    return () => {
      emitEv.removeAllListeners('event-user-info')
      emitEv.removeAllListeners('event-user-logout')
    }
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop =0;
  }, []);

  let getUser = async() => {
    let info = await getUserInfo();
    if(info.mobile == '' || info.mobile == null || info.mobile == undefined){
      emitEv.emit('event-mobile-modal')
    }
    setIsLogin(true)
    serUserInfo(info)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <StoreProvider>
        <div className="warp-layout">
          <HeaderComp isLogin={isLogin} {...userInfo}/>
          <div className="warp-layout-content">
            <Component {...appProps} {...pageProps} />
          </div>
          <FooterComp />
        </div>
      </StoreProvider>
    </ConfigProvider>
  )
}

async function appGetInitialProps(): Promise<
  ModifiedAppInitialProps<TAppProps>
> {
  return {
    appProps: {
      initial_redux_state: {
        user: { nextUserId: 1 }
      },
      a: '134123'
    }
  }
}

AppCom.getInitialProps = appGetInitialProps

export default AppCom
