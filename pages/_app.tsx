import React, { useEffect } from 'react'
import { NextComponentType } from 'next'
import { AppContext, AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import "../styles/globals.less";
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale/zh_CN';
import "./style.less";

type TAppProps = {
  initial?: any
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
> = ({ Component, appProps }) => {


  useEffect(() => {

  },[])


  return (
    <ConfigProvider locale={zhCN}>
      <Component {...appProps} />
    </ConfigProvider>
  )
}

async function appGetInitialProps(): Promise<
  ModifiedAppInitialProps<TAppProps>
> {
  return {
    appProps: {
      initial: {
        user: { nextUserId: 1 }
      }
    }
  }
}

AppCom.getInitialProps = appGetInitialProps

export default AppCom
