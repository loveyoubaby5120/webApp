import React from 'react'
import { Link } from 'react-router'

export default class Bd_more extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='table blur' style={
                (function(obj){

                    if(obj.props.show == 'bd_more'){
                        return {display: 'auto'};
                    }
                    else{
                        return {display: 'none'};
                    }

                })(this)
                
            }>
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
                        <tr>
                            <td></td>
                            <td>
                                <div className="number">1</div>
                            </td>
                            <td className="text "><div>卡娃微卡</div></td>
                            <td className="text "><div>kawa01</div></td>
                            <td className="text "><div>4.28</div></td>
                            <td className="text "><div>15.21</div></td>
                            <td className="text "><div>15.21</div></td>
                            <td className="last "><div>1.00</div></td>
                            <td className="text goto_info"><a href="javascript:;">进入&nbsp;></a></td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
                <div className="showMore"><div className="last jtb"></div><span></span></div>
            </div>
        )
    }
}

