import React, { useEffect, useState } from 'react';
import { useSetState } from "ahooks";
import { Modal, Button, message, Popover } from 'antd';
import { useStore } from '@/stores';
import { postOrder, postOrderResult } from '@/api/pay';
import './style.less'

const PayModal:React.FC<any> = (props:any):JSX.Element => {
    let { userStore } = useStore();
    let {userInfo} = userStore;
    let level = userInfo?.teamInfo?.level;
    let [ buyLoad, setBuyLoad ] = useState(false)
    let [state, setMyState] = useSetState<any>({
        isRenew: false,
        edition: 'major', // 购买版本
        time: 'year', // 购买时长
        pay: 1, // 支付方式

        amount: '0.00', // 支付金额
        oldPrice: '0.00', // 原价
        savePrice: '0.00',// 节省金额
    })
    let [showBuyModal, setShowBuyModal] = useState(false)

    let [orderInfo, setOrderInfo] = useState({
        cid: '',
        orderSn: ''
    })

    let config:any = {
        // 企业版
        enterprise:{
            month: { // 每月
                oPrice: '1999',// 原总价
                omPrice: '1999',// 原每月价
                dPrice: '1999',// 折后总价
                dmPrice: '1999',// 折后每月价
                sPrice: '0'
            },
            halfYear:{ // 半年
                oPrice: '11994',// 原总价
                omPrice: '1999',// 原每月价
                dPrice: '9595',// 折后总价
                dmPrice: '1599',// 折后每月价
                sPrice: '2399'
            },
            year:{// 1年
                oPrice: '23988',// 原总价
                omPrice: '1999',// 原每月价
                dPrice: '14392',// 折后总价
                dmPrice: '1199',// 折后每月价
                sPrice: '9596'
            }
        },
        // 专业版
        major: {
            month: { // 每月
                oPrice: '799',// 原总价
                omPrice: '799',// 原每月价
                dPrice: '799',// 折后总价
                dmPrice: '799',// 折后每月价
                sPrice: '0'
            },
            halfYear:{ // 半年
                oPrice: '4794',// 原总价
                omPrice: '699',// 原每月价
                dPrice: '3835',// 折后总价
                dmPrice: '639',// 折后每月价
                sPrice: '959'
            },
            year:{// 1年
                oPrice: '9588',// 原总价
                omPrice: '699',// 原每月价
                dPrice: '5752',// 折后总价
                dmPrice: '479',// 折后每月价
                sPrice: '3836'
            }
        },
        // 高级版
        senior: {
            month: {// 每月
                oPrice: '399',// 原总价
                omPrice: '399',// 原每月价
                dPrice: '399',// 折后总价
                dmPrice: '399',// 折后每月价
                sPrice: '0'
            },
            halfYear:{// 半年
                oPrice: '2394',// 原总价
                omPrice: '399',// 原每月价
                dPrice: '1915',// 折后总价
                dmPrice: '319',// 折后每月价
                sPrice: '479'
            },
            year:{ // 1年
                oPrice: '4788',// 原总价
                omPrice: '399',// 原每月价
                dPrice: '2872',// 折后总价
                dmPrice: '239',// 折后每月价
                sPrice: '1916'
            }
        }
    }

    let handlePayType = (type:string,val: string) => {
        if((type == 'edition' && !state.isRenew) || type !== 'edition'){
            setMyState({
                [type]: val
            })
        }
    }

    let handleBuy = () => {
        if(userInfo?.isJoinTeam == 1){
            message.warning('子账号暂不支持升级续费！')
        } else {
            setBuyLoad(true)
            let month = state.time == 'year' ? 12 : state.time == 'halfYear' ? 6 : 1;
            let price = config[state.edition][state.time].dPrice;
            let type = state.edition == 'enterprise' ? 3 : state.edition == 'major' ? 2 : 1
            postOrder({
                type: type,
                month: month,
                amount: price
            }).then(res => {
                if(res.code == 200){
                    setOrderInfo({
                        cid: res.data.cid,
                        orderSn: res.data.orderSn
                    })
                    setShowBuyModal(true)
                    let win:any = window.open(res.data.url, '_blank');
                    win.focus();
                } else {
                    message.error(res.message)
                }
            })
        }
    }

    useEffect(() => {
        if(props.isShow){
            setBuyLoad(false)
            setBuyModalLoad(false)
            setOrderInfo({
                cid: '',
                orderSn: ''
            })
            // 判断是否为续费
            if(level && level == 1){
                setMyState({
                    isRenew: true,
                    edition: 'senior'
                })
            } else if(level && level == 2){
                setMyState({
                    isRenew: true,
                    edition: 'major'
                })
            } else {
                setMyState({
                    isRenew: false,
                    edition: props.type,
                    time: props.time
                })
            }
        }
    },[props])

    
    let [buyModalLoad, setBuyModalLoad] = useState(false)
    let handleHideBuyModal = () => {
        setShowBuyModal(false)
    }

    let handleQueryResult = () => {
        setBuyModalLoad(true)
        postOrderResult(orderInfo).then(res => {
            setBuyModalLoad(false)
            if(res.code == 200){
                if(res.data.order_state == 1){
                    setShowBuyModal(false)
                    setBuyLoad(false)
                    props.onCallback('success')
                    message.success('支付成功')
                } else {
                    setShowBuyModal(false)
                    setBuyLoad(false)
                    message.warning('您还未支付，请先支付')
                }
            } else {
                setShowBuyModal(false)
                setBuyLoad(false)
                message.error(res.message)
            }
        })
    }

    let helpContent =<div style={{textAlign: 'center'}}>
        <img style={{width: '160px',height:'160px'}} src="https://static.zaodie.com/image/kefu.jpeg" alt=""/>
    </div>

    return <><Modal visible={props.isShow} centered={true} footer={null} width={720} onCancel={() => props.onCallback('close')}>
        <div className="pay-modal-title">{state.isRenew ? '续费' : '购买'}会员</div>
        <div className="pay-modal-item">
            <label>购买版本</label>
            <ul className="level">
                <li className={state.edition === 'enterprise' ? 'active' : ''} onClick={() =>handlePayType('edition', 'enterprise')}><i className="iconfont icon-level-zhuanye"></i>企业版</li>
                <li className={state.edition === 'major' ? 'active' : ''} onClick={() =>handlePayType('edition', 'major')}><i className="iconfont icon-level-zhuanye"></i>专业版</li>
                <li className={state.edition === 'senior' ? 'active' : ''} onClick={() =>handlePayType('edition', 'senior')}><i className="iconfont icon-level-gaoji"></i>高级版</li>
            </ul>
        </div>
        <div className="pay-modal-item">
            <label>购买时长</label>
            <ul className="time">
                <li className={state.time === 'year' ? 'active' : ''} onClick={() =>handlePayType('time', 'year')}>
                    <div className="time-price">
                        <div className="at">1年</div>
                        <div className="price">
                            <div className="amount">￥<span>{config[state.edition]['year'].dPrice}</span></div>
                            <div className="month-price">{config[state.edition]['year'].dmPrice}元/月</div>
                        </div>
                    </div>
                    <div className="discount">限时6折</div>
                </li>
                <li className={state.time === 'halfYear' ? 'active' : ''} onClick={() =>handlePayType('time', 'halfYear')}>
                    <div className="time-price">
                        <div className="at">6个月</div>
                        <div className="price">
                            <div className="amount">￥<span>{config[state.edition]['halfYear'].dPrice}</span></div>
                            <div className="month-price">{config[state.edition]['halfYear'].dmPrice}元/月</div>
                        </div>
                    </div>
                    <div className="discount">限时8折</div>
                </li>
                <li className={state.time === 'month' ? 'active' : ''} onClick={() =>handlePayType('time', 'month')}>
                    <div className="time-price">
                        <div className="at">1个月</div>
                        <div className="price">
                            <div className="amount">￥<span>{config[state.edition]['month'].dPrice}</span></div>
                            {/* <div className="month-price">239元/月</div> */}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div className="pay-modal-item">
            <label>支付方式</label>
            <ul className="paytype">
                <li className="active"><img src="https://static.zaodie.com/image/alipay.png" />支付宝</li>
            </ul>
        </div>
        <div className="pay-modal-item">
            <label>应付金额</label>
            <div className="item-info">
                <span className="amount">￥<strong>{config[state.edition][state.time].dPrice}</strong>元</span>
                <s className="old-price">原价:￥{config[state.edition][state.time].oPrice}</s>
                <span className="save-price">节省:￥{config[state.edition][state.time].sPrice}</span>
            </div>
        </div>
        {/* <div className="pay-modal-item">
            <label>有效期至</label>
            <div className="item-info">
                <span className="expires">2022年01月05日</span>
            </div>
        </div> */}
        <div className="pay-modal-btn">
            <Button type="primary" loading={buyLoad} onClick={handleBuy}>立即支付</Button>
        </div>
    </Modal>
        {/* 查询支付结果 */}
        <Modal width={360} visible={showBuyModal} maskClosable={false} closable={false} destroyOnClose={true} centered={true} title={null} footer={null} onCancel={handleHideBuyModal}>
            <div className="pay-state-modal-icon"><i className="iconfont icon-tishi"></i></div>
            <div className="pay-state-modal-title">购买提示</div>
            <div className="pay-state-modal-tips">请在新打开的页面中完成支付</div>
            <div className="pay-state-modal-foot">
                <Popover content={helpContent} title="请联系客服">
                    <Button>遇到问题</Button>
                </Popover>
                <Button type="primary" loading={buyModalLoad} onClick={handleQueryResult}>支付成功</Button>
            </div>
        </Modal>
    </>
}

export default PayModal;