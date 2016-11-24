import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Messages = ({ messages = [], loading }) => (
  <div>
    {loading ? <span class="loading">Loading...</span> : null}
    <ul className="list pa0 cf"> {
      messages.map(message => (
        <li key={message.id} className="fl w-20-l mr4 mb4 pa3 bl bw2 b--blue bg-white pl3 dim pointer">
          <p className="f4 fw6 pv2 ma0">{message.body}</p>
          <cite>―{message.originator}</cite>
        </li>
      ))
    }
    </ul>
  </div>
);

Messages.propTypes = {
  messages: React.PropTypes.array,
  loading: React.PropTypes.bool.isRequired,
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
  options: { pollInterval: 10000 },
  props: ({ ownProps, data: { loading, messages } }) => ({
    messages: messages,
    loading: loading
  }),
})(Messages);

class App extends Component {
  render() {
    return (
      <div className="pa4 avenir bg-near-white black">
        <h1 className="mv4">MessageBird GraphQL Poc</h1>
        <MessagesWithData />
      </div>
    );
  }
}

export default App;
