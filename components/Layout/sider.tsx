import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "./style.less";

const Sider: React.FC<any> = (): JSX.Element => {
  const router = useRouter()
  const nav = [
    {
      href: '/',
      name: '首页'
    },
    {
      href: '/author',
      name: '视频号搜索'
    },
    {
      href: '/rank',
      name: '视频号榜单'
    },
    {
      href: '/video',
      name: '热门视频'
    },
    {
      href: '/topic',
      name: '热门话题'
    },
    {
      href: '/live',
      name: '直播'
    }
  ]
  return (
    <div className="sider-menu">
      {
        nav.map((item: any, index: number) => <Link key={index} href={item.href} passHref><a className={`menu-item ${router.pathname === item.href ? 'active' : ''}`}>{item.name}</a></Link>)
      }
    </div>
  );
};
export default Sider;
