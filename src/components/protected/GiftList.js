import React, { Component } from 'react'
import { getUsersGiftList } from '../../helpers/giftApiService'

export default class GiftList extends Component {

  state = {
	page: 0,
	limit: 50,
	filter: {},
	gifts: {}
  };

  componentDidMount () {
  	let userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3';

	getUsersGiftList(userId)
  	.then((snapshot) => {
  		this.state.gifts = snapshot.val()
  	});
  }
  
  render () {
    return (
      <div>
       Gift list
      </div>
    )
  }
}