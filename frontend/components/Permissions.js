import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const PermissionsPage = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      console.log(data);
      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <Error error={error} />;
      }

      return (
        <div>
          Manage Permissions
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserPermissions key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      );
    }}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }),
  };

  state = {
    permissions: this.props.user.permissions,
    userId: this.props.user.id,
  };

  handleChange = e => {
    const { value, checked } = e.target;
    const currentPermissions = [...this.state.permissions];

    this.setState({
      permissions: checked
        ? [...currentPermissions, value]
        : currentPermissions.filter(item => item !== value),
    });
  };

  render() {
    console.log(this.props);
    const { name, email, id } = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.state.userId,
        }}
      >
        {(updatePermissions, { loading, error }) => {
          // if (loading) {
          //   return <div>Loading</div>;
          // }
          error && (
            <tr>
              <td colspan="8">
                <Error error={error} />
              </td>
            </tr>
          );

          return (
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${id}-permission-${permission}`}>
                    <input
                      id={`${id}-permission-${permission}`}
                      checked={this.state.permissions.includes(permission)}
                      type="checkbox"
                      onChange={this.handleChange}
                      value={permission}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          );
        }}
      </Mutation>
    );
  }
}

export default PermissionsPage;
