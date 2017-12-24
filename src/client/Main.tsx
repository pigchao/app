import * as React from 'react';
import {observer, inject} from 'mobx-react';
import Loading from './components/Loading';

interface MainProps{
	appStore?: any
}

@inject('appStore')
@observer
export default class Main extends React.PureComponent<MainProps, any>{

	constructor(props:MainProps){
		super(props);
	}

	render(){
		return (
			<Loading visible={true}/>
		)
	}
}