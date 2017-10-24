import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Home from '../components/Home'

import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import { privateRoutes, publicRoutes } from '../config/routing'



function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">WISH LIST</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                {
                  this.state.authed
                  ? privateRoutes.map(r => r.nav ? <li><Link to={r.path} className="navbar-brand">{r.name}</Link></li> : '')
                  : publicRoutes.map(r => <li><Link to={r.path} className="navbar-brand">{r.name}</Link></li>)
                }
                {
                  this.state.authed
                  ? <li>
                    <button
                          style={{border: 'none', background: 'transparent'}}
                          onClick={() => {
                            logout()
                          }}
                          className="navbar-brand">Wyloguj</button>
                    </li>
                  : ''
                }
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                {
                  this.state.authed
                  ? privateRoutes.map(r => <PrivateRoute authed={this.state.authed} path={r.path + (r.params || '')} component={r.component}/>)
                  : publicRoutes.map(r => <PublicRoute authed={this.state.authed} path={r.path} component={r.component}/>)
                }
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}