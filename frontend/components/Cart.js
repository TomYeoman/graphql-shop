import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const LOCAL_STATE_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

export default function Cart() {
  return (
    <Mutation mutation={LOCAL_STATE_MUTATION}>
      {toggleCart => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <CloseButton title="close" onClick={toggleCart}>
                  &times;
                </CloseButton>
                <Supreme>Your cart</Supreme>
                <p>You have X items in your cart.</p>
              </header>

              <footer>
                <p>%10.10</p>
                <SickButton>Checkout</SickButton>
              </footer>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
}

export { LOCAL_STATE_QUERY, LOCAL_STATE_MUTATION };
