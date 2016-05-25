import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import '../css/less.less'

class HelloWord extends React.Component{

	static defaultProps = {
		autoPlay: false,
		maxLoops: 10,
		posterFrameSrc: 'abc',
		videoSrc: '/',
		initialCount: 0,
	}
	
	static propTypes = {
		autoPlay: React.PropTypes.bool.isRequired,
		maxLoops: React.PropTypes.number.isRequired,
		posterFrameSrc: React.PropTypes.string.isRequired,
		videoSrc: React.PropTypes.string.isRequired,
		initialCount: React.PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			count: props.initialCount,
			src: props.posterFrameSrc,
		};

		console.log('HelloWord to constructor');
	}

	//组件将要加载时
	componentWillMount(){
		console.log('HelloWord to componentWillMount');
		this.setState({
			count: this.state.count + 1,
			src: '/user',
		});
	}

	//组件接收到属性
	componentWillReceiveProps(newProps){
		console.log('HelloWord to componentWillReceiveProps');
		console.log(newProps);
	}

	//组件接受到新属性状态触发（可判断组件是否更新）
	shouldComponentUpdate(){
		console.log('HelloWord to shouldComponentUpdate');
		return true;
	}

	//运行中render出发前
	componentWillUpdate(){
		console.log('HelloWord to componentWillUpdate');
	}

	tick(){
		this.setState({count: this.state.count + 1});
	}

	//加载组件
	render(){
		console.log('HelloWord to render');
		return <div ref='childp'>
					Hello,
					{
						(function(obj){

							if(obj.props.name){
								return obj.props.name;
							}
							else{
								return "world";
							}

						})(this)
					}
					<a className='ml' href='/other'>go to other</a>

					<div onClick = {this.tick.bind(this)} style={{cursor: 'pointer'}}>
						Clicks: {this.state.count}
			        </div>

			        <div>
			        	ready: {this.state.src}
			        </div>


			        <br/>
				</div>;
	}

	//初始后组件加载完成
	componentDidMount(){
		console.log('HelloWord to componentDidMount');
		$(ReactDom.findDOMNode(this)).append("HelloWord to componentDidMount!");
	}

	//运行中组件加载完成
	componentDidUpdate(){
		console.log('HelloWord to componentDidUpdate');
	}

	//销毁前
	componentWillUnmount(){
		console.log('HelloWord to componentWillUnmount');
	}
}



class HelloUniverse extends React.Component{

	static defaultProps = {
		autoPlay: false,
		maxLoops: 10,
		posterFrameSrc: 'abc',
		videoSrc: '/',
		initialCount: 0,
		targName: null,
	}
	
	static propTypes = {
		autoPlay: React.PropTypes.bool.isRequired,
		maxLoops: React.PropTypes.number.isRequired,
		posterFrameSrc: React.PropTypes.string.isRequired,
		videoSrc: React.PropTypes.string.isRequired,
		initialCount: React.PropTypes.number.isRequired,
		targName: React.PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			count: props.initialCount,
			src: props.posterFrameSrc,
			name: props.targName,
		};

		console.log('HelloUniverse to constructor');
	}

	//组件将要加载时
	componentWillMount(){
		console.log('HelloUniverse to componentWillMount');
		this.setState({
			count: this.state.count + 1,
			src: '/user',
		});
	}

	//组件接收到舒心
	componentWillReceiveProps(){
		console.log('HelloUniverse to componentWillReceiveProps');
	}

	//组件接受到新属性状态触发（可判断组件是否更新）
	shouldComponentUpdate(){
		console.log('HelloUniverse to shouldComponentUpdate');
		return true;
	}

	//运行中render出发前
	componentWillUpdate(){
		console.log('HelloUniverse to componentWillUpdate');
	}

	handleChange(event){
		this.setState({name: event.target.value});
	}

	//加载组件
	render(){
		console.log('HelloUniverse to render');

		if(this.state.name == "123"){
			return <div>销毁</div>
		}

		return <div>


			        <HelloWord name={this.state.name} />

			        <input type="text" onChange = {this.handleChange.bind(this)}/>
				</div>;
	}


	//初始后组件加载完成
	componentDidMount(){
		console.log('HelloUniverse to componentDidMount');
	}

	//运行中组件加载完成
	componentDidUpdate(){
		console.log('HelloUniverse to componentDidUpdate');
	}

	//销毁前
	componentWillUnmount(){
		console.log('HelloUniverse to componentWillUnmount');
	}
}



// var rawHTML = {
//      __html: "<h1>I’m inner HTML</h1>"
// }

// //es6 这两个属性如果需要写入class 必须加上static
// HelloWord.propTypes={//属性校验器，表示改属性必须是number，否则报错
//   initialCount: React.PropTypes.number,
// }

// HelloWord.defaultProps={initialCount:0};//设置默认属性


// ReactDom.render(
// 	<div dangerouslySetInnerHTML={rawHTML}></div>,
//   document.getElementById('app')
// );

ReactDom.render(
  <HelloUniverse/>,
  document.getElementById('app')
);


// module.exports.HelloWord = HelloWord;

