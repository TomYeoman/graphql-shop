import React, { Component } from 'react'
import Link from 'next/link'
import NavStyles from '../components/styles/NavStyles'

export default class Nav extends Component {
  render() {
    return (
      <NavStyles>
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
    )
  }
}
