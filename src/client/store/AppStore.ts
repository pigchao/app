import {observable, action} from 'mobx';
import UserStore from './UserStore';

export interface StoreProps {
	appStore?: any
}

class AppStore {

	@observable
	public userStore = new UserStore(this);

	parseQuery = () => {

	};

	constructor() {
		this.parseQuery();
	}
}

export default new AppStore();