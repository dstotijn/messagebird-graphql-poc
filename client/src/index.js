import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import 'tachyons';

import App from './App';

const networkInterface = createNetworkInterface({ uri: '/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    req.options.credentials = 'include';
    next();
  }
}]);

const client = new ApolloClient({ networkInterface });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
