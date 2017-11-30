import React, { Component } from 'react'

import { addGift, editGift, getGift } from '../../helpers/giftApi'

const initialState = {
      gift: {},
      giftId: null,
      loading: false,
      mode: 'add',
      registerError: null
    };

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class GiftForm extends Component {

  constructor (props) {
    super(props)

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  setInitialState = () => {
    this.setState(initialState)
  }

  status = ['ACTIVE', 'CANCELED', 'RESERVED', 'PURCHASED'];

  handleChange = (e) => {
    let property = {...this.state.gift};
    property[e.target.name] = e.target.value;
    this.setState({gift: property});
  }

  handleSubmit = (e) => {
    let gift = this.state.gift;
    let userId = 'wymTtuTSu8ZRcAEI0BJZCLn9H1D3';

    e.preventDefault()
    
    if (this.state.mode === 'add') {

      gift.ownerId = userId;
      gift.status = 'ACTIVE';
      addGift(gift)
        .then(() => this.props.history.push('/gifts'))
        .catch(e => this.setState(setErrorMsg(e)));

    } else {

      gift.id = this.state.giftId
      editGift(gift)
        .then(() => this.props.history.push('/gifts'))
        .catch(e => this.setState(setErrorMsg(e)));

    }
  }

  componentWillMount () {
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
            this.props.history.push('/gifts/form')
          }

          this.setState({loading: false})
        })
    }
  }

  render () {
    let gift = this.state.gift;

    if (!this.props.match.params.id && this.state.giftId) {
        this.setInitialState();
    }

    return this.state.loading === true ? <h1>Loading</h1> : (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>
        {
          this.state.mode === 'add'
          ? 'Nowy prezent'
          : 'Edycja prezentu'
        }
        </h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Nazwa</label>
            <input type="text" name="name" className="form-control" required
                value={gift.name} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Notatka</label>
            <textarea name="note" className="form-control"
                value={gift.note} onChange={this.handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Cena</label>
            <input type="text" name="price" className="form-control" required
                value={gift.price} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Link</label>
            <input type="url" name="url" className="form-control"
                value={gift.url} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Link do obrazka</label>
            <input type="text" name="img" className="form-control"
                value={gift.img} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Priorytet</label>
            <select name="priority"
              value={gift.priority} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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