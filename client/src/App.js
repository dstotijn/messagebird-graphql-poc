import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Messages = ({ messages = [] }) => (
  <ul> {
    messages.map(message => (
      <li key={message.id}>
        <h2>{message.body}</h2>
        <p>From: {message.originator}</p>
        <p><a href={message.href}>View message</a></p>
      </li>
    ))
  }
  </ul>
);

Messages.propTypes = {
  messages: React.PropTypes.array,
};

const MessagesQuery = gql`
query allMessages {
  messages {
    id,
    body,
    originator,
    href
  }
}
`;

const MessagesWithData = graphql(MessagesQuery, {
  props: ({ ownProps, data: { messages } }) => ({
    messages: messages
  }),
})(Messages);

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesWithData />
      </div>
    );
  }
}

export default App;
