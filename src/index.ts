import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  cache: "bounded",
});

server
  // .listen({ port: 4000, cors: { origin: "http://localhost:3000" } })
  .listen({ port: 4000 })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
