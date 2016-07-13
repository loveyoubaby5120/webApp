import React from 'react'
import { Link } from 'react-router'
// import Chart from './chart.js'
import D3 from './d3.js'
import CheckBox from './checkBox.js'
import Step1_info from './step1_info.js'
import Step2_info from './step2_info.js'

export default class Right extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
          topicArray: []
        }
  }



   onTopic(newState){
      this.setState({
        topicArray: newState
      });

  }

  render() {

    return (
        <div className="qs_right">
        	<CheckBox type={this.props.type} topicArray={this.state.topicArray} callbackParent={this.onTopic.bind(this)}></CheckBox>
	        <D3 type={this.props.type} topicArray = {this.state.topicArray}></D3>
	        <div className="step2">
	            文章影响力排名
	        </div>
	        <Step2_info type={this.props.type} topicArray = {this.state.topicArray}></Step2_info>
        </div>
    )
  }
}

