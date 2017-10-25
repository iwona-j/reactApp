import React, { Component } from 'react'

export default class GiftTileActions extends Component {

	render () {
		let gift = this.props.gift;
		return <div>
			{
				gift.state === 'ACTIVE'
				? <div> ACTIVE STATE </div>
				: <div> NOT ACTIVE STATE </div>
			}
		</div>
	}
}