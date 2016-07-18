import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            datas: [
                {
                    "nick_name":"--",
                    "english_id":"--",
                    "biz":"--",
                    "qrcode":null,
                    "avatar":null,
                    "descrip":null,
                    "id":0,
                    "tag":null,
                    "source":0,
                    "type":0,
                    "name":"--"
                }
            ]
        };
    }


    componentDidMount(){
        var _this = this;
        $.ajax({
            url: '/map_info?gzh_id='+this.props.gzh_id,
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
                    <div className="header_left">
                        <div className="header_left_img">
                            <div>
                                <img src="" alt="" style={{'background': 'url("http://open.weixin.qq.com/qr/code/?username=' + this.state.datas[0].english_id + '") -170px -170px no-repeat'}}/>
                            </div>
                            <p className="fs_num">--</p>
                            <p className="fs">预测粉丝数<span>?</span></p>
                        </div>
                        <div className="header_left_content">
                            <p className="title">{this.state.datas[0].nick_name}</p>
                            <p className="wechat">微信号：{this.state.datas[0].english_id}</p>
                            <p className="wechat">认证: &nbsp;
                                {
                                    (function(obj){
                                        if(obj.state.datas[0].isAttestation){
                                            return <span><i style={{'backgroundImage': 'url("../images/icon_verify_success.png")'}}></i>&nbsp;{obj.state.datas[0].attestation}</span>;
                                        }
                                        else{
                                            return obj.state.datas[0].attestation;
                                        }
                                    })(this)
                                }
                            </p>
                            <p className="time">
                            </p>
                            <p className="introduce">
                                {this.state.datas[0].descrip}
                            </p>
                            <p className="uri">
                            </p>
                        </div>
                    </div>
                    <div className="header_right">
                        <div className="bd">
                            <p className="fl">榜单分类</p>
                            <p className="item">{this.state.datas[0].name}</p>
                        </div>
                        <div className="title">
                            <p className="explain">标签</p>
                            <ul className="map">
                            </ul>
                        </div>
                        <div className="code">
                            <img src={this.state.datas[0].biz!="--" ? "http://mp.weixin.qq.com/mp/qrcode?scene=10000004&size=102&__biz="+this.state.datas[0].biz : "/images/code.png"} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

