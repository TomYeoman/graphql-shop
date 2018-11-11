import React, { Component } from 'react';
import Items from '../components/Items';

// This is the home page ( Loaded on the root page '/' or also '/items').
export default class Home extends Component {
  render() {
    return (
      <div>
        <Items page={parseFloat(this.props.query.page) || 1} />
      </div>
    );
  }
}
