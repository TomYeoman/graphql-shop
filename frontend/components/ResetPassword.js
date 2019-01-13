import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

export default class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
  };

  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { resetToken } = this.props;

    // debugger;
    return (
      <Mutation
        mutation={RESET_PASSWORD}
        variables={{ ...this.state, resetToken }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(requestPasswordReset, { data, error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await requestPasswordReset();
              this.setState({
                newPassword: '',
                confirmPassword: '',
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Reset link sent! Check your e-mail</p>
              )}
              <label htmlFor="email">
                New password
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="email">
                Confirm password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Confirm!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
