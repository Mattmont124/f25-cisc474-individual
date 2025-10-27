import { Auth0Provider } from '@auth0/auth0-react';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import * as TanstackQuery from './integrations/root-provider';

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: ({ children }) => (
      <TanstackQuery.Provider {...rqContext}>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN!}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: `${window.location.origin}/home`,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE!,
          }}
        >
          {children}
        </Auth0Provider>
      </TanstackQuery.Provider>
    ),
  });

  return router;
};

