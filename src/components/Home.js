require('styles/Home.css');

import React, { Component } from 'react'
import giftBox from '../images/gift-box.jpg';

export default class Home extends Component {
  render () {
    return (
      <div className="home">
        <h3>Witaj w wish list!</h3>
        <img src={giftBox} className="gift-box-image"/>
      </div>
    )
  }
}