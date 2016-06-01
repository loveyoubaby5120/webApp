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
                        <li className="item">
                            <div className="num sjx1">{this.state.datas.cs}</div>
                            <div className="title">发布次数</div>
                        </li>
                        <li className="xx"></li>
                        <li className="item">
                            <div className="num sjx2">{this.state.datas.ps}</div>
                            <div className="title">发文篇数</div>
                        </li>
                        <li className="xx"></li>
                        <li className="item">
                            <div className="num sjx3">{this.state.datas.sw}</div>
                            <div className="title">10w+发布</div>
                        </li>
                        <li className="xx"></li>
                        <li className="item last">
                            <div className="num sjx4">{this.state.datas.maxRead}</div>
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
                                    <p className="title"></p>
                                    <p className="introduce">平均</p>
                                </li>
                                <li className="item yds">
                                    <p className="title">阅读数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.sumRead/this.state.datas.count) ? Math.floor(this.state.datas.sumRead/this.state.datas.count) : 0}</p>
                                </li>
                                <li className="item ttyds">
                                    <p className="title">头条阅读数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.ttSumRead/this.state.datas.ttCount) ? Math.floor(this.state.datas.ttSumRead/this.state.datas.ttCount) : 0}</p>
                                </li>
                                <li className="item dzs">
                                    <p className="title">点赞数</p>
                                    <p className="introduce">{Math.floor(this.state.datas.sumZan/this.state.datas.count) ? Math.floor(this.state.datas.sumZan/this.state.datas.count) : 0}</p>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
        )
    }
}

