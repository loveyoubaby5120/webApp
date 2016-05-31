import React from 'react'
import { Link } from 'react-router'

export default class Ranking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zpm: '--',
            yxlzs: '--',
            hypm: '--',
            lszgzpm: '--',
            lszghypm: '--'
        }
    }

    componentDidMount(){

        jQuery('#periodpickerstart').periodpicker({
            lang: 'zh-cn',
            norange: false, // use only one value
            cells: [1, 2], // show only one month
            resizeButton: true, // deny resize picker
            fullsizeButton: true,
            fullsizeOnDblClick: true,

            clearButtonInButton:true,
            timepicker: false, // use timepicker
            timepickerOptions: {
                hours: true,
                minutes: true,
                seconds: false,
                ampm: true
            },
            // onAfterShow
            // onOkButtonClick
             onOkButtonClick: function () {
                // var val = this.startinput.val();
                var dates = jQuery('#periodpickerstart').periodpicker('value');

                // dates[0] dates[1]

                // console.log(dates[0].toISOString().slice(0,10));

                // console.log(dates[0].toLocaleDateString());

                // var y = dates[0].getFullYear();  
                // var m = dates[0].getMonth() + 1;  
                // m = m < 10 ? '0' + m : m;  
                // var d = dates[0].getDate();  
                // d = d < 10 ? ('0' + d) : d;
                // console.log(y + '-' + m + '-' + d);

            }
        });



        jQuery('#periodpickerstart').periodpicker('value', '2016/03/12');



        var myChart = echarts.init(document.getElementById('main2'));

        this.state = {
            myChart: myChart,
            type: 1,
            legendNames:[]
        }


         var XD = (function (){
                var x = []
                var res = [];
                var date = [];
                var len = 30;
                while (len--) {
                    res.unshift(0);
                    date.unshift('');
                }
                x.push(res);
                x.push(date);
                return x;
            })()


        this.onChart(myChart,false,XD);
        this.state.myChart.clear();
        this.accessChange(30);

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
                        dataView : {show: true, readOnly: false},
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
                        type:'bar',
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
                _this.onChart(_this.state.myChart,false,data);
            }
        });

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
                                <select>
                                    <option>最近30天</option>
                                    <option>最近60天</option>
                                </select>
                            </div>
                            <div className="dateTime">
                                <span>
                                    <input type="text" id="periodpickerstart"/>
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

