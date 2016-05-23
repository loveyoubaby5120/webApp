import React from 'react'
import { Link } from 'react-router'

export default class Step1_info extends React.Component {
  render() {

    return (
		<ul className="step1_info">
            <li className="item" >
                <div className="step1_left">
                    <img src="images/hqkj.png" alt=""/>
                    <div>
                        <p>环球科学ScientificAmerican</p>
                        <p>微信号：huanqiukexue</p>
                        <p className="btn">
                            <span className="btn_left">用户态度</span><span className="btn_right">正面</span>
                        </p>
                    </div>
                </div>
                <div className="step1_right">
                    <ul>
                        <li>
                            <p className="step1_title">预测粉丝数</p>
                            <p className="num">6,666,666</p>
                        </li>
                        <li className="center">
                            <p className="step1_title">相关阅读</p>
                            <p className="num">6,666,666</p>
                        </li>
                        <li>
                            <p className="step1_title">相关点赞</p>
                            <p className="num">6,666,666</p>
                        </li>
                    </ul>
                    <div>
                        <span>话题影响指数</span>
                        <i></i><i></i><i></i><i></i><i></i>
                    </div>
                </div>
            </li>
        </ul>
    )
  }
}

