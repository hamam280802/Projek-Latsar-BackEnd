import {ApolloClient, InMemoryCache} from "@apollo/client";

export const graphqlClient = new ApolloClient({
    uri: process.env.SERVER_URI,
    cache: new InMemoryCache(),
})