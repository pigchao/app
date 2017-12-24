import 'whatwg-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import Main from './Main';
import appStore from './store/AppStore';
import './assets/style/app.less';

ReactDOM.render(
	<Provider appStore={appStore}>
		<Main/>
	</Provider>,
	document.getElementById('react-app')
);