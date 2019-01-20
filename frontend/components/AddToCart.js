import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

export default class Item extends Component {
  render() {
    const { id } = this.props;

    console.log(id);
    return (
      <Mutation
        mutation={ADD_TO_CART}
        variables={{
          id,
        }}
      >
        {addToCart => <button onClick={addToCart}>Add to cart !</button>}
      </Mutation>
    );
  }
}
