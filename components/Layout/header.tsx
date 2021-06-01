import React, {useEffect } from 'react';
// import emitEv from '@/utils/events';
import { Avatar, Popover, Button, Divider } from 'antd';
import Link from "next/link";
import { useRouter } from 'next/router'
import NavMenu from './sider';
import './style.less'

const Header: React.FC<any> = (props: any): JSX.Element => {
	let router = useRouter();
	let {isLogin = false} = props;
	let onLogoTag = () => {
		router.push('/')
	}

	useEffect(() => {
	},[props])

	let handleNavLogin = () => {
		router.push('/login')
	}
	let handleLogout = () => {
		// emitEv.emit('event-user-logout')
	}

	const content = (
		<div className="header-popover">
			<div className="popover-nikename"><Avatar src={props?.avatar_url} /> {props?.nickname}</div>
			<div className="popover-level">
				{props?.teamInfo?.level == 3 ? '企业版' : props?.teamInfo?.level == 2 ? '专业版' : props?.teamInfo?.level == 1 ? '高级版' : '免费版'}
				{props?.teamInfo?.level == 3 ? (<Link href="/member/pay">续费</Link>) : null}
				{props?.teamInfo?.level == 2 ? (<Link href="/member/pay">立即升级</Link>) : null}
				{props?.teamInfo?.level == 1 ? (<Link href="/member/pay">立即升级</Link>) : null}
				{props?.teamInfo?.level == 0 ? (<Link href="/member/pay">开通会员</Link>) : null}
			</div>
			<div className="popover-nav">
				<div className="nav-warp">
					<i className="iconfont icon-shoucang"></i>
					<div className="nav-flex">
						<Link href="/member/collect" passHref><a className="nav-item">视频号收藏</a></Link>
						<Link href="/member/collect/video" passHref><a className="nav-item">视频收藏</a></Link>
					</div>
				</div>
				<div className="nav-warp separate">
					<div className="nav-flex" style={{ paddingLeft: 28 }}>
						<Link href="/member/collect/topic" passHref><a className="nav-item">话题收藏</a></Link>
					</div>
				</div>
				<div className="nav-warp">
					<i className="iconfont icon-geren"></i>
					<div className="nav-flex">
						<Link href="/member" passHref><a className="nav-item">个人中心</a></Link>
						<Link href="/member/order" passHref><a className="nav-item">我的订单</a></Link>
					</div>
				</div>
				{props?.isJoinTeam == 0 ?<div className="nav-warp separate">
					<div className="nav-flex" style={{ paddingLeft: 28 }}>
						<Link href="/member/child" passHref><a className="nav-item">子账号管理</a></Link> 
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
					<div className={`header-level level-${props?.teamInfo?.level}`} onClick={() => router.push('/member/pay')}>
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