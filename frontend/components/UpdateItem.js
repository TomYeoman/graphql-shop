import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      description
      title
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  handleInputChange = e => {
    const { name, type, value } = e.target;

    const val = type === 'number' ? parseFloat(value) : value;
    this.setState((state, props) => ({ [name]: val }));
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('updating item');
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <div>
        <Query
          query={SINGLE_ITEM_QUERY}
          variables={{
            id: this.props.id,
          }}
        >
          {({ data, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (!data.item) {
              return <p>No item found for {this.props.id}!</p>;
            }

            const { title, description, price } = data.item;
            return (
              <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, { loading, error, called, data }) => (
                  <Form
                    onSubmit={async e => {
                      this.updateItem(e, updateItem);
                    }}
                  >
                    <ErrorMessage error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title" className="htmlFor">
                        Title
                        <input
                          type="text"
                          id="title"
                          placeholder="Title"
                          name="title"
                          onChange={this.handleInputChange}
                          defaultValue={title}
                        />
                        {/* value={this.state.title} */}
                      </label>
                      <label htmlFor="price" className="htmlFor">
                        price
                        <input
                          type="number"
                          id="price"
                          placeholder="Price"
                          name="price"
                          onChange={this.handleInputChange}
                          defaultValue={price}
                        />
                        {/* value={this.state.price} */}
                      </label>
                      <label htmlFor="price" className="htmlFor">
                        Description
                        <textarea
                          id="description"
                          placeholder="Enter a description"
                          name="description"
                          required
                          defaultValue={description}
                          onChange={this.handleInputChange}
                        />
                        {/* value={this.state.description} */}
                      </label>
                      <button type="submit">
                        Sav{loading ? 'ing' : 'e'} changes
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
