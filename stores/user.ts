import {observable, action, makeAutoObservable} from 'mobx';
import {getUser, postExit} from '@/pages/api/user'

export type UserStoreType = {
    userInfo: userInfoType | null,
    getUserInfo: () => Promise<any>,
    // getUserInfo: () => void,
    loginout: () => Promise<any>,
    // user: () => userInfoType | null
}
interface userInfoType {
    nickname: string,
    avatar_url: string,
    mobile: string,
    isJoinTeam: number,
    teamInfo: teamInfoType
}
interface teamInfoType {
    level: number,
    data_start_at: string | null,
    data_end_at: string | null
}
// 观察者方式
class userStoreClass {
    constructor() {
        makeAutoObservable(this)
    }
    @observable userInfo:userInfoType | null = null;
    @action.bound
    getUserInfo = () => {
        // let _this = this;
        return new Promise((resolve, reject) => {
            getUser().then((res:any) => {
                if(res.code == 200){
                    let info:any = {}
                    if(res.data.isJoinTeam == 1){
                        info.level = res.data.joinTeamInfo.level
                        info.data_start_at = res.data.joinTeamInfo.data_start_at
                        info.data_end_at = res.data.joinTeamInfo.data_end_at
                    } else { 
                        info.level = res.data.teamInfo.level
                        info.data_start_at = res.data.teamInfo.data_start_at
                        info.data_end_at = res.data.teamInfo.data_end_at
                    }
                    this.userInfo = {
                        nickname: res.data.nickname,
                        avatar_url: res.data.avatar_url,
                        mobile: res.data.mobile,
                        isJoinTeam: res.data.isJoinTeam,
                        teamInfo: info
                    }
                    console.log('this.userInfo',this.userInfo)
                    resolve(this.userInfo)
                }
            })
        })
    }
    loginout = () => {
        return new Promise((resolve, reject) => {
            postExit().then((res:any) => {
                this.userInfo = null
                resolve(true)
            })
        })
    }
    // @computed get user(){
    //     return this.userInfo;
    // }
}

const userStore: UserStoreType = new userStoreClass();

export default userStore;