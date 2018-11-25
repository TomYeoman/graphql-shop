import React, { Component } from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

export default class Nav extends Component {
  render() {
    return (
      <NavStyles>
        <User>
          {({ data: { me } }) => {
            console.log(me);
            return <p>User</p>;
          }}
        </User>
        <Link href="/items">
          <a>Items</a>
        </Link>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <Link href="/order">
          <a>Order</a>
        </Link>
        <Link href="/account">
          <a>Account</a>
        </Link>
      </NavStyles>
    );
  }
}
