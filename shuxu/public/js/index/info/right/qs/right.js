import React from 'react'
import { Link } from 'react-router'
import Chart from './chart.js'
import Step1_info from './step1_info.js'
import Step2_info from './step2_info.js'

export default class Right extends React.Component {
  render() {

    return (
        <div className="qs_right">
	        <Chart type={this.props.type}></Chart>
	        <div className="step1">
	            帐户影响力排名
	        </div>
	        <Step1_info></Step1_info>
	        <div className="step2">
	            文章影响力排名
	        </div>
	        <Step2_info></Step2_info>
	        <div className="showMore"><div className="last jtb"></div><span>显示更多信息</span></div>
        </div>
    )
  }
}

