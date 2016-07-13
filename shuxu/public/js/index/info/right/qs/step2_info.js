import React from 'react'
import { Link } from 'react-router'

export default class Step2_info extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            option:[],
            type: this.props.type,
            topicArray: this.props.topicArray.join(',')
        }

    }

    componentWillMount(){
        this.getArticle()
    }

    componentWillReceiveProps(newProps){
        if(this.state.type != newProps.type || this.state.topicArray != newProps.topicArray.join(',')){
            this.state.topicArray = newProps.topicArray.join(',');
            this.state.type = newProps.type;
            this.getArticle();
        }
    }


    getArticle(){
        var _this = this;
        $.ajax({
            url: '/article_profile_list?topicArray='+this.state.topicArray+'&type='+this.state.type,
            async:true,
            success: function(datas){
                
                var option = [];
                datas.forEach(function(data,index){
                    var node;
                    node = <li key={index} className="item">
                                <div className="item_content">
                                    <div className="topic" onClick={_this.onClick.bind(_this,data.url)} dangerouslySetInnerHTML={{__html: data.title}}>
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
                                    <div className="other_right3">{data.zan_num}</div>
                                    <div className="other_right4">原创撰文</div>
                                </div>
                            </li>

                    option.push(node);
                });

                _this.setState({
                    option: option
                });

            }
        })
    }


    onClick(url){
        window.open(url, "_blank");
    }


    render() {
        return (
                <ul className="step2_info">
                        {this.state.option}
                    </ul>
            )
    }
}

