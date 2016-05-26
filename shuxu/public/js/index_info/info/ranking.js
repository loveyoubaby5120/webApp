import React from 'react'
import { Link } from 'react-router'

export default class Ranking extends React.Component {


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

    }



    render() {

        return (
            <div className="ranking">
                    <ul className="map">
                        <li className="item zpm">
                            <p className="title">总排名</p>
                            <p className="num">59</p>
                        </li>
                        <li className="item yxlzs">
                            <p className="title">影响力指数<span>?</span></p>
                            <p className="num">695</p>
                        </li>
                        <li className="item hypm">
                            <p className="title">行业排名</p>
                            <p className="num">13</p>
                        </li>
                        <li className="item lszgzpm">
                            <p className="title">历史最高总排名</p>
                            <p className="num">17</p>
                        </li>
                        <li className="item lszghypm">
                            <p className="title">历史最高行业排名</p>
                            <p className="num">4</p>
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

