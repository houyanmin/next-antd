import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import Cookies from 'js-cookie';
import './style.less'
import { useHistory } from 'react-router-dom';
import AuthorModal from '@/components/AuthorModal';

const { Search } = Input;

const PageSearch:React.FC<any> = (props:any):JSX.Element => {
    let {page = 'author'} = props;
    let history = useHistory();

    // 首页的tab切换
    let [type, setType] = useState('author')
    let handleTypeChange = (val:string) => {
        setType(val)
    }
    // 搜索
    let onSearch = (value:any) => {
        if(page == 'index'){
            if(type == 'author'){
                history.push(`/author?k=${value}`)
            }
            if(type == 'video'){
                history.push(`/video?k=${value}`)
            }
        } else {
            props.onCallback(value)
        }
    }

    // 收录
    let [show,setShow] = useState(false);
    let handleShowModal = () => {
        const token = Cookies.get('token');
        if(token) {
            setShow(true)
        } else {
            message.warning(<span>登录后使用此功能，<a href="/login">去登录</a></span>)
        }
    }
    let onCallback = () => {
        setShow(false)
    }
    return <div className={`page-search ${props.class ? props.class : ''}`}>
        {page == 'index' ? (<div className="search-tabs">
            <span className={type == 'author' ? 'active' : ''} onClick={() => handleTypeChange('author')}>视频号</span>
            <span className={type == 'video' ? 'active' : ''} onClick={() => handleTypeChange('video')}>视频</span>
        </div>) : null}
        <div className="search-keywords flex flex-item-conter">
            <div className="flex-1">
                <Search disabled={page == 'video' && props?.level < 1} placeholder={ page == 'index' ? (type=='author' ? '请输入视频号名称进行搜索' : type=='video' ? '请输入视频标题关键词搜索' : '请输入关键词搜索') : (page =='author' ? '请输入视频号名称进行搜索' : page =='video' ? '请输入视频标题关键词搜索' : '请输入关键词搜索')} defaultValue={props.keyword} allowClear enterButton size="large" onSearch={onSearch}/>
            </div>
            {page == 'author' ? <Button type="link" onClick={handleShowModal}>添加收录</Button> : null}
        </div>
        {page == 'author' ? <AuthorModal isShow={show} onCallback={onCallback}/> : null}
    </div>
}

export default PageSearch;