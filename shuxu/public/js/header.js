import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {

    return (
      <div className="header">
        <div className="header_info">
            <ul>
                <li>
                    <div>
                        <p className="top">统计截止</p>
                        <p className="bottom transform_scale">3月22日 12时整</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p className="top">样本数量</p>
                        <p className="bottom transform_scale">55555555</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p className="top">热文数量</p>
                        <p className="bottom transform_scale">55555555</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p className="top">阅读数量</p>
                        <p className="bottom transform_scale">55555555</p>
                    </div>
                </li>
            </ul>
            <div className="introducing"">
                数据说明
            </div>
        </div>
    </div>
    )
  }
}

