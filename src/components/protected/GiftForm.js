import React, { Component } from 'react'

import { addGift, editGift, getGift } from '../../helpers/giftApi'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class GiftForm extends Component {

  constructor (props) {
    super(props)
    console.log(props)

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  state = {
    loading: false,
    mode: 'add',
    giftId: null,
    gift: {},
    registerError: null
  }

  handleValueChange = (e) => {
    let property = {...this.state.gift}
    property[e.target.name] = e.target.value;
    this.setState({gift: property})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this)
    let gift = this.state.gift;
    if (this.state.mode === 'add') {
      addGift(gift)
        .catch(e => this.setState(setErrorMsg(e)))
    } else {
      gift.id = this.state.giftId
      editGift(gift)
        .catch(e => this.setState(setErrorMsg(e)))
    }
    
  }

  componentWillMount () {
    console.log('componentWillMount', this.state)
    let giftId = this.props.match.params.id
    if (giftId) {
      this.setState({loading: true, mode: 'edit', giftId: giftId});

      getGift(giftId)
        .then((snapshot) => {
          let gift = snapshot.val();

          if (gift) {
            console.log('after get gift', snapshot.val(), this.state.gift)
            this.setState({gift: gift})
          } else {
            console.warn('no resource found')
            // redirect somewhere
          }
          this.setState({loading: false})
        })
    }
    console.log('componentWillMount', this.props.match.params.id)
  }

  render () {
    console.log('render', this.state)
    let gift = this.state.gift;

    return this.state.loading === true ? <h1>Loading</h1> : (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Nowy prezent</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Nazwa</label>
            <input type="text" name="name" className="form-control" placeholder="Nazwa"
                value={gift.name} onChange={this.handleValueChange}/>
          </div>

          <div className="form-group">
            <label>Notatka</label>
            <textarea name="note" className="form-control" placeholder="Notatka"
                value={gift.note} onChange={this.handleValueChange}></textarea>
          </div>

          <div className="form-group">
            <label>Link</label>
            <input type="url" name="url" className="form-control" placeholder="Link"
                value={gift.url} onChange={this.handleValueChange}/>
          </div>

          <div className="form-group">
            <label>Link do obrazka</label>
            <input type="text" name="img" className="form-control" placeholder="Link do obrazka"
                value={gift.img} onChange={this.handleValueChange}/>
          </div>

          <div className="form-group">
            <label>Priorytet</label>
            <input type="number" name="priority" min="0" max="5" className="form-control"
                value={gift.priority} onChange={this.handleValueChange}/>
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