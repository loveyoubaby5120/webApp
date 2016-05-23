import React from 'react'
import { Link } from 'react-router'
import Info from './qs/info.js'

export default class Qs_more extends React.Component {
  render() {

    return (
    	<div className='qs_more' style={{display:'auto'}}>
        	<div className="title">
                新闻资讯
            </div>
            <Info></Info>
        </div>
    )
  }
}

