import {Modal, Input, Button, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {postAuthorSearch,postAuthorInclude} from '../../pages/api/author'
import './style.less'
const { Search } = Input;

const AuthorModal:React.FC<any> = (props:any):JSX.Element => {
    let [modalState, setModalState] = useState(false);
    let [load, setLoad] = useState(false);
    let [list, setList] = useState<any>([])
    let [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        if(props.isShow){
            setModalState(true)
        }
    },[props])

    let handleHideModal = () => {
        setModalState(false);
        setList([])
        setSearchVal('')
        props.onCallback();
    }
    let onSearchChange = (e:any) => {
        setSearchVal(e.target.value)
    }
    let onSearch = (value:any) => {
        setLoad(true)
        // postAuthorSearch({keyword: value}).then(res => {
        //     setLoad(false)
        //     if(res.code == 200){
        //         if(res.data.length > 0){
        //             res.data.forEach((item:any) => {
        //                 item.load = false
        //             })
        //             setList(res.data)
        //         } else {
        //             setList([])
        //             message.warning('未搜索到相关记录')
        //         }
        //     }
        // })
    }
    let handleAuthorPost = (index:number) => {
        let [...arr]:any = list
        let item = arr[index];
        arr[index].load = true;
        setList(arr)
        console.log('item',item)
        // postAuthorInclude({
        //     keyword: item.nickname,
        //     username: item.username
        // }).then(res => {
        //     arr[index].load = false;
        //     if(res.code == 200){
        //         arr[index].isMark = 1;
        //         message.success('收录成功')
        //     } else {
        //         message.error(res.message)
        //     }
        //     let newArr = JSON.parse(JSON.stringify(arr))
        //     setList(newArr)
        //     // console.log('sss',arr)
        // })
    }
    let listContent = <>{list.map((item:any,index:number) => (
        <div key={item.username} className="author-modal-list-item flex flex-item-conter">
            <img src={item.headUrl} alt=""/>
            <span className="flex-1 text-ellipsis">{item.nickname}</span>
            {item.isMark == 0 ? <Button onClick={() => handleAuthorPost(index)} loading={item.load}>申请收录</Button> : <Button type="link" disabled>已收录</Button>}
        </div>
    ))}</>
    return <Modal visible={modalState} maskClosable={false} footer={null} onCancel={handleHideModal}>
        <div className="author-modal-title">收录视频号</div>
        <div className="author-modal-search">
            <Search value={searchVal} placeholder="请输入精确的视频号名称，不准确将无法搜索到" 
            loading={load} allowClear enterButton="搜索" size="large" 
            onChange={onSearchChange} 
            onSearch={onSearch}/>
        </div>
        {list.length > 0 ? <div className="author-modal-list">{listContent}</div> : null}
    </Modal>
}

export default AuthorModal;