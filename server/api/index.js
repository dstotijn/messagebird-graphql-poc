import hapi from 'hapi';
import * as basicAuth from 'hapi-auth-basic';
import inert from 'inert';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import schema from './schema';
import { MessageBirdConnector } from './messagebird/connector';
import { Messages } from './messagebird/models';

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
});

server.register(basicAuth, (err) => {
  if (err) throw err;
  server.auth.strategy('messageBirdAccessToken', 'basic', true, {
    validateFunc: (request, username, password, callback) => {
      callback(null, true, { accessKey: password });
    },
    allowEmptyUsername: true,
  });
});

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: (request) => {
      const messageBirdConnector = new MessageBirdConnector({
        accessKey: request.auth.credentials.accessKey,
      });

      return {
        schema,
        context: {
          Messages: new Messages({ connector: messageBirdConnector }),
        },
      };
    },
  },
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.register(inert, (err) => {
  if (err) throw err;
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '../client', // This will only work in Docker container
      },
    },
  });
});


server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
