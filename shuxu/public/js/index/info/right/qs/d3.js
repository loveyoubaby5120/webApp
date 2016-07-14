import React from 'react'
import { Link } from 'react-router'

export default class D3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            topicArray: this.props.topicArray.join(',')
        }

    }

    componentWillMount(){

        // window.addEventListener('message', function(e) {
        //     console.log('bar say: '+e.data);
        // }, false);

        // window.addEventListener('message', function(e){
        //     console.log('foo say: ' + e.data.a);
        //     e.source.postMessage('get', '*');
        // }, false)

        this.accessChange();
    }

    componentWillReceiveProps(newProps){
        if(this.state.type != newProps.type || this.state.topicArray != newProps.topicArray.join(',')){
            this.state.topicArray = newProps.topicArray.join(',');
            this.state.type = newProps.type;
            this.accessChange();
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

    onClickIframe(){
        // document.getElementById("iframe").contentWindow.transition();

        // var ifr = document.querySelector('#iframe');
        //     ifr.contentWindow.postMessage({a: 1}, '*');

        

    }

    render() {

        return (
    		<div className="chart">
                <buttom onClick={this.onClickIframe.bind(this)}>切换</buttom>

                <iframe src="http://120.27.26.133:82/data/index_new_pc.php" frameborder="0" name='iframe' id='iframe' scrolling="yes" style={{width: '810px',height:'900px'}}></iframe>
                <div id="main" style={{width: '530px',height:'400px'}}></div>
            </div>
        )
    }
}

