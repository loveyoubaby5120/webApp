import React from 'react'
import { Link } from 'react-router'

export default class Bd_more extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            nodes: [],
            limitNum: 30
        }
        
    }


    componentWillMount(){
        this.state.limitNum = 30;
        this.setNodes();
    }


    setNodes(){

        var _this = this;
        $.ajax({
            url: '/gzh_profile_list?limitNum='+this.state.limitNum,
            async:false,
            success: function(data){
                _this.state = {
                    datas: data,
                    nodes: []
                }
            }
        });
        var options = [];
        var num = this.state.nodes.length;
        this.state.datas.forEach(function(data,index){
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
            
            var td2 = React.createElement('td',null,div2);

            var div3 = React.createElement('div',null,data.nick_name);
            var td3 = React.createElement('td',{className:'text'},div3);

            var div4 = React.createElement('div',null,data.english_id);
            var td4 = React.createElement('td',{className:'text'},div4);

            var div5 = React.createElement('div',null,'--');
            var td5 = React.createElement('td',{className:'text'},div5);
            
            var div6 = React.createElement('div',null,'--');
            var td6 = React.createElement('td',{className:'text'},div6);
            
            var div7 = React.createElement('div',null,'--');
            var td7 = React.createElement('td',{className:'text'},div7);
            
            var div8 = React.createElement('div',null,'--');
            var td8 = React.createElement('td',{className:'text'},div8);
            
            var a9 = React.createElement('a',{href:"javascript:;"},'进入 >');
            var td9 = React.createElement('td',{className:'text goto_info'},a9);
            
            var td10 = React.createElement('td');


            if((index+num)%2==0){
                var tr = React.createElement('tr',{className:'even'},td,td2,td3,td4,td5,td6,td7,td8,td9,td10);
            }
            else{
                var tr = React.createElement('tr',{className:''},td,td2,td3,td4,td5,td6,td7,td8,td9,td10);
            }

            options.push(tr);


        });

        

        this.setState({
            nodes: this.state.nodes.concat(options)
        });
    }

    showAll(event){
        this.state.limitNum = '*';
        this.setNodes();
    }


    render() {
        
        return (
            // <div className='table blur auto'>
            <div className={this.props.show=='bd_more' ? "table blur auto" : "table blur none"}>
                <div className="bc title"><p className="type ng-binding">排名</p></div>
                <table className="bc">
                    <thead>
                        <tr>
                            <th className="w_2"></th>
                            <th className="w_10"></th>
                            <th className="w_15"><div><p className="">微信名称</p></div></th>
                            <th className="w_15"><div><p className="">微信账号</p></div></th>
                            <th className="w_15"><div><p className="">粉丝黏性</p></div></th>
                            <th className="w_15"><div><p className="">增长潜力</p></div></th>
                            <th className="w_20"><div><p className="">粉丝活跃度</p></div></th>
                            <th className="w_15"><div><p className="">综合热度</p></div></th>
                            <th className="w_15"><div><p className="">查看详细</p></div></th>
                            <th className="w_2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nodes}
                    </tbody>
                </table>
                <div className="showMore" onClick={this.showAll.bind(this)} ><div className="last jtb"></div><span>查看更多</span></div>
            </div>
        )
    }
}

