import React, { useEffect } from 'react';
import { useHistory, Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import Cookies from 'js-cookie';
import { useStore } from '@/stores';
import { memberRoute } from '@/router/routes';
import { routeTypes } from "@/interfaces/routes";
import MemberSider from '@/components/Layout/member-sider';

import NotFound from "@/views/NotFound";

import './member.less';
import { message } from 'antd';

const MemberLayout:React.FC<any> = (props:any):JSX.Element => {
    let history = useHistory();
    let { userStore } = useStore();
    const { userInfo } = userStore;

    useEffect(() => {
		const token = Cookies.get('token');
		if(token) {
			// if(userInfo){
			// 	// serUserLevel(userInfo?.teamInfo?.level)
			// } else {
            //     message.warning('您还没有登录，请先登录')
            //     loginout()
            //     Cookies.remove('token', { path: '/',domain: process.env.REACT_APP_BASE_DOMAIN });
			// 	history.push('/login')
			// }
		} else {
            message.warning('您还没有登录，请先登录')
            history.push('/login')
		}
	},[userInfo])

    return <div className="warp-member-lauoyt layout-content" style={{padding:"30px 20px"}}>
        <MemberSider {...userInfo}/>
        <div className="warp-member-lauoyt-content">
            <Switch>
                {
                    memberRoute.map((item:routeTypes, index: number) => {
                        return <Route key={index} path={item.path} render={(props:RouteComponentProps) => {
                            const Component: any = item.component
                            return <Component {...props} route={item} />
                        }}></Route>
                    })
                }
                <Route component={NotFound} />
            </Switch>
        </div>
    </div>
}

export default withRouter(React.memo(MemberLayout));