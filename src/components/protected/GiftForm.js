import React, { Component } from 'react'

import { addGift } from '../../helpers/giftApi'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class GiftForm extends Component {

  state = {
    gift: {},
    registerError: null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this)
    addGift(this.state.gift)
      .catch(e => this.setState(setErrorMsg(e)))
  }

  render () {
    let gift = this.state.gift;

    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Nowy prezent</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nazwa</label>
            <input type="text" className="form-control" ref={(name) => gift.name = name} placeholder="Nazwa"/>
          </div>
          <div className="form-group">
            <label>Notatka</label>
            <textarea className="form-control" ref={(note) => gift.note = note} placeholder="Notatka"></textarea>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input type="url" className="form-control" placeholder="Link" ref={(url) => gift.url = url} />
          </div>
          <div className="form-group">
            <label>Link do obrazka</label>
            <input type="text" className="form-control" placeholder="Link do obrazka" ref={(img) => gift.img = img} />
          </div>
          <div className="form-group hidden">
            <label></label>
            <input type="text" className="form-control" ref={(status) => gift.status = status} />
          </div>
          <div className="form-group">
            <label>Priorytet</label>
            <input type="number" min="0" max="5" className="form-control" ref={(priority) => gift.priority = priority} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Zapisz</button>
        </form>
        </div>
    )
  }
}