import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class GiftTileActions extends Component {

	constructor (props) {
		super(props)

		this.state = {
			redirect: null
		}
		this.edit = this.edit.bind(this)
	}

	getButtons (giftId, state, isOwner) {
		if (isOwner && state === 'ACTIVE') {
			return <p>
				<button className="btn btn-default" role="button" onClick={this.edit}>Edytuj</button>
				<a href="#" className="btn btn-warning" role="button">Wycofaj</a>
			</p>
		} else if (state === 'ACTIVE') {
			return <p>
				<a href="#" className="btn btn-primary" role="button">Rezerwuj</a>
			</p>
		} else if (state === 'RESERVED') {
			return <p>
				<a href="#" className="btn btn-primary" role="button">Zrezugnuj</a>
				<a href="#" className="btn btn-default" role="button">Oznacz jako zakupiony</a>
			</p>
		} else if (state === 'CANCELED') {
			return <p>
				<a href="#" className="btn btn-primary" role="button">Edytuj</a>
				<a href="#" className="btn btn-default" role="button">Przywróć</a>
			</p>
		}
	}

	edit () {
		this.setState({redirect: `/gifts/form/${this.props.gift.id}`})
	}

	render () {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect}/>
		}
		let gift = this.props.gift;
		return <div>
			{
				this.getButtons(gift.id, gift.status, true)
			}
		</div>
	}

}