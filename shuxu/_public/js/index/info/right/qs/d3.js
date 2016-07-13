import React from 'react'
import { Link } from 'react-router'

export default class D3 extends React.Component {

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
            XD: XD,
            gzh_type: this.props.type
        }
    }

    componentDidMount(){


        var myChart = echarts.init(document.getElementById('main'));

        this.state = {
            myChart: myChart,
            type: 1,
            legendNames:['话题传播数量趋势'],
            XD: this.state.XD
        }


        this.onChart(myChart,false,this.state.XD);
        this.state.myChart.clear();
        this.accessChange(this.state.type,7);

       
    }

    componentWillReceiveProps(newProps){
        this.state.gzh_type = newProps.type;
        this.accessChange(this.state.type);
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



    accessChange(type){
        this.setState({
            type: type
        });
        var _this = this;
        
        // $.ajax({
        //     url: '/chart_days?gzh_type='+this.state.gzh_type+'&type='+type,
        //     async: true,
        //     success: function(data){
        //         if(data[0].length==0){
        //             _this.onChart(_this.state.myChart,false,_this.state.XD);
        //         }
        //         else{
        //             _this.onChart(_this.state.myChart,false,data);
        //         }
        //     },
        //     error: function(msg){
        //         console.log(msg);
        //         _this.onChart(_this.state.myChart,false,_this.state.XD);
        //     }
        // });

    }

    onClick(type,legendName){
        // this.state.myChart.restore();
        this.state.myChart.clear(); 
        var legendNames = [];
        legendNames.push(legendName);
        this.setState({
            legendNames:legendNames
        });
        this.accessChange(type);    
        
    }


    render() {

        return (
    		<div className="chart">

                <div id="main" style={{width: '530px',height:'400px'}}></div>
            </div>
        )
    }
}

