import {addQueryParam} from './fun-util';

export default async function request(url, params = {}) {
	const {data} = params as any;
	let {method, headers = {}, appStore = null, ...options} = params as any;
	method = method || 'GET';
	const option = {
		method,
		...options,
	};
	if(headers !== false){
		option.headers = {
			access_token: appStore && appStore.userStore.accessToken,
			...headers
		}
	}
	if (method === 'GET') {
		url = addQueryParam(url, data);
	}else if (data) {
		option.headers = { ...option.headers, 'Content-Type': 'application/json' };
		option.body = JSON.stringify(data);
	}
	const response = await fetch(url, option);
	let result = null;
	try {
		result = await response.json();
	} catch (e) {
		// 部分POST,PUT.DELETE请求没有内容返回，导致response.json()抛出异常
		if(method === 'GET' && response.status === 200){
			//GET请求没有内容，则返回null
			result = null;
		}else if(response.status === 200){
			result = true;
		}
	}
	if (result && result.hasOwnProperty('code') && result.hasOwnProperty('msg')) {
		if (appStore && appStore.userInfoStore && result.code === 'auth.token.expire') {  // 令牌过期
			appStore.userStore.clear();
		}
		throw new Error(result.msg);
	} else if (response.status >= 400) {
		throw new Error('Bad response from server');
	}
	return result;
}