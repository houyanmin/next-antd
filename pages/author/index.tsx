import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { GetStaticProps } from 'next'
// import QueryString from 'query-string';
import { Form, Select, Cascader, Tooltip, Pagination, message, Checkbox, Modal, Spin, Empty, Button } from 'antd';
import PageSearch from '../../components/PageSearch/index';
import PageAuthTips from '../../components/PageAuthTips';
import { getCategory, getRegion, getList } from '../api/author';
// import { useStore } from '@stores';
// import Cookies from 'js-cookie';
import AuthorItem from './author-item'

import './style.less'

const Author: React.FC<any> = (props: any): JSX.Element => {
	const history = useHistory();
	// let location = useLocation();
	// 判断权限
	// let { userStore } = useStore();
	// let { userInfo } = userStore;
	let userInfo = {};
	let query = '';
	// QueryString.parse(location.search)
	let [userLevel, serUserLevel] = useState(-1)
	let [tableLoad, setTableLoad] = useState(false)
	let [cate, setCate] = useState([])
	let [region, setRegion] = useState([])
	let [exportParams, setExportParams] = useState({}) // 导出的条件
	let [list, setList] = useState([]);
	let [total, setTotal] = useState(20)
	let init = () => {
		getCategory().then(res => {
			if (res.code == 200) {
				setCate(res.data)
			}
		})
		getRegion().then(res => {
			if (res.code == 200) {
				let list: any = []
				res.data.forEach((item: any) => {
					let a: any = {
						value: item.adCode,
						label: item.provinceName,
					}
					if (item.city && item.city.length > 0) {
						a.children = [];
						item.city.forEach((val: any) => {
							a.children.push({
								value: val.adCode,
								label: val.cityName,
							})
						})
					}
					list.push(a)
				})
				setRegion(list)
			}
		})
	}
	let handleCateChange = (cateId:number) => {
		if(userLevel > 0){
			param.cateId = cateId;
			param.page = 1;
			setParam({
				...param
			})
		}
	}
	let handleScreenSelect = (type: any, val: any) => {
		param[type] = val || '';
		param.page = 1;
		setParam({
			...param
		})
	}
	let onRegionChange = (value: any, selectedOptions: any) => {
		param.provinceId = value[0]
		param.cityId = value[1]
		param.page = 1;
		setParam({
			...param
		})
	}

	let [ param, setParam ] = useState<any>({
		keywords: query['k'] || '',
		sortType: '1',
		cateId: 0, // 作者类别

		// 筛选条件
		rangeCombinedIndex: '', // 早蝶指数
		rangeFeedCount: '', // 作品总数
		rangeLikeAvg: '', // 平均点赞
		rangeCommentAvg: '', // 平均评论
		rangeForwardAvg: '',// 平均转发

		// 认证属性
		authType: '',
		gender: '',
		provinceId: '',
		cityId: '',

		// 排序
		sortFans: '', // asc:升序 desc:降序
		sortFeedCount: '',
		sortLikeAvg: '',
		sortCombinedIndex: '',

		// 高级筛选
		hasShop: '',
		hasArticle: '',

		page: 1,
		limit: 20
	})
	let getAuthorList = () => {
		setTableLoad(true)
		let params = { ...param };
		params.offset = (params.page - 1) * params.limit;
		delete params.page;
		setExportParams(params)
		getList(params).then(res => {
			if (res.code == 200) {
				res.data.list.forEach((item:any) => {
					let a = item.head_url.split('/');
					a[a.length - 1] = 132;
					item.head_url = a.join('/')
				})
				setList(res.data.list)
				setTotal(res.data.count)
			} else {
				Modal.confirm({
					title: '提示',
					keyboard: false,
					mask: true,
					content: res.message,
					// content: '免费版会员每日可搜索50次，建议您升级为高级版以上会员，体验完整功能。',
					okText: '立即升级',
					onOk() {
						history.push('/member/pay')
					}
				})
			}
			setTableLoad(false)
		})
	}

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		// const token = Cookies.get('token');
		// if (token) {
		// 	if (userInfo) {
		// 		serUserLevel(userInfo?.teamInfo?.level)
		// 	} else {
		// 		serUserLevel(-1)
		// 	}
		// } else {
		// 	serUserLevel(-1)
		// }
	}, [userInfo])

	useEffect(() => {
		getAuthorList()
	}, [param])

	let onSearchCb = (val: string) => {
		if (userLevel >= 0) {
			param.sortType = '1'
			param.keywords = val;
			param.page = 1;
			setParam({
				...param
			})
		} else {
			if (val !== '') {
				Modal.confirm({
					title: '提示',
					keyboard: false,
					mask: true,
					content: <>请登录后使用此功能，<a href="/login">去登录</a></>,
					okText: '立即登录',
					onOk() {
						history.push('/login')
					}
				})
			}
		}
	}

	let handlePageChange = (page:any) => {
		if(userLevel == -1){
			message.warning(<span>登录后使用此功能，<a href="/login">去登录</a></span>)
		} else if(userLevel == 0){
			message.warning(<span>升级VIP后使用此功能，<Link to="/member/pay">去升级</Link></span>)
		} else if(userLevel == 1){
			if(page > 10){
				message.warning(<span>升级VIP后使用此功能，<Link to="/member/pay">去升级</Link></span>)
			} else {
				document.documentElement.scrollTop = document.body.scrollTop =0;
				param.page = page;
				setParam({
					...param
				})
			}
		} else {
			document.documentElement.scrollTop = document.body.scrollTop =0;
			param.page = page;
			setParam({
				...param
			})
		}
	}

    let TooltipTitle = useMemo(() => {
        if (userLevel == -1) {
			return <>登录后使用此功能，<Link to="/login">去登录</Link></>
		} else {
			return <>升级VIP后使用此功能，<Link to="/member/pay">去升级</Link></>
		}
    },[userLevel])

	const exportData = () => {
		if(list.length == 0) return;
		// getList(Object.assign({export:1},exportParams)).then(res => {
		// 	if (res.code == 200) {
		// 		Modal.confirm({
		// 			// centered: true,
		// 			title: <div className="modal-confirm-title"><span className="iconfont icon-chenggong" />导出任务创建成功</div>,
		// 			icon: null,
		// 			content: <div>任务创建成功后，可至 <span style={{ color: '#fa9d3b' }}>导出管理</span> 页面进行下载</div>,
		// 			okText: '去下载',
		// 			cancelText: '我知道了，稍后再去',
		// 			onOk:() => {
		// 				window.open('/member/account')
		// 			},
		// 			getContainer: () => document.querySelector('.page-author') as HTMLElement
		// 		});
		// 	}else{
		// 		message.error(res.message)
		// 	}
		// })
	}

	let handleTableSort = (type:string) => {
		// 粉丝企业版
		// 作品、平均获赞、早碟指数 -- 大于高级版、专业版
		if(userLevel >= 1){
			if(type == 'sortFans'){
				// param.sortFans = ''
				param.sortFeedCount = ''
				param.sortLikeAvg = ''
				param.sortCombinedIndex = ''
			}
			if(type == 'sortFeedCount'){
				param.sortFans = ''
				// param.sortFeedCount = ''
				param.sortLikeAvg = ''
				param.sortCombinedIndex = ''
			}
			if(type == 'sortLikeAvg'){
				param.sortFans = ''
				param.sortFeedCount = ''
				// param.sortLikeAvg = ''
				param.sortCombinedIndex = ''
			}
			if(type == 'sortCombinedIndex'){
				param.sortFans = ''
				param.sortFeedCount = ''
				param.sortLikeAvg = ''
				// param.sortCombinedIndex = ''
			}

			if(param[type] == ''){
				param[type] = 'desc'
			} else if(param[type] == 'desc') {
				param[type] = 'asc'
			} else {
				param[type] = ''
			}

			if(param.sortFans == '' && param.sortFeedCount == '' && param.sortLikeAvg == '' && param.sortCombinedIndex == ''){
				param.sortType = '1'
			} else {
				param.sortType = ''
			}

			param.page = 1;
			setParam({
				...param
			})
		} else {

		}
	}

	let onSeniorScreenChange = (val:any) => {
		if(val.indexOf('hasShop') > -1){
			param.hasShop = 1;
		} else {
			param.hasShop = '';
		}
		if(val.indexOf('hasArticle') > -1){
			param.hasArticle = 1;
		} else {
			param.hasArticle = '';
		}
		param.page = 1;
		setParam({
			...param
		})
	}

	// 分类
	let cateEle = <div className="screen-list">
		<span className={param.cateId == 0 ? 'cate active' : 'cate'} onClick={() => handleCateChange(0)}>全部</span>
		{cate.map((item: any) => {
			let classN = 'cate'
			if (userLevel <= 0) {
				classN += ' disabled';
			} else {
				classN += param.cateId == item.id ? ' active' : '';
			}
			return <span key={item.id} className={classN} onClick={() => handleCateChange(item.id)}>{item.name}</span>
		})}
	</div>
	let screenFromRule = <Select style={{ width: '210px' }} disabled={userLevel < 1} allowClear placeholder="请选择" onChange={(value: any) => handleScreenSelect('authType', value)}>
		<Select.Option className="screen-list-select-option" value="1">未认证</Select.Option>
		<Select.Option className="screen-list-select-option" value="2">个人认证</Select.Option>
		<Select.Option className="screen-list-select-option" value="3">企业认证</Select.Option>
	</Select>
	let screenFromGender = <Select style={{ width: '210px' }} disabled={userLevel < 1} allowClear placeholder="请选择" onChange={(value: any) => handleScreenSelect('gender', value)}>
		<Select.Option value="1">男</Select.Option>
		<Select.Option value="2">女</Select.Option>
	</Select>
	let screenListIndex = <Select style={{ width: '210px' }} disabled={userLevel < 2} allowClear placeholder="请选择" onChange={(value:any) => handleScreenSelect('rangeCombinedIndex',value)}>
		<Select.Option value="0">不限</Select.Option>
		<Select.Option value="1">0 - 400</Select.Option>
		<Select.Option value="2">400 - 600</Select.Option>
		<Select.Option value="3">600 - 800</Select.Option>
		<Select.Option value="4">800 - 1000</Select.Option>
		<Select.Option value="5">1000+</Select.Option>
	</Select>;
	let screenListWorks = <Select style={{ width: '210px' }} disabled={userLevel < 2} allowClear placeholder="请选择" onChange={(value:any) => handleScreenSelect('rangeFeedCount',value)}>
		<Select.Option value="0">不限</Select.Option>
		<Select.Option value="1">0 - 100</Select.Option>
		<Select.Option value="2">100 - 500</Select.Option>
		<Select.Option value="3">500 - 1000</Select.Option>
		<Select.Option value="4"> &gt; 1000</Select.Option>
	</Select>;
	let screenListLike = <Select style={{ width: '210px' }} disabled={userLevel < 2} allowClear placeholder="请选择" onChange={(value:any) => handleScreenSelect('rangeLikeAvg',value)}>
		<Select.Option value="0">不限</Select.Option>
		<Select.Option value="1">0 - 1万</Select.Option>
		<Select.Option value="2">1万 - 5万</Select.Option>
		<Select.Option value="3">5万 - 10万</Select.Option>
		<Select.Option value="4"> &gt; 10万</Select.Option>
	</Select>
	let screenListComment = <Select style={{ width: '210px' }} disabled={userLevel < 2} allowClear placeholder="请选择" onChange={(value:any) => handleScreenSelect('rangeCommentAvg',value)}>
		<Select.Option value="0">不限</Select.Option>
		<Select.Option value="1">0 - 100</Select.Option>
		<Select.Option value="2">100 - 500</Select.Option>
		<Select.Option value="3"> &gt; 500</Select.Option>
	</Select>
	let screenListForwar = <Select style={{ width: '210px' }} disabled={userLevel < 2} allowClear placeholder="请选择" onChange={(value:any) => handleScreenSelect('rangeForwardAvg',value)}>
		<Select.Option value="0">不限</Select.Option>
		<Select.Option value="1">0 - 100</Select.Option>
		<Select.Option value="2">100 - 1000</Select.Option>
		<Select.Option value="3"> &gt; 1000</Select.Option>
	</Select>

	let seniorScreen = <Checkbox.Group style={{ width: '100%' }} disabled={userLevel < 3} onChange={onSeniorScreenChange}>
			<Checkbox value="hasArticle"><i className="iconfont icon-lianjie"></i> 有挂链</Checkbox>
			<Checkbox value="hasShop"><i className="iconfont icon-shangdian"></i> 有开通微信小商店</Checkbox>
		</Checkbox.Group>;
	return <div className="layout-content page-author">
		<PageSearch page="author" keyword={param.keywords} onCallback={onSearchCb} />
		<div className="page-screen">
			<div className="screen-box">
				<label>作者类别</label>
				{userLevel <= 0 ?
					(<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>{cateEle}</Tooltip>) : cateEle
				}
			</div>

			<div className="screen-box">
				<div className="screen-list">
					<Form layout="inline" colon={false}>
						<Form.Item label="早蝶指数" style={{marginBottom: '10px'}}>
							{userLevel < 2 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									{screenListIndex}
								</Tooltip> : screenListIndex
							}
						</Form.Item>
						<Form.Item label="作品总数" style={{marginBottom: '10px'}}>
							{userLevel < 2 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									{screenListWorks}
								</Tooltip> : 
								screenListWorks
							}
						</Form.Item>
						<Form.Item label="平均点赞" style={{marginBottom: '10px'}}>
							{userLevel < 2 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									{screenListLike}
								</Tooltip> : 
								screenListLike
							}
						</Form.Item>
						<Form.Item label="平均评论" style={{marginBottom: '10px'}}>
							{userLevel < 2 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									{screenListComment}
								</Tooltip> : 
								screenListComment
							}
						</Form.Item>
						<Form.Item label="平均转发" style={{marginBottom: '10px'}}>
							{userLevel < 2 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									{screenListForwar}
								</Tooltip> :
								screenListForwar
							}
						</Form.Item>
						<Form.Item label="认证类型">
							{
								userLevel <= 0 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>{screenFromRule}</Tooltip> : 
								screenFromRule
							}
						</Form.Item>
						<Form.Item label="博主地域">
							{userLevel <= 0 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									<Cascader className="page-screen-cascader" popupClassName="page-screen-cascader-popup" style={{ width: '210px' }} disabled placeholder="请选择" options={region} onChange={onRegionChange} />
								</Tooltip> :
								<Cascader className="page-screen-cascader" popupClassName="page-screen-cascader-popup" style={{ width: '210px' }} placeholder="请选择" options={region} onChange={onRegionChange} />
							}
						</Form.Item>
						<Form.Item label="博主性别">
							{ userLevel <= 0 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>{screenFromGender}</Tooltip> : 
								screenFromGender
							}
						</Form.Item>
						<Form.Item>
							{ userLevel < 3 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>{seniorScreen}</Tooltip> : 
								seniorScreen
							}
						</Form.Item>
						<Form.Item>
							{userLevel <= 0 ?
								<Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
									<Button disabled={list.length == 0 || userLevel <= 0} icon={<span className="iconfont icon-daochu1" style={{ marginRight: 5 }} />} onClick={exportData}>导出数据</Button>
								</Tooltip>
								:
								<Button disabled={list.length == 0} icon={<span className="iconfont icon-daochu1" style={{ marginRight: 5 }} />} onClick={exportData}>导出数据</Button>
							}
						</Form.Item>
					</Form>
				</div>
			</div>

		</div>
		{/* 列表 */}
		<div className="author-list">
			<div className="list-header flex flex-item-conter flex-justify-content-between">
				<div className="header-item">视频号信息</div>
				{ userLevel > 2 ? <div className="header-item fans flex flex-item-conter flex-justify-flex-end">
					<span onClick={() => handleTableSort('sortFans')}>粉丝</span>
					<span className={`table-sorter ${param.sortFans}`} onClick={() => handleTableSort('sortFans')}>
						<i className="iconfont icon-sorter-asc"></i>
						<i className="iconfont icon-sorter-desc"></i>
					</span>
				</div> : null}
				<div className="header-item flex flex-item-conter flex-justify-flex-end">
					{ userLevel >= 1 ? <>
						<span onClick={() => handleTableSort('sortFeedCount')}>作品</span>
						<span className={`table-sorter ${param.sortFeedCount}`} onClick={() => handleTableSort('sortFeedCount')}>
							<i className="iconfont icon-sorter-asc"></i>
							<i className="iconfont icon-sorter-desc"></i>
						</span>
					</> : <Tooltip style={{display: "flex",alignItems: 'center',justifyContent: 'flex-end'}} overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
						<div className="flex flex-item-conter flex-justify-flex-end">
							<span>作品</span>
							<span className={`table-sorter ${param.sortFeedCount}`}>
								<i className="iconfont icon-sorter-asc"></i>
								<i className="iconfont icon-sorter-desc"></i>
							</span>
						</div>
					</Tooltip>}
				</div>
				<div className="header-item flex flex-item-conter flex-justify-flex-end">
					{ userLevel >= 1 ? <>
						<span onClick={() => handleTableSort('sortLikeAvg')}>平均获赞</span>
						<span className={`table-sorter ${param.sortLikeAvg}`} onClick={() => handleTableSort('sortLikeAvg')}>
							<i className="iconfont icon-sorter-asc"></i>
							<i className="iconfont icon-sorter-desc"></i>
						</span>
					</> : <Tooltip style={{display: "flex",alignItems: 'center',justifyContent: 'flex-end'}} overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
						<div className="flex flex-item-conter flex-justify-flex-end">
							<span>平均获赞</span>
							<span className={`table-sorter ${param.sortLikeAvg}`}>
								<i className="iconfont icon-sorter-asc"></i>
								<i className="iconfont icon-sorter-desc"></i>
							</span>
						</div>
					</Tooltip>}
				</div>
				<div className="header-item flex flex-item-conter flex-justify-flex-end">
					{ userLevel >= 1 ? <>
						<span onClick={() => handleTableSort('sortCombinedIndex')}>早蝶指数</span>
						<span className={`table-sorter ${param.sortCombinedIndex}`} onClick={() => handleTableSort('sortCombinedIndex')}>
							<i className="iconfont icon-sorter-asc"></i>
							<i className="iconfont icon-sorter-desc"></i>
						</span>
					</> : <Tooltip overlayClassName="auth-tooltip-class" placement="topLeft" title={TooltipTitle}>
						<div className="flex flex-item-conter flex-justify-flex-end">
							<span>早蝶指数</span>
							<span className={`table-sorter ${param.sortCombinedIndex}`}>
								<i className="iconfont icon-sorter-asc"></i>
								<i className="iconfont icon-sorter-desc"></i>
							</span>
						</div>
					</Tooltip>}
				</div>
				<div className="header-item">操作</div>
			</div>
			<Spin spinning={tableLoad} delay={500}>
				<div className="list-warp" style={{ minHeight: 120 }}>
					{list.map((item:any,index:number) => <AuthorItem key={`${item.id}-${index}`} userLevel={userLevel} {...item}/>)}
				</div>
				{ list.length == 0 && !tableLoad ? <div style={{paddingBottom: '50px'}}><Empty /></div> : null}
			</Spin>
		</div>
		{(
			((userLevel == -1 || userLevel == 0) && param.page == 1) ||
			(userLevel == 1 && param.page >= 10) ||
			(userLevel == 2 && param.page >= 50)
		) && list.length > 0 ? <PageAuthTips type={1} level={userLevel} /> : null}
		{
			userLevel > 0 && list.length > 0 ? (
				<div className="page-list-pagination">
					<Pagination current={param.page} pageSize={param.limit} total={total} showSizeChanger={false} onChange={handlePageChange} />
				</div>
			) : null
		}
	</div>
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} }
}


export default Author;
