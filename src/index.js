import React from 'react';
import ReactDOM from 'react-dom';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import './style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const restLink = new RestLink({
  uri: 'https://data.cityofnewyork.us/resource/uvpi-gqnh.json'
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<ApolloApp />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
