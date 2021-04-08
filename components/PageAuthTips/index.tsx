import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.less';

const PageAuthTips:React.FC<any> = (props):JSX.Element => {
    let history = useHistory()
    let handleClick = (type:number) => {
        if(type == 1){
            history.push('/login?s=1')
        } else {
            history.push('/member/pay')
        }
    }
    // <!-- 首页 type-1:2000，500，200，20 -->
    // <!-- 榜单 type-2:500，200，100，20 -->
    // <!-- 视频 type-1:2000，500，200，20 -->
    // <!-- 话题 type-2:500，200，100，20 -->
    // <!-- 话题详情 type-2:500，200，100，20 -->
    return <div className="page-auth-tips">
        {props.level == -1 ? (<><div className="auth-tips">您当前未登录，仅显示20条数据</div><div className="auth-btn" onClick={() => handleClick(1)}>升级会员</div></>) : null}
        {props.level == 0 ? (<><div className="auth-tips">您当前是 免费版 仅显示20条数据，升级会员查看更多</div><div className="auth-btn" onClick={() => handleClick(2)}>升级会员</div></>) : null}
        {props.level == 1 ? (<><div className="auth-tips">您当前是 高级版 仅显示{props.type == 1?'200':'100'}条数据，升级会员查看更多</div><div className="auth-btn" onClick={() => handleClick(2)}>升级会员</div></>) : null}
        {props.level == 2 ? (<><div className="auth-tips">您当前是 专业版 仅显示{props.type == 1?'500':'200'}条数据，升级会员查看更多</div><div className="auth-btn" onClick={() => handleClick(2)}>升级会员</div></>) : null}
    </div>
}

export default PageAuthTips;