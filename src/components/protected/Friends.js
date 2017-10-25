import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FriendList from './FriendList'
import FriendDetails from './FriendDetails'

const Friends = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={FriendList}/>
    <Route path={`${match.url}/:id`} component={FriendDetails}/>
  </Switch>
)

export default Friends