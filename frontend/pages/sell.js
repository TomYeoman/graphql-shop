import React, { Component } from 'react'
import Link from 'next/link'
import CreateItem from '../components/CreateItem';
export default class Sell extends Component {
  render() {
    return (
      <div>
        <Link href="/sell">
          <CreateItem/>
        </Link>
      </div>
    )
  }
}
