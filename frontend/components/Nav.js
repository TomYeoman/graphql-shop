import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

export default class Nav extends Component {
  render() {
    return (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        <User>
          {({ data: { me } }) => {
            if (me) {
              // return <p>{me.name}</p>;
              return (
                <Fragment>
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                  <Link href="/order">
                    <a>Order</a>
                  </Link>
                  <Link href="/account">
                    <a>Account</a>
                  </Link>
                </Fragment>
              );
            }
            return (
              <Link href="/signup">
                <a>Sign in</a>
              </Link>
            );
          }}
        </User>
      </NavStyles>
    );
  }
}
