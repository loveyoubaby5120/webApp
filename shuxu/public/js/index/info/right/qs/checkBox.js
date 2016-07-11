import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'

export default class CheckBox extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			topicArray: this.props.topicArray,
			topic: [],
            type: this.props.type
		};
    }

    componentWillMount(){
		this.getTopic()
    }

    componentWillReceiveProps(newProps){
    	this.state.type = newProps.type;
    	this.getTopic()
    }

    getTopic(){
        var _this = this;
        $.ajax({
            url: '/topic_hot?gzh_type='+this.state.type,
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

    onChangeTopic(val,event){
    	var input = ReactDom.findDOMNode(this.refs.input_box).getElementsByTagName('input');
    	var newState = [];
    	for(var checkBox of input){
    		if(checkBox.checked){
	    		newState.push(checkBox.value);
    		}
    	}
	    this.setState({
	    	topicArray: newState
	    });
	    this.props.callbackParent(newState);
  	}


  	render() {

	    return (
	    	<div ref='input_box' className='input_box'>
                <div>热度话题</div>
                {
					(function(obj){
						var a = [];
						obj.state.topic.forEach(function(data,index){
                            a.push(<span key={index}><input type='checkbox' name="keyall" value={data.artcle_topic_id} id={index} onClick={obj.onChangeTopic.bind(obj)} /><label htmlFor={index}>{data.topic_name}</label></span>);
				        });
				        return a;
					})(this)
					 
				}
            </div>
	    )
  	}
}

