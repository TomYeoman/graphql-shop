import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY, LOCAL_STATE_MUTATION } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          /**
           * _ is just a plceholder not sure what this arg is used for
           * Variables lets us pass any args to the mutation
           * Thirs arg is the client, which we just care about the cache
           */
          toggleCart(_, variables, { cache }) {
            // Query the local state
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });

            console.log({ cartOpen });

            // Write the data
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);

            return data;
          },
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
