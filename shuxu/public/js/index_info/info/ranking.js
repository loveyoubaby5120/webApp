import React from 'react'
import { Link } from 'react-router'

export default class Ranking extends React.Component {

    constructor(props) {
        super(props);
        var XD = (function (){
                var x = []
                var res = [];
                var date = [];
                var len = 7;
                while (len--) {
                    res.unshift(0);
                    date.unshift('');
                }
                x.push(res);
                x.push(date);
                return x;
            })()
        this.state = {
            zpm: '--',
            yxlzs: '--',
            hypm: '--',
            lszgzpm: '--',
            lszghypm: '--',
            XD: XD
        }
    }

    componentDidMount(){

        var myChart = echarts.init(document.getElementById('main1'));

        this.state = {
            myChart: myChart,
            type: 1,
            legendNames:[],
            zpm: this.state.zpm,
            yxlzs: this.state.yxlzs,
            hypm: this.state.hypm,
            lszgzpm: this.state.lszgzpm,
            lszghypm: this.state.lszghypm,
            XD: this.state.XD
        }


        this.onChart(myChart,false,this.state.XD);
        this.state.myChart.clear();
        this.accessChange(7);

    }

    onChart(myChart,re,XD){
        if(re)
            myChart.restore();

        var option = {
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:this.state.legendNames
                },
                toolbox: {
                    show : true,
                    feature : {
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : XD[1]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:this.state.legendNames[0],
                        type:'line',
                        data: XD[0],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };

            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    }



    accessChange(days){
        var _this = this;
        $.ajax({
            url: '/ranking_info?gzh_id='+this.props.gzh_id+'&days='+days,
            async: true,
            success: function(data){
                if(data[0].length==0){
                    _this.onChart(_this.state.myChart,false,_this.state.XD);
                }
                else{
                    _this.onChart(_this.state.myChart,false,data);
                }
            },
            error: function(msg){
                console.log(msg);
                this.onChart(myChart,false,this.state.XD);
            }
        });

    }

    onClickDays(even,type){
        this.state.myChart.clear(); 
        var num = even.target.value;
        console.log(num);
        this.accessChange(num);
    }

    render() {

        return (
            <div className="ranking">
                    <ul className="map">
                        <li className="item zpm">
                            <p className="title">总排名</p>
                            <p className="num">{this.state.zpm}</p>
                        </li>
                        <li className="item yxlzs">
                            <p className="title">影响力指数<span>?</span></p>
                            <p className="num">{this.state.yxlzs}</p>
                        </li>
                        <li className="item hypm">
                            <p className="title">行业排名</p>
                            <p className="num">{this.state.hypm}</p>
                        </li>
                        <li className="item lszgzpm">
                            <p className="title">历史最高总排名</p>
                            <p className="num">{this.state.lszgzpm}</p>
                        </li>
                        <li className="item lszghypm">
                            <p className="title">历史最高行业排名</p>
                            <p className="num">{this.state.lszghypm}</p>
                        </li>
                    </ul>
                    <div className="chart">
                        <div className="date_check">
                            <div className="select_data1">
                                <select onChange={this.onClickDays.bind(this)} ref='select'>
                                    <option value='7'>最近7天</option>
                                    <option value='30'>最近30天</option>
                                    <option value='60'>最近60天</option>
                                </select>
                            </div>
                            <div className="dateTime">
                                <span>
                                </span>
                            </div>
                            <div className="title">
                                影响力指数变化
                            </div>
                        </div>
                        <div id="main1" className="echart" style={{width: '798px',height:'400px',border: '1px #e6e6e6 solid'}}></div>
                    </div>
                </div>
        )
    }
}

