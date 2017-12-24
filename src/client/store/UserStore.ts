import {action} from 'mobx';

export enum USER_TYPE {
	ADMIN = 'admin',
	QUESTIONER = 'questioner',
	ANSWER = 'answer',
	VISITOR = 'visitor',
}

export default class UserStore {

	appStore: any;
	isLogin: boolean;
	accessToken: string;
	uuid: string;
	nickname: string;
	userPhone: string;
	avatarUrl: string;
	userType: USER_TYPE;

	constructor(appStore){
		this.appStore = appStore;
	}

	@action
	clear(){
		this.isLogin = false;
		this.accessToken = null;
		this.nickname = null;
		this.userPhone = null;
		this.uuid = null;
		this.avatarUrl = null;
		this.userType = USER_TYPE.VISITOR
	}

}