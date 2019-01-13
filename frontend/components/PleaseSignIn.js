import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './SignIn';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data: { me }, loading }) => {
      if (loading) {
        return <p>Loading</p>;
      }
      if (!me) {
        return (
          <div>
            <p>Please sign in!</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
