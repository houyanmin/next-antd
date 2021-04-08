import React from "react";
import { NavLink } from "react-router-dom";
import "./style.less";

const MemberSider: React.FC<any> = (props:any): JSX.Element => {
  return (
    <div className="warp-member-lauoyt-sider">
      <div className="inner">
        <div className="sidle-title"><i className='iconfont icon-menu-user'></i> 个人中心</div>
        <div className="sidle-menu">
            <NavLink className="menu-item" activeClassName="active" exact={true} to="/member">个人信息</NavLink>
            {
              props?.isJoinTeam == 0 ? <NavLink className="menu-item" activeClassName="active" to="/member/child">子账号管理</NavLink> : null
            }
            <NavLink className="menu-item" activeClassName="active" to="/member/order">订单管理</NavLink>
            <NavLink className="menu-item" activeClassName="active" to="/member/pay">购买续费</NavLink>
        </div>
        <div className="sidle-title"><i className='iconfont icon-xiazai'></i> 导出管理</div>
        <div className="sidle-menu">
            <NavLink className="menu-item" activeClassName="active" to="/member/account">视频号导出</NavLink>
            <NavLink className="menu-item" activeClassName="active" to="/member/video">视频导出</NavLink>
        </div>
        <div className="sidle-title"><i className="iconfont icon-shoucang"></i>我的收藏</div>
        <div className="sidle-menu">
            <NavLink className="menu-item" activeClassName="active" exact={true} to="/member/collect">视频号收藏</NavLink>
            <NavLink className="menu-item" activeClassName="active" to="/member/collect/video">视频收藏</NavLink>
            <NavLink className="menu-item" activeClassName="active" to="/member/collect/topic">话题收藏</NavLink>
        </div>
      </div>
    </div>
  );
};
export default MemberSider;
