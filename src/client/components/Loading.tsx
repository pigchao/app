import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface LoadingProps{
	visible: boolean
}
export default class Loading extends React.PureComponent<LoadingProps, any> {
	constructor(props){
		super(props);
	}
	render(){
		if(!this.props.visible) return null;
		return ReactDOM.createPortal(
			[
				<div className="app-loading-mask"/>,
				<div className="app-loading"/>,
			], document.body
		)
	}

}