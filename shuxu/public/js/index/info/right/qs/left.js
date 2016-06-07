import React from 'react'
import { Link } from 'react-router'


export default class Left extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [[],[]],
            gzh_type: this.props.type,
            titleId: 0
        }
    }


    componentDidMount(){
         var _this = this;
        $.ajax({
            url: '/gzh_type_List',
            async:true,
            success: function(data){
                _this.setState ({
                    datas: data
                });

                if(data.length>0){
                    _this.onClick(data[0].id)
                }

            }
        })

    }


    onClick(val){
        var newState = val;
        this.setState({
            datas: this.state.datas,
            titleId: newState
        });
        this.props.callbackParent(newState);
    }

    render() {
         var options = [];
         var options2 = [];
        var _this = this;
        this.state.datas[0].forEach(function(data,index){
            options.push(<li key={index} className={_this.state.titleId==data.id ? "item active" : "item"}  onClick={_this.onClick.bind(_this,data.id)}><a href="javascript:;">{data.name}</a></li>);
        });

        this.state.datas[1].forEach(function(data,index){
            options.push(<li key={index} className={_this.state.titleId==data.id ? "item active" : "item"}  onClick={_this.onClick.bind(_this,data.id)}><a href="javascript:;">{data.name}</a></li>);
        });

        return (
            <ul className="qs_left">
                <li className="title bzrc">本周热词</li>
                <li className="jtb"></li>
                <li className="item top"><a href="javascript:;">题舆论走势</a></li>
                <li className="item active"><a href="javascript:;">互联网+</a></li>
                <li className="item"><a href="javascript:;">题舆论走势</a></li>
                <li className="item"><a href="javascript:;">题舆论走势</a></li>
                <li className="title dzbq">定制标签</li>
                <li className="jtb"></li>
                <li className="item top"><a href="javascript:;">题舆论走势</a></li>
                <li className="item"><a href="javascript:;">题舆论走势</a></li>
                <li className="item"><a href="javascript:;">题舆论走势</a></li>
                <li className="item"><a href="javascript:;">题舆论走势</a></li>
            </ul>
        )
    }
}

