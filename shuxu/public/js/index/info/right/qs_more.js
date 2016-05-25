import React from 'react'
import { Link } from 'react-router'
import Info from './qs/info.js'

export default class Qs_more extends React.Component {
  render() {

    return (
    	<div className='qs_more' style={
                (function(obj){

                    if(obj.props.show == 'qs_more'){
                        return {display: 'auto'};
                    }
                    else{
                        return {display: 'none'};
                    }

                })(this)
                
            }>
        	<div className="title">
                新闻资讯
            </div>
            <Info></Info>
        </div>
    )
  }
}

