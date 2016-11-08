import React from 'react'
// import ReactDom from 'react-dom'
import { Link } from 'react-router'

export class User extends React.Component {
  render() {
    let { userID } = this.props.params
    let { query } = this.props.location

    let age = query && query.showAge ? '33' : ''

    return (
      <div className="User">
        <h1>User id: {userID}</h1>
        {age}
      </div>
    )
  }
}

export class App extends React.Component {

  abc() {
    console.log(1)
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/other/user/bob" activeClassName="active">Bob</Link></li>
          <li><Link to={{ pathname: '/other/user/bob', query: { showAge: true } }}  activeClassName="active">Bob With Query Params</Link></li>
          <li><Link to="/other/user/sally" activeClassName="active">Sally</Link></li>
          <li><Link to="/other/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


export class Inbox extends React.Component {

  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }

}


export class Message extends React.Component {

  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
}

export class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}


