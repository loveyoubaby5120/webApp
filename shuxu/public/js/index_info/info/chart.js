import React from 'react'
import { Link } from 'react-router'

export default class Chart extends React.Component {
  render() {

    return (
        <div className="chart">
            <div className="date_check">
                <div className="select_data1">
                    <select>
                        <option>最近30天</option>
                        <option>最近60天</option>
                    </select>
                </div>
                <div className="dateTime">
                    <span>
                         <input type="text" id="periodpickerstart2"/>
                    </span>
                </div>
            </div>
            <ul>
                <li className="item first"><a href="javascript:;">总阅读数</a></li>
                <li className="item"><a href="javascript:;">头条阅读数</a></li>
                <li className="item"><a href="javascript:;">平均阅读数</a></li>
                <li className="item"><a href="javascript:;">影响力指数</a></li>
                <li className="item active"><a href="javascript:;">发文数</a></li>
                <li className="item"><a href="javascript:;">预测粉丝数</a></li>
                <li className="item"><a href="javascript:;">预测转发数</a></li>
                <li className="item"><a href="javascript:;">点赞数</a></li>
            </ul>
            <div id="main2" className="echart" style={{width: '798px',height:'400px',border: '1px #e6e6e6 solid'}}></div>
        </div>
    )
  }
}

