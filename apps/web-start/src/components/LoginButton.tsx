import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/page.module.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className={styles.signInButtons}
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;