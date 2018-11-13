import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export default class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    console.log({ name, value });
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { data, loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await signup();
              this.setState({
                name: '',
                email: '',
                password: '',
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up for an account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Sign up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
