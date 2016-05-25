import React from 'react'
import { Link } from 'react-router'

export default class Bd_more extends React.Component {
    constructor(props) {
        super(props);
        var _this = this;
        $.ajax({
            url: '/gzh_profile_list',
            async:false,
            success: function(data){
                _this.state = {
                    datas: data
                };

            }
        })
    }




    render() {
        var options = [];
        this.state.datas.forEach(function(data,index){
            console.log(index);
            var node;
            if(index%2==0){
                node = <tr className="even">;
                            
            }
            else{
                node = <tr>
            }
            console.log(index);
            if(true){
                node += <td></td><td><div className="number number2">1</div></td>;
            }
            else{
                node += <td></td><td><div className="number number2">1</div></td>;
            }

            node += <td className="text "><div>卡娃2微卡</div></td>
                            <td className="text "><div>kawa01</div></td>
                            <td className="text "><div>4.28</div></td>
                            <td className="text "><div>15.21</div></td>
                            <td className="text "><div>15.21</div></td>
                            <td className="last "><div>1.00</div></td>
                            <td className="text goto_info"><a href="javascript:;">进入&nbsp;></a></td>
                            <td></td>
                        </tr>
            options.push(node);
        });
        return (
            // <div className='table blur auto'>
            <div className={this.props.show =='bd_more' ? "table blur auto" : "table blur none"}>
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
                        {options}
                    </tbody>
                </table>
                <div className="showMore"><div className="last jtb"></div><span></span></div>
            </div>
        )
    }
}

