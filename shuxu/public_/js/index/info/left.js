import React from 'react'
import { Link } from 'react-router'

export default class Info_Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            type: this.props.type
        };

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
            type: newState
        });
        this.props.callbackParent(newState);
        $('#app>div>.content>.info>.left>.item').removeClass('active');
        $('#app>div>.content>.info>.left>.item:eq('+(val-1)+')').addClass('active');
    }


    render() {
        
        var options = [];
        var _this = this;
        this.state.datas.forEach(function(data,index){
            options.push(<li key={index} className={_this.state.type==data.id ? "item active" : "item"}  onClick={_this.onClick.bind(_this,data.id)}><a href="javascript:;">{data.name}</a></li>);
        });
        return (
            <ul className="left">
                <li className="title">行业</li>
                {options}
            </ul>
        )
    }
}

