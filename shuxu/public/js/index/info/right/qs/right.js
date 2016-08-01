import React from 'react'
import { Link } from 'react-router'
import D3 from './d3.js'
import CheckBox from './checkBox.js'
import Step1_info from './step1_info.js'
import Step2_info from './step2_info.js'

export default class Right extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
          topicArray: [],
          topicColor: [],
          topicDateTime: 7
        }
  }



   onTopic(newState, topicColor, topicDateTime){
      this.setState({
        topicArray: newState,
        topicColor: topicColor,
        topicDateTime: topicDateTime
      });

  }

  render() {

    return (
        <div className="qs_right">
        	<CheckBox type={this.props.type} topicArray={this.state.topicArray} callbackParent={this.onTopic.bind(this)}></CheckBox>
	        <D3 type={this.props.type} topicArray = {this.state.topicArray} topicColor = {this.state.topicColor} topicDateTime = {this.state.topicDateTime} ></D3>
	        <div className={ this.state.topicArray.length == 0 ? 'step2 none' : "step2"}>
	            文章影响力排名
	        </div>
	        <Step2_info type={this.props.type} topicArray = {this.state.topicArray} topicDateTime = {this.state.topicDateTime}></Step2_info>
        </div>
    )
  }
}

