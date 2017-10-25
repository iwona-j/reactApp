import React, { Component } from 'react'

import GiftTileActions from './GiftTileActions'

export default class GiftTile extends Component {
	render () {
		let gift = this.props.gift;
		return <div style={{border: '1px solid black', padding: '20px'}}>
			<div> {gift.id} </div>
			<div> {gift.name} </div>
			<div> {gift.userId} </div>

			<GiftTileActions gift={gift}></GiftTileActions>
		</div>
	}
}