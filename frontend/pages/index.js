import React, { Component } from "react";
import Link from "next/link";

export default class Index extends Component {
  render() {
    return (
      <div>
        <div>Hey</div>
        <Link href="/sell">
          <a>Sell</a>
          
        </Link>

      </div>
    );
  }
}
