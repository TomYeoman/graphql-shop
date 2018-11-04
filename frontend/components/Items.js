import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from 'styled-components';
import Item from './Item';

// Some people like to put queries into seperate folders + import it, Or we can locate the query from the file we want to do a query
import gql from "graphql-tag";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
    }
  }
`;

const Center = styled.div`
  text-align: center;
`
const ItemsList = styled.div`
  display :grid;
  grid-template-columns :  1fr 1fr;
  grid-gap : 60px;
  max-width : ${props => props.theme.maxWidth}
  margin : 0 auto;
`

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({data, error, loading}) => {
            if(loading) return <p>Loading</p>
            if(error) return <p>Error : {error.message}</p>
            return <ItemsList>
              {data.items.map((item) => {
                return <Item key={item.id} item={item}/>
              })}
            </ItemsList>
          }}
        </Query>
      </Center>
    );
  }
}
