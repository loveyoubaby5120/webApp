import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            datas: [{"time":"--","gzhCount":'--',"artCount":'--',"readSum":'--'}]
        };
    }


    componentDidMount(){
        
        var _this = this;
        $.ajax({
            url: '/map',
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
          <div className="header">
            <div className="header_info">
                <ul>
                    <li>
                        <div>
                            <p className="top">统计截止</p>
                            <p className="bottom transform_scale">{this.state.datas[0].time}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className="top">样本数量</p>
                            <p className="bottom transform_scale">{this.state.datas[0].gzhCount}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className="top">热文数量</p>
                            <p className="bottom transform_scale">{this.state.datas[0].artCount}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className="top">阅读数量</p>
                            <p className="bottom transform_scale">{this.state.datas[0].readSum}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

