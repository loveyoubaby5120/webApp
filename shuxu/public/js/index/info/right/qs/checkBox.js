import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'

export default class CheckBox extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			topicArray: this.props.topicArray,
            topicDateTime: 30,
			topic: [],
            type: this.props.type
		};
    }

    componentWillMount(){
		this.getTopic()
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

        _this.setState({
            topic: [
                {topic_id: 1,topic_name: '公车改革',topic_color: 'rgb(179, 0, 0)'},
                {topic_id: 2, topic_name: '召回',topic_color: 'rgb(227, 74, 51)'},
                {topic_id: 3, topic_name: '销量领跑',topic_color: 'rgb(252, 141, 89)'},
                {topic_id: 4, topic_name: '新能源',topic_color: 'rgb(253, 187, 132)'}
            ]
        });


        $.ajax({
            url: '/topic?gzh_type='+this.state.type,
            async: true,
            success: function(data){
                _this.setState({
                    topic: data
                });
            },
            error: function(msg){
                console.log(msg);
            }
        });

    }

    onChangeTopic(){
    	var input = ReactDom.findDOMNode(this.refs.input_box).getElementsByTagName('input');
    	var newState = [];
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
	    this.props.callbackParent(newState, topicDateTime);
  	}


  	render() {

	    return (
	    	<div ref='input_box' className='input_box'>
                <div className="formOptions">
                    <div className="options">
                        <div className="date">
                            <span className="time">2016年7月8日</span>
                            <div className="query">
                                <a className='ok topicDateTime' href="javascript:;" data-value='30'>最近30天</a><span className='down'>ˇ</span>
                                <ul className="select">
                                    <li className="option" onClick={this.onChangeTopic.bind(this)} data-value='7'>最近7天</li>
                                    <li className="option" onClick={this.onChangeTopic.bind(this)} data-value='30'>最近30天</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="options">
                        <div className="topic_title">热度话题</div>
                            {
                                (function(obj){
                                    var a = [];
                                    obj.state.topic.forEach(function(data,index){
                                        a.push(<label className="query checkbox" key={index} htmlFor={index}><input type='checkbox' name="keyall" defaultChecked value={data.topic_id} id={index} onClick={obj.onChangeTopic.bind(obj)} /><div className="color" style={{'backgroundColor': data.topic_color}}></div><label htmlFor={index}>{data.topic_name}</label></label>);
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

