import React from 'react'
import { Link } from 'react-router'

export default class D3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            topicArray: this.props.topicArray.join(','),
            topicDateTime: this.props.topicDateTime,
        }

        console.log('init');

        window.addEventListener('message', function(e) {
            // console.log('bar say: '+e.data);
        }, false);
    }

    componentWillMount(){
        this.accessChange();
    }

    componentWillReceiveProps(newProps){
        if(this.state.type != newProps.type || this.state.topicArray != newProps.topicArray.join(',') || this.state.topicDateTime != newProps.topicDateTime){
            this.state.topicArray = newProps.topicArray.join(',');
            this.state.topicDateTime = newProps.topicDateTime;
            this.state.type = newProps.type;
            this.accessChange();

            
            var ifr = document.querySelector('#iframe');
            ifr.contentWindow.postMessage({topicArray: this.state.topicArray,dateTime: this.state.topicDateTime}, '*');
        }


    }

    chart(data){

    }

    accessChange(){
        var _this = this;
        
        // $.ajax({
        //     url: '/chart_days?gzh_type='+this.state.gzh_type+'&type='+type,
        //     async: true,
        //     success: function(data){
        //     },
        //     error: function(msg){
        //         console.log(msg);
        //     }
        // });

    }

    render() {

        return (
    		<div className="chart">
                <iframe src="http://120.27.26.133:82/data/svgMain.html" frameborder="0" name='iframe' id='iframe' scrolling="no" style={{width: '810px',height:'920px'}}></iframe>
                <div id="main" style={{width: '530px',height:'400px'}}></div>
            </div>
        )
    }
}

