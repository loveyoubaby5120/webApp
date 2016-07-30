import React from 'react'
import { Link } from 'react-router'

export default class Step2_info extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            option:[],
            type: this.props.type,
            topicArray: this.props.topicArray,
            topicDateTime: this.props.topicDateTime
        }

    }

    componentWillMount(){
        this.getArticle()
    }

    componentWillReceiveProps(newProps){
        if(newProps.type==0){
            return false;
        }

        // if(this.state.type != newProps.type || this.state.topicArray != newProps.topicArray.join(',')){
            this.state.topicArray = newProps.topicArray;
            this.state.type = newProps.type;
            this.state.topicDateTime = newProps.topicDateTime;
            this.getArticle();
        // }
    }


    getArticle(){
         if(this.state.type==0){
            return false;
        }
        var _this = this;
        $.ajax({
            url: '/article_profile_list?topicArray='+this.state.topicArray+'&topicDateTime='+this.state.topicDateTime,
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
                <ul className={ this.state.topicArray.length == 0 ? 'step2_info none' : "step2_info"}>
                    {this.state.option}
                </ul>
            )
    }
}

