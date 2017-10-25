import React, { Component } from 'react'
import { getUsersGiftList } from '../../helpers/giftApiService'

export default class GiftList extends Component {

  state = {
    page: 0,
    limit: 50,
    filter: {},
    gifts: []
  };

  componentWillMount () {
  	let userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3';

	  getUsersGiftList(userId)
  	  .then((snapshot) => {
        this.setState()
  	  	this.state.gifts = snapshot.val()
  	  });
  }
  
  render () {
    return (
      <div>
        {
          Object.keys(this.state.gifts).map((key) => {
              let gift = this.state.gifts[key];
              return <div key={gift.id}>{gift.name}</div>
          })
        }
      </div>
    )
  }
}