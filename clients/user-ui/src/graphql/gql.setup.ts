import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import Cookies from "js-cookie";

const userLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_USER_SERVER_URI, // 4001
});
const surveyLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SURVEYACT_SERVER_URI, // 4002
});

// Split link berdasarkan nama mutation/query
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    if (
      definition.kind === "OperationDefinition" &&
      typeof definition.name?.value === "string"
    ) {
      return (
        definition.name.value.toLowerCase().includes("survey") ||
        definition.name.value.toLowerCase().includes("spj") ||
        definition.name.value.toLowerCase().includes("jobletter")
      );
    }
    return false; // fallback, selalu return boolean
  },
  surveyLink,
  userLink
);

// Auth middleware tetap bisa disisipkan
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accesstoken: Cookies.get("access_token"),
      refreshtoken: Cookies.get("refresh_token"),
    },
  });
  return forward(operation);
});

export const graphqlClient = new ApolloClient({
  link: authMiddleware.concat(splitLink),
  cache: new InMemoryCache(),
});
