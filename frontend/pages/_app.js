import App, {Container} from 'next/app'
import Page from '../components/Page'
import Meta from '../components/Meta'

import {ApolloProvider } from 'react-apollo';
import withData from '../lib/withData'

class MyApp extends App {

  // When we go to different pages (e.g items?page=2 ) we're going to need to surface those values for the client ( Used to be done automatically for us )
  // This is a special next.js lifecycle method ( Runs before the first render happens ), which exposes some props for us

  // If we go to next.js / apollo.js we will find this snippet for this
  static async getInitialProps({Component, ctx }) {
    let pageProps = {}

    // This crawls every single page, fetches all the data (queries / mutations ) and returns it for us. E.g if we have a basket, list of items etc this pre-renders for us (this is just needed for SSR apps)
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps;
    }

    // This exposes the query to the user
    pageProps.query = ctx.query;
    // This exposes it via props
    return { pageProps }
  }

  render() {

    
    // Component - Routed component is passed as props from main hidden <App/>
    // Apollo - ApolloProvider needs a client to us
    const { Component, apollo, pageProps } = this.props;

    return (
      <div>
          <Container>
            <ApolloProvider client={this.props.apollo}>
              <Meta/>
              <Page>
                <Component {...pageProps}/>
              </Page>
            </ApolloProvider>
          </Container>
      </div>
    )
  }
}

// This exposes the apollo prop for us to use within the ApolloProvider
export default withData(MyApp)