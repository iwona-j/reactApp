import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GiftList from './GiftList'
import GiftForm from './GiftForm'

const Gift = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={GiftList}/>
    <Route path={`${match.url}/form/:id?`} component={GiftForm}/>
  </Switch>
)

export default Gift