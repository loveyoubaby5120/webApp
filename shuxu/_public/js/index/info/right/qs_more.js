import React from 'react'
import { Link } from 'react-router'
import Info from './qs/info.js'

export default class Qs_more extends React.Component {

    componentWillReceiveProps(newProps){
    }

    render() {

        return (
        	<div className={this.props.show=='qs_more' ? "qs_more auto" : "qs_more none"}>
                <Info type={this.props.type}></Info>
            </div>
        )
    }
}

