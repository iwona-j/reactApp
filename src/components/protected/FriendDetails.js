import React, { Component } from 'react'
import GiftList from './GiftList'

import { getUsersGiftList } from '../../helpers/giftApiService'

export default class FriendDetails extends Component {

  state = {
  	userId: null
  }

  componentWillMount () {
  	this.state.userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3'
	let userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3';

	getUsersGiftList(userId)
  	  .then((snapshot) => {
        this.setState({gifts: snapshot.val()})
  	});
  }

  render () {
    return (
      <div>
       Friend Details
       <GiftList userId={this.state.userId}></GiftList>
      </div>
    )
  }
}