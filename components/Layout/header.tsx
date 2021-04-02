import React, {useEffect } from 'react';
// import emitEv from '@/utils/events';
import { Avatar, Popover, Button, Divider } from 'antd';
import { useHistory, NavLink } from 'react-router-dom';

import NavMenu from './sider';

import './style.less'

const Header: React.FC<any> = (props: any): JSX.Element => {
	let history = useHistory();
	let {isLogin = false} = props;
	let onLogoTag = () => {
		history.push('/')
	}

	useEffect(() => {
	},[props])

	let handleNavLogin = () => {
		history.push('/login')
	}
	let handleLogout = () => {
		// emitEv.emit('event-user-logout')
	}

	const content = (
		<div className="header-popover">
			<div className="popover-nikename"><Avatar src={props?.avatar_url} /> {props?.nickname}</div>
			<div className="popover-level">
				{props?.teamInfo?.level == 3 ? '企业版' : props?.teamInfo?.level == 2 ? '专业版' : props?.teamInfo?.level == 1 ? '高级版' : '免费版'}
				{props?.teamInfo?.level == 3 ? (<NavLink to="/member/pay">续费</NavLink>) : null}
				{props?.teamInfo?.level == 2 ? (<NavLink to="/member/pay">立即升级</NavLink>) : null}
				{props?.teamInfo?.level == 1 ? (<NavLink to="/member/pay">立即升级</NavLink>) : null}
				{props?.teamInfo?.level == 0 ? (<NavLink to="/member/pay">开通会员</NavLink>) : null}
			</div>
			<div className="popover-nav">
				<div className="nav-warp">
					<i className="iconfont icon-shoucang"></i>
					<div className="nav-flex">
						<NavLink className="nav-item" to="/member/collect">视频号收藏</NavLink>
						<NavLink className="nav-item" to="/member/collect/video">视频收藏</NavLink>
					</div>
				</div>
				<div className="nav-warp separate">
					<div className="nav-flex" style={{ paddingLeft: 28 }}>
						<NavLink className="nav-item" to="/member/collect/topic">话题收藏</NavLink>
					</div>
				</div>
				<div className="nav-warp">
					<i className="iconfont icon-geren"></i>
					<div className="nav-flex">
						<NavLink className="nav-item" to="/member">个人中心</NavLink>
						<NavLink className="nav-item" to="/member/order">我的订单</NavLink>
					</div>
				</div>
				{props?.isJoinTeam == 0 ?<div className="nav-warp separate">
					<div className="nav-flex" style={{ paddingLeft: 28 }}>
						<NavLink className="nav-item" to="/member/child">子账号管理</NavLink> 
					</div>
				</div>: null}
			</div>
			<div className="popover-logout" onClick={handleLogout}>退出登录</div>
		</div>
	);

	let helpContent =<div style={{textAlign: 'center'}}>
        <img style={{width: '160px',height:'160px'}} src="https://static.zaodie.com/image/kefu.jpeg" alt=""/>
    </div>

	return (
		<div className="warp-layout-header">
			<div className="layout-content flex flex-item-conter">
				<div className="header-logo" onClick={onLogoTag}>
					<img src="https://static.zaodie.com/image/logo.png" alt="" /><span>早蝶数据</span>
				</div>
				<NavMenu />
				<Popover content={helpContent} title="联系客服">
					<i className="header-kefu iconfont icon-kefu"></i>
                </Popover>
				<Divider type="vertical" />
				{isLogin ? <>
					<div className={`header-level level-${props?.teamInfo?.level}`} onClick={() => history.push('/member/pay')}>
						{props?.teamInfo?.level == 0 ? '免费版' : null}
						{props?.teamInfo?.level == 1 ? '高级版' : null}
						{props?.teamInfo?.level == 2 ? '专业版' : null}
						{props?.teamInfo?.level == 3 ? '企业版' : null}
					</div>
					<div className="header-user">
						<Popover content={content} placement="bottomRight">
							<Avatar src={props?.avatar_url} />
							<span className="nikename text-ellipsis">{props?.nickname}</span>
							<i className="iconfont icon-xiala"></i>
						</Popover>
					</div>
				</> : 
					<Button className="hander-login" type="primary" onClick={handleNavLogin}>
						登录 / 注册
					</Button>
				}
			</div>
		</div>
	);
};

export default Header;