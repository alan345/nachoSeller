import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN, URL_SERVER_GRAPHQL } from './constants/constants'
import { ApolloLink } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'
import './index.css'
import App from './components/App'

const httpLink = new HttpLink({ uri: URL_SERVER_GRAPHQL })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />      
  </ApolloProvider>,
  document.getElementById('root'),
)
