import React from 'react';
import styled from 'styled-components';
import SignUp from '../components/Signup';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default function SignupPage() {
  return (
    <Columns>
      <SignUp />
      <SignUp />
      <SignUp />
    </Columns>
  );
}
