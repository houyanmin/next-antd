import React from "react";
import { GetStaticProps } from 'next'
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import PageSearch from "@/components/PageSearch/index";
import Link from "next/link";
import Head from 'next/head'
import { getList as rankLink } from '@/pages/api/rank'
import { getList as videoLink } from '@/pages/api/video';
import { getTopicList } from '@/pages/api/topic';
import moment from 'moment'
import './Home.less'

const Home: React.FC<any> = (props: any): JSX.Element => {
	const { net = [], science = [], publicity = [], video = [], topic = [] } = props.data;
  	return (
		<div className="page-home">
			<Head>
				<title>早蝶数据 - 视频号数据分析平台</title>
				<meta name="description" content="早蝶数据支持微信视频号查找，多维度数据分析，热门视频、话题趋势追踪，热门榜单，挂链分析，视频监测，视频号直播数据分析等功能，助力视频号运营创作。" />
				<meta name="keywords" content="早蝶,早蝶数据,视频号,视频号数据,视频号数据分析,视频号运营,视频号搜索,视频号监测,视频号直播,视频号点赞,视频10万赞,视频号直播带货,视频号变现,视频号榜单,视频号排行榜" />
			</Head>
			<div className="banner-box">
				<div className="banner-content">
					<div className="title">视频号数据分析平台</div>
					<div className="desc">早蝶数据 · 让视频号运营管理更简单</div>
					<PageSearch class="index-search" page="index" />
				</div>
				<div className="fix-box">
					<div className="item">
						<span className="icon-img i-target"></span>
						<div className="info">视频号搜索 精准查找</div>
					</div>
					<div className="item">
						<span className="icon-img i-data"></span>
						<div className="info">视频号各项榜单排名</div>
					</div>
					<div className="item">
						<span className="icon-img i-hot"></span>
						<div className="info">热门视频&话题</div>
					</div>
					<div className="item">
						<span className="icon-img i-fenxi"></span>
						<div className="info">直播数据监控分析</div>
					</div>
				</div>
			</div>
			<div className="layout-content">
				<div className="circle"></div>
				<div className="circle2"></div>
				{/* <div className="rect"></div> */}
				<div className="rect2"></div>
				<div className="rect3"></div>
				<div className="content">
					<div className="rank">
						<div className="rank-center">
							<span className="icon-img i-rank"></span>
							<div className="desc-title">视频号榜单</div>
						</div>
					</div>
					<div className="category">
						<div className="item">
							<div className="item-tit">
								<div className="txt">互联网</div>
								<Link href="/rank" passHref><a className="more">查看更多<RightOutlined /></a></Link>
							</div>
							<div className="item-con">
								<table>
									<thead>
										<tr>
											<th>排名</th>
											<th>视频号</th>
											<th>新增点赞</th>
											<th>早蝶指数</th>
										</tr>
									</thead>
									<tbody>
										{
											net.map((item:any, index:number)=>{
												return <tr key={index}>
													<td>
														{
															index == 0
															?
															<span className="icon-rank-numer rank1">{ index + 1 }</span>
															:
															index == 1
															?
															<span className="icon-rank-numer rank2">{ index + 1 }</span>
															:
															index == 2
															?
															<span className="icon-rank-numer rank3">{ index + 1 }</span>
															:
															<span className="icon-rank-numer rank-other">{ index + 1 }</span>
														}
													</td>
													<td>
														<div className="img-txt">
															<img src={item.head_url} />
															<div>{item.nickname}</div>
														</div>
													</td>
													<td>{item.like}</td>
													<td>{item.combined_index}</td>
												</tr>
											})
										}
									</tbody>
								</table>
							</div>
						</div>
						<div className="item">
							<div className="item-tit">
								<div className="txt">科技</div>
								<Link href="/rank" passHref><a className="more">查看更多<RightOutlined /></a></Link>
							</div>
							<div className="item-con">
								<table>
									<thead>
										<tr>
											<th>排名</th>
											<th>视频号</th>
											<th>新增点赞</th>
											<th>早蝶指数</th>
										</tr>
									</thead>
									<tbody>
										{
											science.map((item:any, index:number)=>{
												return <tr key={index}>
													<td>
														{
															index == 0
															?
															<span className="icon-rank-numer rank1">{ index + 1 }</span>
															:
															index == 1
															?
															<span className="icon-rank-numer rank2">{ index + 1 }</span>
															:
															index == 2
															?
															<span className="icon-rank-numer rank3">{ index + 1 }</span>
															:
															<span className="icon-rank-numer rank-other">{ index + 1 }</span>
														}
													</td>
													<td>
														<div className="img-txt">
															<img src={item.head_url} />
															<div>{item.nickname}</div>
														</div>
													</td>
													<td>{item.like}</td>
													<td>{item.combined_index}</td>
												</tr>
											})
										}
									</tbody>
								</table>
							</div>
						</div>
						<div className="item">
							<div className="item-tit">
								<div className="txt">科普</div>
								<Link href="/rank" passHref><a className="more">查看更多<RightOutlined /></a></Link>
							</div>
							<div className="item-con">
								<table>
									<thead>
										<tr>
											<th>排名</th>
											<th>视频号</th>
											<th>新增点赞</th>
											<th>早蝶指数</th>
										</tr>
									</thead>
									<tbody>
										{
											publicity.map((item:any, index:number)=>{
												return <tr key={index}>
													<td>
														{
															index == 0
															?
															<span className="icon-rank-numer rank1">{ index + 1 }</span>
															:
															index == 1
															?
															<span className="icon-rank-numer rank2">{ index + 1 }</span>
															:
															index == 2
															?
															<span className="icon-rank-numer rank3">{ index + 1 }</span>
															:
															<span className="icon-rank-numer rank-other">{ index + 1 }</span>
														}
													</td>
													<td>
														<div className="img-txt">
															<img src={item.head_url} />
															<div>{item.nickname}</div>
														</div>
													</td>
													<td>{item.like}</td>
													<td>{item.combined_index}</td>
												</tr>
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="hot-box">
						<div className="hot-video-box">
							<div className="hot-item-tit">
								<div className="txt">热门视频</div>
								<Link href="/video" passHref><a className="more">查看更多<RightOutlined /></a></Link>
							</div>
							<div className="hot-item-con">
								{
									video.map((item:any,index:number) => {
										return <div className="hot-img-txt" key={index}>
											<img className="cover" src={item.thumb_url} />
											<div className="wrap">
												<div className="text-ellipsis">{item.intro}</div>
												<div className="img-txt">
													<img src={item.head_url} />
													<div>{item.nickname}</div>
												</div>
												<div className="about">
													{item.posted_at} <span className="r-con"><HeartTwoTone twoToneColor="#eb2f96" /> {item.like_num}</span>
												</div>
											</div>
										</div>
									})
								}
							</div>
						</div>
						<div className="hot-topic-box">
						<div className="hot-item-tit">
								<div className="txt">热门话题</div>
								<Link href="/topic" passHref><a className="more">查看更多<RightOutlined /></a></Link>
							</div>
							<div className="hot-item-con">
								<table>
									<thead>
										<tr>
											<th>话题</th>
											<th>参与视频号数</th>
											<th>参与作品数</th>
											<th>总点赞数</th>
										</tr>
									</thead>
									<tbody>
										{
											topic.map((item:any,index:number)=>{
												return <tr key={index}>
													<td><div className="flex-icon-txt"><span className="iconfont icon-huati1"></span><div className="text-ellipsis">{ item.name }</div></div></td>
													<td><div>{item.channel_count}</div></td>
													<td><div>{item.feed_count}</div></td>
													<td><div><HeartTwoTone twoToneColor="#eb2f96" /> {item.like_count}</div></td>
												</tr>
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="part1">
						<div className="s_triangle"></div>
						<div className="triangle"></div>
						<div className="deep_triangle"></div>
						<div className="l-con">
							<div className="tit">
								<div className="watermark">01</div>
								多维度、科学化数据分析
							</div>
							<div className="wrap">
								<div className="item">
									<div className="item-tit">基于行业分类细分全网最热最优博主</div>
									<div className="item-desc">让你充分了解所处领域竞争力，及时发现优质潜力达人</div>
								</div>
								<div className="item">
									<div className="item-tit">多维度榜单排行，榜单周期最短为24小时</div>
									<div className="item-desc">准确掌握榜单头部流量，以及活跃情况</div>
								</div>
								{/* <div className="item">
									<div>直播广场</div>
									<div>实时监控博主，第一时间掌握最新直播动态</div>
								</div> */}
							</div>
						</div>
						<div className="r-con">
							<div className="img-box">
								<img src="/static/home1.png" />
							</div>
						</div>
					</div>
					<div className="part2">
						<div className="triangle"></div>
						<div className="l-con">
							<div className="img-box">
								<img src="/static/home2.png" />
							</div>
						</div>
						<div className="r-con">
							<div className="tit">
								热门视频、话题跟踪
								<div className="watermark">02</div>
							</div>
							<div className="wrap">
								<div className="item">
									<div className="item-tit">热门视频</div>
									<div className="item-desc">实时更新爆款视频，追赶热点获取更多优质流量</div>
								</div>
								<div className="item">
									<div className="item-tit">热门话题</div>
									<div className="item-desc">掌握当前最新最热话题标签、排行榜</div>
								</div>
							</div>
						</div>
					</div>
					<div className="part3">
						<div className="triangle"></div>
						<div className="l-con">
							<div className="tit">
								<div className="watermark">03</div>
								移动端查看更便捷
							</div>
							<div className="wrap">
								<div className="code">
									<img src="/static/zaodie_code.jpg" alt="早蝶数据微信小程序"/>
									<div className="desc">微信扫码识别小程序</div>
									<div className="desc">随时随地手机查看账号数据变化</div>
								</div>
							</div>
						</div>
						<div className="r-con">
							<div className="img-box">
								<img src="/static/zaodie_mini.png" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
};

export const getStaticProps: GetStaticProps = async () => {
	let rank = {
		type: 1,
		page: 1,
		limit: 5,
		offset: 0,
		earlierDate: moment().subtract(2, 'days').format("YYYY:MM:DD"),
		date: moment().subtract(1, 'days').format("YYYY:MM:DD")
	}
	// 互联网
	let p1 = rankLink(Object.assign({cateId:1},rank))
	// 科技
	let p2 = rankLink(Object.assign({cateId:2},rank))
	// 科普
	let p3 = rankLink(Object.assign({cateId:3},rank))
	// 热门视频
	let p4 = videoLink({
		cateId: 0,
		limit: 3,
		sortType: 1,
		actType: 3,
		offset: 0
	})
	// 热门话题
	let p5 = getTopicList({
		sortType: 1,
		limit: 5,
		offset: 0
	})
	let res = await Promise.all([p1,p2,p3,p4,p5])
	let data:any = {}
	// 互联网
	if(res[0].code == 200){
		data.net = res[0].data.list
	}
	// 科技
	if(res[1].code == 200){
		data.science = res[1].data.list
	}
	// 科普
	if(res[2].code == 200){
		data.publicity = res[2].data.list
	}
	// 热门视频
	if(res[3].code == 200){
		data.video = res[3].data.list
	}
	// 热门话题
	if(res[4].code == 200){
		data.topic = res[4].data.list
	}
  	return { 
		props: {
			data
		} 
	}
}

export default Home;
