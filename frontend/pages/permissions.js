import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PermissionsPage from '../components/Permissions';

export default class Sell extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <PermissionsPage />
        </PleaseSignIn>
      </div>
    );
  }
}
