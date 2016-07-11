import React from 'react'
import { Link } from 'react-router'
import Mask from 'mask.js'
import Top from 'top.js'
import Footer from 'footer.js'

//index
import Header from './index/header.js'
import Content from './index/content.js'

//index_info
import Header_info from './index_info/header.js'
import Content_info from './index_info/content.js'


export class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          show: false
        }
  }

  onShow(newState){
      this.setState({
      show: newState
    });

  }

  render() {
    return (
      <div>
        <Mask show={this.state.show} callbackParent={this.onShow.bind(this)}></Mask>
        <Top show={this.state.show} callbackParent={this.onShow.bind(this)}></Top>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    )
  }
}


export class App_info extends React.Component {
  constructor(props) {
        super(props);
        let { query } = this.props.location;
        this.state = query
  }


  render() {
    return (
      <div>
        <Top></Top>
        <Header_info gzh_id={this.state.gzh_id}></Header_info>
        <Content_info gzh_id={this.state.gzh_id}></Content_info>
        <Footer></Footer>
      </div>
    )
  }
}



export class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/index">Home Page</Link></p>
      </div>
    )
  }
}


