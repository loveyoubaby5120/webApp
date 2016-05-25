import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

export default class Info_Left extends React.Component {
    constructor(props) {
        super(props);
        var _this = this;
        $.ajax({
            url: '/gzh_type_List',
            async:false,
            success: function(data){
                _this.state = {
                    datas: data
                };

            }
        })

    }


    componentWillMount(){
        

    }

    componentDidMount(){

    }


    render() {
        var options = [];
        this.state.datas.forEach(function(data,index){
            if(index==0)
                options.push(<li className="item active"><a href="javascript:;">{data.name}</a></li>);
            else
                options.push(<li className="item"><a href="javascript:;">{data.name}</a></li>);
        });
        return (
            <ul className="left">
                <li className="title">行业</li>
                {options}
            </ul>
        )
    }
}

