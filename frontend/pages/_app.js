import App, {Container} from 'next/app'

import React, { Component } from 'react'
import Page from '../components/Page'
import Meta from '../components/Meta'

export default class MyCustomApp extends App {
  render() {

    // Routed component is passed as props from main hidden <App/>
    const { Component } = this.props;
    return (
      <div>
          <Container>
            <Meta/>
            <Page>
              <Component/>
            </Page>
          </Container>
      </div>
    )
  }
}
