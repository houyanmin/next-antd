import React from "react";
import Link from "next/link";
import "./style.less";

const Sider: React.FC<any> = (): JSX.Element => {
  return (
    <div className="sider-menu">
      <Link href="/"><a className="menu-item">首页</a></Link>
      <Link href="/author"><a className="menu-item">视频号搜索</a></Link>
      <Link href="/rank"><a className="menu-item">视频号榜单</a></Link>
      <Link href="/video"><a className="menu-item">热门视频</a></Link>
      <Link href="/topic"><a className="menu-item">热门话题</a></Link>
      <Link href="/live"><a className="menu-item">直播</a></Link>
    </div>
  );
};
export default Sider;
