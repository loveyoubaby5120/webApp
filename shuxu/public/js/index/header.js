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
                        <div style={{'backgroundImage': 'url("../images/ybsl.png")'}}>
                            <p className="top">样本数量</p>
                            <p className="bottom">{!isNaN(this.state.datas[0].gzhCount) && this.state.datas[0].gzhCount > 10000 ? ((this.state.datas[0].gzhCount)/10000).toFixed(0) + '万' : this.state.datas[0].gzhCount}</p>
                        </div>
                    </li>
                    <li>
                        <div style={{'backgroundImage': 'url("../images/rwsl.png")'}}>
                            <p className="top">热文数量</p>
                            <p className="bottom">{!isNaN(this.state.datas[0].artCount) && this.state.datas[0].artCount > 10000 ? ((this.state.datas[0].artCount)/10000).toFixed(2) + '万' : this.state.datas[0].artCount}</p>
                        </div>
                    </li>
                    <li>
                        <div style={{'backgroundImage': 'url("../images/ydsl.png")', 'backgroundSize': '70px'}}>
                            <p className="top">阅读数量</p>
                            <p className="bottom">{!isNaN(this.state.datas[0].readSum) && this.state.datas[0].readSum > 100000000 ? ((this.state.datas[0].readSum)/100000000).toFixed(2) + '亿' : this.state.datas[0].readSum}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

