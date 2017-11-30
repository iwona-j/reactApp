import React, { Component } from 'react'

import GiftTileActions from './GiftTileActions'

export default class GiftTile extends Component {
	render () {
		let gift = this.props.gift;
		return <div className="col-sm-6 col-md-6">
			<div className="thumbnail">
				<img src={gift.img} alt="..."/>
				<div className="caption">
					<h3>{gift.name}</h3>
					<p>Cena ok. {gift.price} zł</p>
					<p>{gift.note}</p>
					{
						gift.url
						? <p><a href={gift.url} target="_blank">link</a></p>
						: ''
					}

					<GiftTileActions gift={gift}></GiftTileActions>
				</div>
			</div>
		</div>
		
		
	}
}