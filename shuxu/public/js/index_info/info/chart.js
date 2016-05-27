import React from 'react'
import { Link } from 'react-router'

export default class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 1
        }
    }

    componentDidMount(){

        jQuery('#periodpickerstart2').periodpicker({
            ang: 'zh-cn',
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
             onOkButtonClick: function () {
                var dates = jQuery('#periodpickerstart').periodpicker('value');
                // dates[0] dates[1]
                console.log(dates[0].toISOString().slice(0,10));

            }

        });


        jQuery('#periodpickerstart2').periodpicker('value', '2016/03/12');

        var myChart = echarts.init(document.getElementById('main2'));

        this.state = {
            myChart: myChart,
            type: 1
        }

        this.onChart(myChart,false,[[0,0,0,0,0,0,0,0,0,0,0,0],['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']]);

        this.access(this.state.type);

       
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
                    data:['发文数']
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
                        name:'发文数',
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

    access(type){
        this.setState({
            type: type
        });
        var array;
        var _this = this;
        $.ajax({
            url: '/chart_Days_info?gzh_id='+this.props.gzh_id+'&type='+type,
            async: true,
            success: function(data){
                for(var i = data[0].length-1; i >=0;i--){
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
        });

    }


    accessChange(type){
        this.setState({
            type: type
        });
        var array;
        $.ajax({
            url: '/chart_Days_info?gzh_id='+this.props.gzh_id+'&type='+type,
            async: false,
            success: function(data){
                array = data;
            }
        });

        return array;
    }


    onClickDays(type){

        var array = this.accessChange(this.state.type);

        this.onChart(this.state.myChart,false,'days',array);

        
    }

    onClick(type){
        this.state.myChart.restore();

        this.access(type);
        
    }


    render() {

        return (
            <div className="chart">
                <div className="date_check">
                    <div className="select_data1">
                        <select onChange={this.onClickDays.bind(this)} ref='select'>
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
                    <li className={this.state.type==1 ? "item first active" : "item first"} onClick={this.onClick.bind(this,1)}><a href="javascript:;">总阅读数</a></li>
                    <li className={this.state.type==2 ? "item active" : "item"} onClick={this.onClick.bind(this,2)}><a href="javascript:;">头条阅读数</a></li>
                    <li className={this.state.type==3 ? "item active" : "item"} onClick={this.onClick.bind(this,3)}><a href="javascript:;">平均阅读数</a></li>
                    <li className={this.state.type==4 ? "item active" : "item"} onClick={this.onClick.bind(this,4)}><a href="javascript:;">影响力指数</a></li>
                    <li className={this.state.type==5 ? "item active" : "item"} onClick={this.onClick.bind(this,5)}><a href="javascript:;">发文数</a></li>
                    <li className={this.state.type==6 ? "item active" : "item"} onClick={this.onClick.bind(this,6)}><a href="javascript:;">预测粉丝数</a></li>
                    <li className={this.state.type==7 ? "item active" : "item"} onClick={this.onClick.bind(this,7)}><a href="javascript:;">预测转发数</a></li>
                    <li className={this.state.type==8 ? "item active" : "item"} onClick={this.onClick.bind(this,8)}><a href="javascript:;">点赞数</a></li>
                </ul>
                <div id="main2" className="echart" style={{width: '798px',height:'400px',border: '1px #e6e6e6 solid'}}></div>
            </div>
        )
    }
}

