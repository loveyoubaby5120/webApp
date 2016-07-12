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

                $('#app>div>.content>.info>.left>.item>a').hover(function(){
                    $(this).css({"background-image" : $(this).attr('data-hover')});
                },function(){
                    $(this).css({"background-image" : $(this).attr('data-now')});
                });

            }
        })

        

    }


    onClick(val){
        $('#app>div>.content>.info>.left>.item').removeClass('active');
        $('#app>div>.content>.info>.left>.item>a').each(function(){
            $(this).css({"background-image" : $(this).attr('data-background')})
                .attr('data-now',$(this).attr('data-background'));
        });
        $('#app>div>.content>.info>.left>.item:eq('+(val-1)+')')
            .addClass('active')
            .find('a')
            .css({"background-image" : function(){

                return $(this).attr('data-hover')
            }})
            .attr('data-now',function(){
                return $(this).attr('data-hover')
            });
        var newState = val;
        this.setState({
            datas: this.state.datas,
            type: newState
        });
        this.props.callbackParent(newState);

    }


    render() {
        
        var options = [];
        var _this = this;
        this.state.datas.forEach(function(data,index){
            var name = data.id;
            var background = `url('../images/type_${name}.png')`;
            var background_hover = `url('../images/type_${name}_2.png')`;
            options.push(<li key={index} className={_this.state.type==data.id ? "item active" : "item"} onClick={_this.onClick.bind(_this,data.id)}><a href="javascript:;" style={{"backgroundImage": background}} data-background={background} data-hover={background_hover} data-now={background}>{data.name}</a></li>);
        });
        return (
            <ul className="left">
                <li className="title">行业</li>
                {options}
            </ul>
        )
    }
}

