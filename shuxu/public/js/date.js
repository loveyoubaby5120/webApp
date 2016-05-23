import React from 'react'
import { Link } from 'react-router'

export default class Date extends React.Component {
  render() {

    return (
        <div className="date">
            <div className="date_info">
                <div className="select_data1">

                    <a className='ok' href="javascript:;">最近30天</a><span className='down'>ˇ</span>
                    <ul className="select">
                        <li className="option">最近30天</li>
                        <li className="option">最近60天</li>
                    </ul>
                </div>
                <div>
                    <span className="date_num">2</span>
                    <span className="date_num">0</span>
                    <span className="date_num">1</span>
                    <span className="date_num">6</span>
                    <span>年</span>
                    <span className="date_num">0</span>
                    <span className="date_num">4</span>
                    <span>月</span>
                    <span className="date_num">1</span>
                    <span className="date_num">5</span>
                    <span>日</span>
                    <span></span>
                    <span className="down">ˇ</span>
                </div>
            </div>
        </div>
    )
  }
}

