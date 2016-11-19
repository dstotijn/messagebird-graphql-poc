import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { schema as messageBirdSchema, resolvers as messageBirdResolvers } from './messagebird/schema';

const rootSchema = [`
type Query {
  messages(
    offset: Int,
    limit: Int
  ): [Message]

  message(
    id: String!
  ): Message
}
type Mutation {
  sendMessage(
    payload: String!,
    originator: String!,
    recipients: String!
  ): Message
}
type Subscription {
  messageAdded: Message
}
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`];

const rootResolvers = {
  Query: {
    messages(root, args, context) {
      return context.Messages.getMessages();
    },
  },
  Mutation: {
  },
  Subscription: {
  },
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...messageBirdSchema];
const resolvers = merge(rootResolvers, messageBirdResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
