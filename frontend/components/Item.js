import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Title>
          {/* This is next way to pass a querystring */}
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{item.price}</PriceTag>
        <p>{item.description}</p>
      </ItemStyles>
    );
  }
}
