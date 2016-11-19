import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import schema from './schema';
import { MessageBirdConnector } from './messagebird/connector';
import { Messages } from './messagebird/models';

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
});

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: () => {
      const messageBirdConnector = new MessageBirdConnector({
        accessKey: process.env.MESSAGEBIRD_ACCESS_KEY,
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

server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
