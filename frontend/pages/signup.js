import React from 'react';
import styled from 'styled-components';
import SignUp from '../components/Signup';
import SignIn from '../components/SignIn';
import RequestReset from '../components/RequestReset';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default function SignupPage() {
  return (
    <Columns>
      <SignUp />
      <SignIn />
      <RequestReset />
      {/* <SignUp /> */}
    </Columns>
  );
}
