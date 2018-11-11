import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// GQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';
// Components
import ErrorMessage from './ErrorMessage';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  // Manually update the client cache to match the servers
  update = (cache, { data: { deleteItem } }) => {
    // #1 - Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });

    // #2 - Filter the delete item from the page
    const filteredItems = data.items.filter(item => item.id !== deleteItem.id);

    // #3 - Put the items back in cache!
    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: { items: filteredItems },
    });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{
          id: this.props.id,
        }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <Fragment>
            <ErrorMessage error={error} />

            <button
              onClick={() => {
                if (confirm('are you sure you want to delete this item?')) {
                  deleteItem();
                }
              }}
            >
              {this.props.children}
            </button>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {};

export default DeleteItem;
