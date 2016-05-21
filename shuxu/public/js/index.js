import React from 'react'
import { Link } from 'react-router'
import Mask from 'mask.js'
import Top from 'top.js'
import Header from 'header.js'
import Date from 'date.js'
import Content from 'content.js'
import Footer from 'footer.js'


export class App extends React.Component {
  render() {
    return (
      <div>
        <Mask></Mask>
        <Top></Top>
        <Header></Header>
        <Date></Date>
        <Content></Content>
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


