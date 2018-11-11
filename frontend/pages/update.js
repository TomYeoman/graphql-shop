import React, { Component } from 'react';
import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';

export default class Update extends Component {
  render() {
    return (
      <div>
        {/* <Link href="/upda"> */}
        <UpdateItem id={this.props.query.id} />
        {/* </Link> */}
      </div>
    );
  }
}
