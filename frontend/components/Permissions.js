import React from 'react';
import { Query } from 'react-apollo';
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
                  <th>{permission}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <User user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      );
    }}
  </Query>
);

class User extends React.Component {
  render() {
    console.log(this.props);
    const { name, email, id } = this.props.user;
    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default PermissionsPage;
