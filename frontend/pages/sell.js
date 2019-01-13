import React, { Component } from 'react';
import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';

export default class Sell extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <Link href="/sell">
            <CreateItem />
          </Link>
        </PleaseSignIn>
      </div>
    );
  }
}
