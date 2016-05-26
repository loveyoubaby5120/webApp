import React from 'react'
import { Link } from 'react-router'

export default class Step2_info extends React.Component {


    constructor(props) {
        super(props);
        var _this = this;
        $.ajax({
            url: '/article_profile_info?gzh_id='+this.props.gzh_id+'&type='+this.props.type,
            async:false,
            success: function(data){
                _this.state = {
                    datas: data
                };

            }
        })

    }


    onClick(url){
        window.open(url, "_blank");
    }


    render() {
        var option = [];
        var _this = this;
        this.state.datas.forEach(function(data,index){
            var node;
            node = <li key={index} className="item">
                        <div className="item_content">
                            <div className="topic" onClick={_this.onClick.bind(_this,data.url)}>
                            {data.title}
                            </div>
                            <div className="writer">
                                <span>原创</span>
                                <span>撰文 --</span>
                            </div>
                            <div className="introduce">
                                <p>
                                    {data.digest}
                                </p>
                            </div>
                        </div>
                        <div className="other">
                            <div className="other_left">{data.dateTime}</div>
                            <div className="other_right1">{data.read_num}</div>
                            <div className="other_right2">{data.zan_num}</div>
                        </div>
                    </li>

            option.push(node);
        });


    return (
            <ul className="step2_info">
                    {option}

                    
                </ul>
        )
    }
}

