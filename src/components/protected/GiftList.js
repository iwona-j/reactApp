import React, { Component } from 'react'
import GiftTile from './GiftTile'
import { getUsersGiftList } from '../../helpers/giftApi'

export default class GiftList extends Component {
  state = {
    page: 0,
    limit: 50,
    filter: {},
    gifts: []
  }

  componentDidMount () {
  	let userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3';

 	  getUsersGiftList(userId)
	  .then((snapshot) => {
   		 this.setState({gifts: snapshot.val()})
	  });
  }
  
  render () {
    return (
      <div>
        {
          Object.keys(this.state.gifts).map((key) => {
              let gift = this.state.gifts[key];
              return <GiftTile key={gift.id} gift={gift}></GiftTile>
          })
        }
      </div>
    )
  }
}