import React from 'react'
import { Link } from 'react-router'
import Ranking from './info/ranking.js'
import Chart from './info/chart.js'
import Statistics from './info/statistics.js'
import Step2_info from './info/step2_info.js'

export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          day: 7
        }
    }

    onchangeDay(newState){
        this.setState({
            day: newState
        });

    }

    render() {

        return (
            <div className="info">
    	        <Ranking gzh_id={this.props.gzh_id}></Ranking>
    	        <div className="step step1">
    	            <hr className="left" />
    	            <div>
    	                数据统计
    	            </div>
    	            <hr className="right" />
    	        </div>
    	        <Chart gzh_id={this.props.gzh_id} callbackParent={this.onchangeDay.bind(this)}></Chart>
    	        <Statistics gzh_id={this.props.gzh_id} day={this.state.day}></Statistics>
    	        <div className="step step2">
                    <hr className="left" />
                    <div>
                        七天热文
                    </div>
                    <hr className="right" />
                </div>
                <Step2_info gzh_id={this.props.gzh_id} type='1'></Step2_info>
                <div className="step step3">
                    <hr className="left" />
                    <div>
                        最新发布
                    </div>
                    <hr className="right" />
                </div>
                <Step2_info gzh_id={this.props.gzh_id} type='2'></Step2_info>
            </div>
        )
    }
}

