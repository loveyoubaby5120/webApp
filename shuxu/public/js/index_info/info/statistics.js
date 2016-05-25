import React from 'react'
import { Link } from 'react-router'

export default class Statistics extends React.Component {
  render() {

    return (
        <div className="statistics">
                <ul className="type">
                    <li className="item">
                        <div className="num sjx1">6666</div>
                        <div className="title">发布次数</div>
                    </li>
                    <li className="xx"></li>
                    <li className="item">
                        <div className="num sjx2">6666</div>
                        <div className="title">发布次数</div>
                    </li>
                    <li className="xx"></li>
                    <li className="item">
                        <div className="num sjx3">6666</div>
                        <div className="title">10+发布</div>
                    </li>
                    <li className="xx"></li>
                    <li className="item last">
                        <div className="num sjx4">6666</div>
                        <div className="title">最高阅读数</div>
                    </li>
                </ul>
                <ul className="check">
                    <li className="sum">
                        <ol className="map">
                            <li className="item zj">
                                <p className="title"></p>
                                <p className="introduce">总计</p>
                            </li>
                            <li className="item yds">
                                <p className="title">阅读数</p>
                                <p className="introduce">10,598</p>
                            </li>
                            <li className="item ttyds">
                                <p className="title">头条阅读数</p>
                                <p className="introduce">6,598</p>
                            </li>
                            <li className="item dzs">
                                <p className="title">点赞数</p>
                                <p className="introduce">598</p>
                            </li>
                        </ol>
                    </li>
                    <li className="average">
                        <ol className="map">
                            <li className="item zj">
                                <p className="title"></p>
                                <p className="introduce">总计</p>
                            </li>
                            <li className="item yds">
                                <p className="title">阅读数</p>
                                <p className="introduce">10,598</p>
                            </li>
                            <li className="item ttyds">
                                <p className="title">头条阅读数</p>
                                <p className="introduce">6,598</p>
                            </li>
                            <li className="item dzs">
                                <p className="title">点赞数</p>
                                <p className="introduce">598</p>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
    )
  }
}

