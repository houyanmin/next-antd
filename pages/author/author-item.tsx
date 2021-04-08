import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Tooltip, message} from 'antd';
// import { postFavorite, delFavorite } from '@api/author';

// interface IProps{
//     id: string,
//     thumb_url: string,
//     intro: string,
//     created_at: string,
//     posted_at: string,
//     like_num: string,
//     comment_count: number,
//     forward_count: number,
//     head_url: string,
//     nickname: string,
//     category_name: string,
//     userLevel: number,
//     handleItemCb: (id:any) => void
// }

const AuthorItem:React.FC<any> = (props:any):JSX.Element => {
    let history = useHistory()

    let [item, setItem] = useState({
        ...props
    })

    let jumpDetail = () => {
        if(item.userLevel >= 0){
			window.open(`/author/${item.id}`)
		} else {
			Modal.confirm({
				title: '提示',
				keyboard: false,
				mask: true,
				content: <>请登录后使用此功能，<a href="/login">去登录</a></>,
				okText: '立即登录',
				onOk(){
					history.push('/login')
				}
			})
		}
    }

    const collect = (id:string|number) => {
		if(props.userLevel == -1){
			message.warning(<span>登录后使用此功能，<a href="/login">去登录</a></span>)
		} else {
			// postFavorite({
			// 	id: id,
			// 	type: 1
			// }).then((res)=>{
			// 	if(res.code == 200){
            //         item.is_favorite = 1
            //         setItem({
            //             ...item
            //         })
			// 	} else {
			// 		message.warning(res.message);
			// 	}
			// })
		}
	}
	const cancelCollect = (id:string|number) => {
		// delFavorite({
		// 	id: id,
		// 	type: 1
		// }).then((res)=>{
		// 	if(res.code == 200){
        //         item.is_favorite = 0
        //         setItem({
        //             ...item
        //         })
		// 	}
		// })
	}

    return <div className="author-item flex flex-item-conter flex-justify-content-between">
        <div className="author-info flex">
            <div className="logo">
                <img src={props.head_url} />
                {props.gender == 2 ? (<span><i className="iconfont icon-female"></i></span>) : props.gender == 1 ? (<span><i className="iconfont icon-male"></i></span>) : null}
            </div>
            <div className="info flex-1">
                <div className="name flex flex-item-conter">
                    <span className="nickname text-ellipsis" onClick={ jumpDetail }>{item.nickname}</span>
                    {item.auth_type > 0 ? (<>
                        <Tooltip placement="bottom" title={item.auth_intro}>
                            <div className={item.auth_type == 1 ? 'auth_intro text-ellipsis' : 'auth_intro auth_blue text-ellipsis'}>
                                <i className="iconfont icon-renzheng"></i>{item.auth_intro}
                            </div>
                        </Tooltip>
                    </>) : null}
                </div>
                <div className="address flex flex-item-conter">
                    { (item.province_name != '' || item.city_name != '') ? <div className="addr flex flex-item-conter"><i className="iconfont icon-dizhi1"></i>{item.province_name}{item.city_name != '' ? '·' : null}{item.city_name}</div> : null}
                    {
                        item.index_rank > 0 ? <div className="rank flex flex-item-conter">
                        <i className="iconfont icon-paiming"></i> {item.category_name}第 {item.index_rank} 名
                        </div> : null
                    }
                </div>
                {item.signature != '' ? <div className="desc">
                    <Tooltip placement="bottomLeft" title={item.signature}>
                        <div className="desc-text text-ellipsis">{item.signature}</div>
                    </Tooltip>
                </div> : null}
                <div className="lately">
                    <span className="label">最新发布：</span>
                    <div className="content">
                        <span className="title text-ellipsis">{item.new_release.intro || '#'}</span>
                        <span className="at">{item.new_release.latest_at}</span>
                    </div>
                </div>
            </div>
        </div>
        {item.userLevel > 2 ? <div className="anthor-fans">{item.fans_count}</div> : null}
        <div className="anthor-works">{item.feed_count}</div>
        <div className="anthor-praise">{item.like_avg}</div>
        <div className="anthor-index">{item.combined_index}</div>
        <div className="anthor-action">
            <div className="link-a flex f flex-justify-flex-end flex-item-conter" style={{marginBottom: '5px'}} onClick={ jumpDetail }>
                <i className="iconfont icon-chakanxiangqing"></i>查看详情
            </div>
            {
                item.is_favorite == 1
                ? <div className="link-a flex  flex-justify-flex-end flex-item-conter" onClick={ () => cancelCollect(item.id) }><i className="iconfont icon-favorite-fill"></i>取消收藏</div>
                : <div className="link-a flex  flex-justify-flex-end flex-item-conter" onClick={ () => collect(item.id) }><i className="iconfont icon-favorite-empty"></i>添加收藏</div>
            }
        </div>
    </div>
}

export default AuthorItem;