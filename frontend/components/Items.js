import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';
// Some people like to put queries into seperate folders + import it, Or we can locate the query from the file we want to do a query

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items (first:$first, skip:$skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    const { page: currPage } = this.props;

    return (
      <Center>
        <Pagination page={currPage} />
        <Query
          variables={{ skip: currPage * perPage - perPage, first: 4 }}
          query={ALL_ITEMS_QUERY}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <p>Error : {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={currPage} />
      </Center>
    );
  }
}

export { ALL_ITEMS_QUERY };
