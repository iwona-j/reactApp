import React, { Component } from 'react'
import GiftTile from './GiftTile'
import { getUsersGiftList } from '../../helpers/giftApiService'

export default class GiftList extends Component {

  constructor (props) {
  	super(props)

  	console.log('GiftList constructor', props)
  }

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
  	console.log('render', this.state.gifts)
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