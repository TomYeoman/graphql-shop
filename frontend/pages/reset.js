import React from 'react';
import ResetPassword from '../components/ResetPassword';

export default function reset({ query }) {
  return <ResetPassword resetToken={query.resetToken} />;
}
