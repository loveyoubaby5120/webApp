import React from 'react'
import { Link } from 'react-router'

export default class Chart extends React.Component {

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
            type: 1,
            XD: XD
        }
    }

    componentDidMount(){


        var myChart = echarts.init(document.getElementById('main2'));

        this.state = {
            myChart: myChart,
            type: 1,
            legendNames:['总阅读数'],
            XD: this.state.XD
        }


         


        // this.onChart(myChart,false,[[0,0,0,0,0,0,0,0,0,0,0,0],['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']]);
        this.onChart(myChart,false,this.state.XD);
        this.state.myChart.clear();
        this.accessChange(this.state.type,7);

       
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

    access(type,days){
        this.setState({
            type: type
        });
        var array;
        var _this = this;
        $.ajax({
            url: '/chart_days_info?gzh_id='+this.props.gzh_id+'&type='+type+'&days='+days,
            async: true,
            success: function(data){
                if(data[0].length==0){
                    _this.onChart(_this.state.myChart,false,_this.state.XD);
                }
                else{
                    for(var i = 0; i >=data[0].length-1;i--){
                        _this.state.myChart.addData([
                            [
                                0,        // 系列索引
                                data[0][i], // 新增数据
                                true,     // 新增数据是否从队列头部插入
                                false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            ]
                        ]);
                    }
                }
            }
        });

    }


    accessChange(type,days){
        this.setState({
            type: type
        });
        var _this = this;
        $.ajax({
            url: '/chart_days_info?gzh_id='+this.props.gzh_id+'&type='+type+'&days='+days,
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
                _this.onChart(_this.state.myChart,false,_this.state.XD);
            }
        });

    }


    onClickDays(even,type){
        this.state.myChart.clear(); 
        var num = even.target.value;
        this.accessChange(this.state.type,num);
        
        this.props.callbackParent(num);
    }

    onClick(type,legendName){
        // this.state.myChart.restore();
        this.state.myChart.clear(); 
        var legendNames = [];
        legendNames.push(legendName);
        this.setState({
            legendNames:legendNames
        });
        var num = this.refs.select.value;
        // this.access(type,num);
        this.accessChange(type,num);
        
    }


    render() {

        return (
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
                        数据统计
                    </div>
                </div>
                <div className='change_chart'>
                    <ul>
                        <li className={this.state.type==1 ? "item first active" : "item first"} onClick={this.onClick.bind(this,1,'总阅读数')}><a href="javascript:;">总阅读数</a></li>
                        <li className={this.state.type==2 ? "item active" : "item"} onClick={this.onClick.bind(this,2,'头条阅读数')}><a href="javascript:;">头条阅读数</a></li>
                        <li className={this.state.type==3 ? "item active" : "item"} onClick={this.onClick.bind(this,3,'平均阅读数')}><a href="javascript:;">平均阅读数</a></li>
                        <li className={this.state.type==4 ? "item active" : "item"} onClick={this.onClick.bind(this,4,'发文数')}><a href="javascript:;">发文数</a></li>
                        <li className={this.state.type==5 ? "item active" : "item"} onClick={this.onClick.bind(this,5,'预测粉丝数')}><a href="javascript:;">预测粉丝数</a></li>
                        <li className={this.state.type==6 ? "item active" : "item"} onClick={this.onClick.bind(this,6,'预测转发数')}><a href="javascript:;">预测转发数</a></li>
                        <li className={this.state.type==7 ? "item active" : "item"} onClick={this.onClick.bind(this,7,'点赞数')}><a href="javascript:;">点赞数</a></li>
                    </ul>
                    <div id="main2" className="echart" style={{width: '600px',height:'400px',border: '1px #e6e6e6 solid'}}></div>
                </div>
            </div>
        )
    }
}

