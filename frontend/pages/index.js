import React, { Component } from "react";
import Items from '../components/Items'

// This is the home page ( Loaded on the root page '/' or also '/items').
export default class Home extends Component {
  render() {
    return (
      <div>
        <Items/>
      </div>
    );
  }
}
