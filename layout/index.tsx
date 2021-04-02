import React, { useEffect, useState } from "react";
import { Switch, Route, RouteComponentProps, withRouter, useHistory, useLocation} from "react-router-dom";
import Cookies from 'js-cookie';
import emitEv from '@/utils/events'
import { useStore } from '@/stores';
import { pageRoute } from "@/router/routes";
import { routeTypes } from "@/interfaces/routes";
import HeaderComp from "@/components/Layout/header";
import FooterComp from "@/components/Layout/footer";
import MobileModal from '@/components/MobileModal';
import NotFound from "@/views/NotFound";

import "./style.less";

const Home = (props: RouteComponentProps) => {
  let history = useHistory();
  let location = useLocation();
  let { userStore } = useStore();
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
      history.push('/')
    })
    return () => {
      emitEv.removeAllListeners('event-user-info')
      emitEv.removeAllListeners('event-user-logout')
    }
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop =0;
  }, [location]);

  let getUser = async() => {
    let info = await getUserInfo();
    if(info.mobile == '' || info.mobile == null || info.mobile == undefined){
      emitEv.emit('event-mobile-modal')
    }
    setIsLogin(true)
    serUserInfo(info)
  }

  return (
    <div className="warp-layout">
      <HeaderComp isLogin={isLogin} {...userInfo}/>
      <div className="warp-layout-content">
          <Switch>
            {pageRoute.map((item: routeTypes, index: number) => {
              return (
                <Route key={index} path={item.path}
                  render={(props: RouteComponentProps) => {
                    const Component: any = item.component;
                    if(item?.meta?.isAuth){
                      if(userInfo){
                        return <Component {...props} route={item} />;
                      } else {
                        return null
                      }
                    } else {
                      return <Component {...props} route={item} />;
                    }
                  }}
                ></Route>
              );
            })}

            {/* {getPermissionRoutes(Routes[0].children as routeTypes[])} */}
            <Route component={NotFound} />
          </Switch>
      </div>
      <FooterComp />
      <MobileModal />
    </div>
  );
};

export default withRouter(Home);
