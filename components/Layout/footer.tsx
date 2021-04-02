import React from 'react';

const Footer:React.FC<any> = (props:any):JSX.Element => {
    return <div className="warp-layout-footer">
        <div className="footer">
            {/* <ul className="nav">
                <li>
                    <div className="nav-title">关于我们</div>
                    <div className="nav-menu">
                        <Link to="">关于我们</Link>
                        <Link to="">联系我们</Link>
                    </div>
                </li>
                <li>
                    <div className="nav-title">更多产品</div>
                    <div className="nav-menu">
                        <a className="header-shgj" rel="noopener noreferrer" href="https://shgj.khtuan.com" target="_blank">视号管家</a>
                    </div>
                </li>
            </ul> */}
            <div className="qrcode">
                <div className="qrcode-warp">
                    <div className="qrcode-img"><img src="https://static.zaodie.com/image/wxgzh.jpeg" alt=""/></div>
                    <div className="qrcode-tips">关注公众号</div>
                </div>
                <div className="qrcode-warp">
                    <div className="qrcode-img"><img src="https://static.zaodie.com/image/kefu.jpeg" alt=""/></div>
                    <div className="qrcode-tips">客服微信</div>
                </div>
            </div>
        </div>
        <div className="copyright">Copyright ©2021 杭州斗草科技有限公司 All Rights Reserved <a target="_blank" href="https://beian.miit.gov.cn">浙ICP备19041476号-5</a></div>
    </div>
}

export default Footer;