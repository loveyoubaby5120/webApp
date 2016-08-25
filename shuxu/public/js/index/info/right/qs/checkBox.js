import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'

export default class CheckBox extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			topicArray: this.props.topicArray,
            topicColor: [],
            topicDateTime: 30,
			topic: [],
            type: this.props.type
		};
    }

    componentWillMount(){
		this.getTopic()
    }

    componentDidMount(){
    }

    componentWillReceiveProps(newProps){
        if(this.state.type != newProps.type){
            this.state.type = newProps.type;
            this.getTopic();
        }
    }

    getTopic(){
        var _this = this;
        if(this.state.type==0){
            return false;
        }

        var topicDateTime = ReactDom.findDOMNode(this.refs.input_box).getElementsByClassName('topicDateTime')[0].getAttribute('data-value');

        $.ajax({
            url: '/topic?gzh_type=' + this.state.type + '&topicDateTime=' + topicDateTime,
            async: true,
            success: function(data){
                var topicColor = ['rgb(179, 0, 0)','rgb(227, 74, 51)','rgb(252, 141, 89)','rgb(253, 187, 132)'];

                _this.setState({
                    topic: data,
                    topicColor: topicColor
                });
                var newData = [];
                data.forEach(function(d){
                    newData.push(d.id);
                });
                _this.props.callbackParent(newData, topicColor, topicDateTime);
            },
            error: function(msg){
                console.log(msg);
            }
        });

    }

    onChangeTopic(index){
        if(index==1){
            this.getTopic();
            return false;
        }
    	var input = ReactDom.findDOMNode(this.refs.input_box).getElementsByTagName('input');
    	var newState = [];
        var topicColor = [];
        topicColor = this.state.topicColor;
    	for(var checkBox of input){
    		if(checkBox.checked){
	    		newState.push(checkBox.value);
    		}
    	}

        var topicDateTime = ReactDom.findDOMNode(this.refs.input_box).getElementsByClassName('topicDateTime')[0].getAttribute('data-value');
	    this.setState({
	    	topicArray: newState,
            topicDateTime: topicDateTime
	    });
	    this.props.callbackParent(newState, topicColor, topicDateTime);
  	}


  	render() {

	    return (
	    	<div ref='input_box' className='input_box'>
                <div className="formOptions">
                    <div className="options">
                        <div className="date">
                            <div className="query">
                                <a className='ok topicDateTime' href="javascript:;" data-value='7'>最近7天</a><span className='down'>ˇ</span>
                                <ul className="select">
                                    <li className="option" onClick={this.onChangeTopic.bind(this, 1)} data-value='7'>最近7天</li>
                                    <li className="option" onClick={this.onChangeTopic.bind(this, 1)} data-value='30'>最近30天</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="options">
                        <div className="topic_title">热度话题</div>
                            { this.state.topic.length == 0 ? '暂无话题' : ""}
                            {
                                (function(obj){
                                    var a = [];
                                    var topicColor = obj.state.topicColor;
                                    obj.state.topic.forEach(function(data,index){

                                        a.push(<label className="query checkbox" key={index} htmlFor={index}><input type='checkbox' name="keyall" defaultChecked value={data.id} id={index} onChange={obj.onChangeTopic.bind(obj, 2)} /><div className="color" style={{'backgroundColor': topicColor[index]}}></div><label htmlFor={index}>{data.name}</label></label>);
                                    });
                                    return a;
                                })(this)
                                 
                            }
                    </div>
                </div>
            </div>
	    )
  	}
}

