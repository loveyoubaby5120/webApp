import React from 'react'
import { Link } from 'react-router'


Array.prototype.sum = function ()
{
 for (var sum = 0, i = 0; i < this.length; i++)sum += parseInt(this[i]);
 return sum
};

export default class Bd_more extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            nodes: [],
            show: this.props.show_2,
            limitNum: 30,
            type: this.props.type,
            clickText: '点击加载更多',
            changeClick: false,
            showClick: true
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
                // _this.find('.ok').data('value', $(this).data('value'));
                _this.find('.ok').attr('data-value', $(this).attr('data-value'));
            });
        }).mouseout(function(){
            $(this).find('.select').hide();
        });
    }

    //组件接收到属性
    componentWillReceiveProps(newProps){
        this.state.limitNum = 30;
        if(this.state.type != newProps.type){
            this.state.type = newProps.type;
            this.state.nodes = [];
            this.setNodes();
        }
    }


    setNodes(){

        if(this.state.type==0){
            return false;
        }

        var _this = this;
        this.state.clickText = '加载中……';
        _this.setState({
            // nodes: []
        });

        var option_value = '';
        var option_array = [];
        $(".query .check").each(function(index,item){
            option_value += $(item).attr('data-value');
            option_array.push($(item).attr('data-value'));
        })

        var arr = ["0000", "0001", "0010", "0011", "0020", "0021", "0100", "0101", "0110", "0111", "0120", "0121", "0200", "0201", "0210", "0211", "0220", "0221", "1000", "1001", "1010", "1011", "1020", "1021", "1100", "1101", "1110", "1111", "1120", "1121", "1200", "1201", "1210", "1211", "1220", "1221", "2000", "2001", "2010", "2011", "2020", "2021", "2100", "2101", "2110", "2111", "2120", "2121", "2200", "2201", "2210", "2211", "2220", "2221"];

        var rand = [0.56671891480997,0.4069043474304,0.48272507054858,0.84286083087458,0.21099197222432,0.55557662460747,0.59256508461785,0.077530864662272,0.34259844354475,0.46843126763982,0.96037766009587,0.7753326249194,0.70541290319777,0.903988211371,0.32007344873625,0.215680490814,0.20197179038169,0.1478657238874,0.81168816695534,0.98993461485483,0.64635579457803,0.82884218209835];

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

                if(_this.state.type == 4){

                     datas.sort(function(str,end){
                        var sum = option_array.sum();
                        var remark = str.remark || 1;
                        var index = (remark*10%sum).toFixed(0);
                        str.w_index = (str.w_index * rand[index]).toFixed(4);
                        return end.w_index -str.w_index;
                    })

                 }

                 datas.sort(function(str,end){
                    return end.w_index -str.w_index;
                 })


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
                    
                    var div10 = React.createElement('div',null, (100*Math.random()).toFixed(2) +'%');
                    var td10 = React.createElement('td',{className:'text'},div10);


                    if((index+num)%2==0){
                        var tr = React.createElement('tr',{className:'even',key:index},td2,td3,td4,td5,td6,td7,td10,td9);
                    }
                    else{
                        var tr = React.createElement('tr',{className:'',key:index},td2,td3,td4,td5,td6,td7,td10,td9);
                    }


                    options.push(tr);


                });

                

                var changeClick = false;
                var clickText = '暂无数据';
                var showClick = true;

                if(isNaN(_this.state.limitNum)){
                    showClick = false                    
                }
                
                if(datas.length>0){
                    clickText = '点击加载更多';
                    changeClick = true;
                }


                _this.setState({
                    nodes: _this.state.nodes.concat(options),
                    changeClick: changeClick,
                    clickText: clickText,
                    showClick: showClick
                });
                

            }
        });
        
    }

    showAll(event){
        if(!this.state.changeClick){
            return false;
        }
        this.state.changeClick = false;
        this.state.limitNum = '*';
        this.setNodes();
    }

    onChangeShow(val,event){
        var newState = val;
        this.setState({
            show: newState
        });
        this.props.callbackParent(newState);
    }

    onChangeData(){
        if(!this.state.changeClick){
            return false;
        }
        this.state.changeClick = false;
        this.setNodes();
    }

    render() {
        return (
            <div className={this.props.show=='bd_more' ? "table blur auto" : "table blur none"}>
                <div className={this.state.type=='4' ? "formOptions" : "formOptions none"}>
                    <div className="options">
                        <div className="query">
                            <a className='ok check' href="javascript:;" data-value='0'>年龄</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option" data-value='0'>年龄</li>
                                <li className="option" data-value='1'>年轻</li>
                                <li className="option" data-value='2'>成熟</li>
                            </ul>
                        </div>
                         <div className="query">
                            <a className='ok check' href="javascript:;" data-value='0'>车价</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option" data-value='0'>车价</li>
                                <li className="option" data-value='1'>高配</li>
                                <li className="option" data-value='2'>经济</li>
                            </ul>
                        </div>
                         <div className="query">
                            <a className='ok check' href="javascript:;" data-value='0'>地域</a><span className='down'>ˇ</span>
                            <ul className="select">
                                <li className="option" data-value='0'>地域</li>
                                <li className="option" data-value='1'>北京</li>
                                <li className="option" data-value='2'>上海</li>
                            </ul>
                        </div>
                        <div className="query submit">
                            <a className='ok' href="javascript:;" onClick={this.onChangeData.bind(this)}>提交</a>
                        </div>
                        <div className="date">
                            <span className="time">2016年7月8日</span>
                            <div className="query">
                                <a className='ok check' href="javascript:;" data-value='2'>最近30天</a><span className='down'>ˇ</span>
                                <ul className="select">
                                    <li className="option" data-value='1'>最近7天</li>
                                    <li className="option" data-value='2'>最近30天</li>
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
                            <th className="w_10"><div><p className="">相关性<span className='document' onClick={this.onChangeShow.bind(this,true)}>?</span></p></div></th>
                            <th className="w_15 last"><div><p className="">查看详细</p></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nodes}
                    </tbody>
                </table>
                <div className={!this.state.showClick ? 'showMore none' : 'showMore'} onClick={this.showAll.bind(this)} ><span>{this.state.clickText}</span></div>
            </div>    
        )
    }
}

