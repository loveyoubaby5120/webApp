import React from 'react'
import { Link } from 'react-router'
import Mask from 'mask.js'
import Top from 'top.js'


export class App extends React.Component {
  render() {
    return (
      <Mask></Mask>
      // <Top></Top>
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


