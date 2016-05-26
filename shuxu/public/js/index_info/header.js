import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        
        var _this = this;
        $.ajax({
            url: '/map_info?gzh_id='+this.props.gzh_id,
            async:false,
            success: function(data){
                _this.state = {
                    datas: data
                };

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
                                <img src="images/hqkj.png" alt=""/>
                            </div>
                            <p className="fs_num">5,003,421</p>
                            <p className="fs">预测粉丝数<span>?</span></p>
                        </div>
                        <div className="header_left_content">
                            <p className="title">{this.state.datas[0].nick_name}</p>
                            <p className="wechat">微信号：{this.state.datas[0].haoyunmom}</p>
                            <p className="time">加入榜单时间：2016-01-01</p>
                            <p className="introduce">
                                腾讯认证：来自腾讯微博认证资料:主体：媒体;媒体名称：《环球科学》杂志社有限公司;组织机构代码证号：69774876-3 ;注册时间：2012年12月10日 ;纠纷解决指引： 1. 版权、商标权（如被抄袭、假冒商标）或人身权（如被侮辱、诽谤）：可通过PC端登录mp.weixin.qq.com -->底部“侵权投诉”进行维权；2. 其他合法权益：可根据详情信息进行协商，或以报案、诉讼、仲裁等方式解决。3. 司法机关、行政机关等因办案需要调取公众号注册信息的，腾讯将依法提供。
                            </p>
                            <p className="uri">简介：《科学美国人》独家授权中文版—《环球科学》杂志—www.huanqiukexue.com</p>
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
                                <li className="item">媒体机构</li>
                                <li className="item">期刊</li>
                            </ul>
                        </div>
                        <div className="code">
                            <img src="images/code.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

