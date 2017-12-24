import * as React from 'react'
import * as classNames from 'classnames'
import {isNotNull} from '../../public/util/fun-util'

interface InputProps {
	value: string | number;
	placeholder?: string;
	className?: string;
	type?: 'textarea' | 'text' | 'tel' | 'number' | 'password';
	pattern?: RegExp;
	maxLength?: number;
	prefix?: any;
	prefixCls?: string;
	suffix?: any;
	suffixCls?: string;
	onChange?: any;
	autoFocus?: boolean
	onFocus?: any;
	onBlur?: any;
}
export default class Input extends React.PureComponent<InputProps, any> {

	static defaultProps = {
		type: 'text',
		pattern: null,
	};
	refs: {
		input: HTMLInputElement;
	};
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		}
	}

	focus() {
		this.refs.input.focus();
	}

	blur() {
		this.refs.input.blur();
	}

	/**
	 * 校验失败，光标会自动切换到最后，加上resetCursor还原到当前位置
	 */
	resetCursor = (event) => {
		try{
			let dom = event.target;
			let selectionStart = dom.selectionStart;
			setTimeout(() => {
				dom.setSelectionRange(selectionStart-1, selectionStart-1);
			}, 1);
		}catch(e){}
	};

	onChange = (event) => {
		let value = event.target.value;
		let {pattern, maxLength, onChange} = this.props;
		if (isNotNull(value) && isNotNull(pattern) && !pattern.test(value)) {
			this.resetCursor(event);
			return;
		}
		if(isNotNull(value) && isNotNull(maxLength) && value.length > maxLength){
			this.resetCursor(event);
			return;
		}
		this.setState({value});
		onChange && onChange(value);
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({
				value: nextProps.value,
			})
		}
	}

	renderTextArea = () => {
		const {placeholder, autoFocus, onFocus, onBlur} = this.props;
		const {value} = this.state;
		return (
			<textarea className="app-input" ref="input"
			          value={value} onChange={this.onChange}
			          onFocus={onFocus} onBlur={onBlur}
			          placeholder={placeholder} autoFocus={autoFocus}/>
		)
	};

	renderInput = () => {
		const {type, className, prefix, prefixCls, suffix, suffixCls, placeholder, autoFocus, onFocus, onBlur} = this.props;
		const {value} = this.state;
		return (
			<div className={classNames('app-input-wrap', className)}>
				{
					prefix && <div className={classNames('app-input-prefix', prefixCls)}>{prefix}</div>
				}
				<input className="app-input" ref="input"
				       type={type} value={value} onChange={this.onChange}
				       onFocus={onFocus} onBlur={onBlur}
				       placeholder={placeholder} autoFocus={autoFocus}/>
				{
					suffix && <div className={classNames('app-input-suffix', suffixCls)}>{suffix}</div>
				}
			</div>
		)
	};

	render() {
		const {type} = this.props;
		if (type === 'textarea') {
			return this.renderTextArea();
		}
		return this.renderInput();
	}
}