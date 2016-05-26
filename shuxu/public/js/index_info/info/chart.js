import React from 'react'
import { Link } from 'react-router'

export default class Chart extends React.Component {

    componentDidMount(){

        $('#periodpickerstart2').periodpicker({
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
                var dates = $('#periodpickerstart2').periodpicker('value');

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
    }


    render() {

        return (
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
                             <input type="text" id="periodpickerstart2"/>
                        </span>
                    </div>
                </div>
                <ul>
                    <li className="item first"><a href="javascript:;">总阅读数</a></li>
                    <li className="item"><a href="javascript:;">头条阅读数</a></li>
                    <li className="item"><a href="javascript:;">平均阅读数</a></li>
                    <li className="item"><a href="javascript:;">影响力指数</a></li>
                    <li className="item active"><a href="javascript:;">发文数</a></li>
                    <li className="item"><a href="javascript:;">预测粉丝数</a></li>
                    <li className="item"><a href="javascript:;">预测转发数</a></li>
                    <li className="item"><a href="javascript:;">点赞数</a></li>
                </ul>
                <div id="main2" className="echart" style={{width: '798px',height:'400px',border: '1px #e6e6e6 solid'}}></div>
            </div>
        )
    }
}

