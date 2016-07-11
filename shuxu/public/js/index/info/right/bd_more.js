import React from 'react'
import { Link } from 'react-router'

export default class Bd_more extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            nodes: [],
            limitNum: 30,
            type: this.props.type,
            clickText: '点击加载更多',
            changeClick: false
        }
    }

    componentDidMount(){
        this.state.limitNum = 30;
        this.setNodes();

        $('.options .query').mouseover(function(){
            var _this = $(this);
            $(this).find('.select').show();
            $(this).find('.select').on('click','.option',function(){
                _this.find('.ok').text($(this).text());
                _this.find('.select').hide();
            });
        }).mouseout(function(){
            $(this).find('.select').hide();
        });
    }

    //组件接收到属性
    componentWillReceiveProps(newProps){
        this.state.limitNum = 30;
        this.state.type = newProps.type;
        this.setNodes();
    }


    setNodes(){
        var _this = this;
        _this.setState({
            // nodes: []
        });
        $.ajax({
            url: '/gzh_profile_list?limitNum='+this.state.limitNum+'&type='+this.state.type,
            async:true,
            success: function(datas){
                _this.setState({
                    datas: datas,
                    nodes: [],
                    limitNum: _this.state.limitNum,
                    type: _this.state.type
                });


                var options = [];
                var num = _this.state.nodes.length;
                datas.forEach(function(data,index){
                    var node;
                    // node = <tr className="even">
                    //                 <td></td>
                    //                 <td>
                    //                     <div className="number">1</div>
                    //                 </td>
                    //                 <td className="text "><div>卡娃微卡</div></td>
                    //                 <td className="text "><div>kawa01</div></td>
                    //                 <td className="text "><div>4.28</div></td>
                    //                 <td className="text "><div>15.21</div></td>
                    //                 <td className="text "><div>15.21</div></td>
                    //                 <td className="last "><div>1.00</div></td>
                    //                 <td className="text goto_info"><a href="javascript:;">进入&nbsp;></a></td>
                    //                 <td></td>
                    //             </tr>;

                    var td = React.createElement('td');

                    var div2;
                    if((index+num) >4){
                        div2 = React.createElement('div',{className:'number'},index+num+1);
                    }
                    else{
                        div2 = React.createElement('div',{className:'number number2'},index+num+1);   
                    }
                    
                    var td2 = React.createElement('td',{className:'first'},div2);

                    var div3 = React.createElement('div',null,data.nick_name);
                    var td3 = React.createElement('td',{className:'text'},div3);

                    var div4 = React.createElement('div',null,data.english_id);
                    var td4 = React.createElement('td',{className:'text'},div4);

                    var div5 = React.createElement('div',null,'--');
                    var td5 = React.createElement('td',{className:'text'},div5);
                    
                    var div6 = React.createElement('div',null,'--');
                    var td6 = React.createElement('td',{className:'text'},div6);
                    
                    var div7 = React.createElement('div',null,data.w_index);
                    var td7 = React.createElement('td',{className:'text'},div7);
                    
                    // var div8 = React.createElement('div',null,'--');
                    // var td8 = React.createElement('td',{className:'text'},div8);
                    
                    var a9 = React.createElement('a',{href:"/index_info?gzh_id="+data.id},'查看');
                    var td9 = React.createElement('td',{className:'text goto_info last'},a9);
                    
                    var div10 = React.createElement('div',null,'100%');
                    var td10 = React.createElement('td',{className:'text'},div10);


                    if((index+num)%2==0){
                        var tr = React.createElement('tr',{className:'even',key:index},td2,td3,td4,td5,td6,td7,td10,td9);
                    }
                    else{
                        var tr = React.createElement('tr',{className:'',key:index},td2,td3,td4,td5,td6,td7,td10,td9);
                    }


                    options.push(tr);


                });

                

                _this.setState({
                    nodes: _this.state.nodes.concat(options),
                });

                if(isNaN(_this.state.limitNum)){
                    _this.setState({
                        changeClick:true
                    })
                }

            }
        });
        
    }

    showAll(event){
        this.state.clickText = '加载中……';
        this.state.limitNum = '*';
        this.setNodes();
    }


    render() {
        return (
            <div className={this.props.show=='bd_more' ? "table blur auto" : "table blur none"}>
                <div className="formOptions">
                    <div className="options">
                        <div className="query">
                            <a className='ok' href="javascript:;">年龄</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option">年龄</li>
                                <li className="option">年轻</li>
                                <li className="option">成熟</li>
                            </ul>
                        </div>
                         <div className="query">
                            <a className='ok' href="javascript:;">车价</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option">车价</li>
                                <li className="option">高配</li>
                                <li className="option">经济</li>
                            </ul>
                        </div>
                         <div className="query">
                            <a className='ok' href="javascript:;">地域</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option">地域</li>
                                <li className="option">北京</li>
                                <li className="option">上海</li>
                            </ul>
                        </div>
                        <div className="query submit">
                            <a className='ok' href="javascript:;">提交</a>
                        </div>
                        <div className="date">
                            <span className="time">2016年7月8日</span>
                            <div className="query">
                                <a className='ok' href="javascript:;">最近30天</a><span className='down'>ˇ</span>
                                <ul className="select">
                                    <li className="option">最近7天</li>
                                    <li className="option">最近30天</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="bc">
                    <thead>
                        <tr>
                            <th className="w_10 first"><div><p className="">排名</p></div></th>
                            <th className="w_15"><div><p className="">微信名称</p></div></th>
                            <th className="w_15"><div><p className="">微信账号</p></div></th>
                            <th className="w_15"><div><p className="">粉丝黏性</p></div></th>
                            <th className="w_15"><div><p className="">增长潜力</p></div></th>
                            <th className="w_20"><div><p className="">影响指数</p></div></th>
                            <th className="w_10"><div><p className="">相关性<span>?</span></p></div></th>
                            <th className="w_15 last"><div><p className="">查看详细</p></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nodes}
                    </tbody>
                </table>
                <div className={this.state.changeClick || this.state.datas.length<this.state.limitNum ? 'showMore none' : 'showMore'} onClick={this.showAll.bind(this)} ><span>{this.state.clickText}{this.state.datas.length<this.state.limitNum}</span></div>
            </div>    
        )
    }
}

