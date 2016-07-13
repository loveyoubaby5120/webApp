import React from 'react'
import { Link } from 'react-router'

export default class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas:{"cs":'--',"ps":'--',"sw":'--',"count":'--',"maxRead":'--',"sumRead":'--',"sumZan":'--',"ttCount":'--',"ttSumRead":'--'}
        }

    }


    componentWillReceiveProps(newProps){
        var _this = this;
        $.ajax({
            url: '/statistics_info?gzh_id='+this.props.gzh_id+'&day='+newProps.day,
            async:true,
            success: function(data){
                _this.setState({
                    datas: data
                });

            }
        })
    }

    componentDidMount(){
        var _this = this;
        $.ajax({
            url: '/statistics_info?gzh_id='+this.props.gzh_id+'&day='+this.props.day,
            async:true,
            success: function(data){
                _this.setState({
                    datas: data
                });

            }
        })
    }


    render() {


        return (
            <div className="statistics">
                    <ul className="type">
                        <li className="item sjx1">
                            <div className="title">发布<br/>次数</div>
                            <div className="num">{this.state.datas.cs}</div>
                        </li>
                        <li className="item sjx2">
                            <div className="title">发文<br/>篇数</div>
                            <div className="num">{this.state.datas.ps}</div>
                        </li>
                        <li className="item sjx3">
                            <div className="title">10w+<br/>发布</div>
                            <div className="num">{this.state.datas.sw}</div>
                        </li>
                        <li className="item sjx4 last">
                            <div className="title">最&nbsp;&nbsp;&nbsp;高<br/>阅读数</div>
                            <div className="num">{this.state.datas.maxRead}</div>
                        </li>
                    </ul>
                    <ul className="check">
                        <li className="sum">
                            <ol className="map">
                                <li className="item zj">
                                    <p className="introduce">总计</p>
                                </li>
                                <li className="item yds">
                                    <p className="title">阅读数</p>
                                    <p className="introduce">{this.state.datas.sumRead}</p>
                                </li>
                                <li className="item ttyds">
                                    <p className="title">头条阅读数</p>
                                    <p className="introduce">{this.state.datas.ttSumRead}</p>
                                </li>
                                <li className="item dzs">
                                    <p className="title">点赞数</p>
                                    <p className="introduce">{this.state.datas.sumZan}</p>
                                </li>
                            </ol>
                        </li>
                        <li className="average">
                            <ol className="map">
                                <li className="item zj">
                                    <p className="introduce">平均</p>
                                </li>
                                <li className="item yds">
                                    <p className="title">阅读数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.sumRead/this.state.datas.count) ? Math.floor(this.state.datas.sumRead/this.state.datas.count) : '--'}</p>
                                </li>
                                <li className="item ttyds">
                                    <p className="title">头条阅读数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.ttSumRead/this.state.datas.ttCount) ? Math.floor(this.state.datas.ttSumRead/this.state.datas.ttCount) : '--' }</p>
                                </li>
                                <li className="item dzs">
                                    <p className="title">点赞数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.sumZan/this.state.datas.count) ? Math.floor(this.state.datas.sumZan/this.state.datas.count) : '--' }</p>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
        )
    }
}

