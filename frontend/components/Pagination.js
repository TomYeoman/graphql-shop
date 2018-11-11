import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export default class Pagination extends Component {
  render() {
    return (
      <Query query={PAGINATION_QUERY}>
        {({ data, errors, loading }) => {
          if (loading) {
            return <div>Loading..</div>;
          }

          const count = data.itemsConnection.aggregate.count;
          const pageCount = count / perPage;
          const { page: currPage } = this.props;

          if (data) {
            return (
              <PaginationStyles>
                <Head>
                  <title>
                    Sick fits! - Page {currPage} of {pageCount}
                  </title>
                </Head>
                <Link
                  prefetch
                  href={{ pathName: 'items', query: { page: currPage - 1 } }}
                >
                  <a className="prev" aria-disabled={currPage <= 1}>
                    Prev
                  </a>
                </Link>
                <p>{count} items total</p>
                <p>
                  Page {currPage} of {pageCount}
                </p>
                <Link
                  prefetch
                  href={{ pathName: 'items', query: { page: currPage + 1 } }}
                >
                  <a aria-disabled={currPage === pageCount}>Next</a>
                </Link>
              </PaginationStyles>
            );
          }
        }}
      </Query>
    );
  }
}
