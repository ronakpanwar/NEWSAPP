import React, { Component } from 'react'
import loading from '../looding.gif'
export default class Spiner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}



