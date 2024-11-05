import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// This is to define the schema
const typeDefs = `
  type Post {
  id: ID!
  name: String!
  author: String!
  date: String
}
  type Query {
  hello: String!
  post: Post
  }

  # Must declare the mutation type
  type Mutation {
  createPost(name: String!, author: String!, date: String) : Post
  
  }

`;

// Define the resolvers
// resolver: function responsible for fetching the data corresponding
//           to a specific field in the schema
const resolvers = {
  // Query Resolver
  Query: {
    hello: () => "Hello, world!",
    post: () => ({
      id: "1",
      name: "First Post",
      author: "Irfan",
      date: "2024-03-20",
    }),
  },

  //   Mutation Resolver
  Mutation: {
    // _ = parent (not used here)
    // args = mutation arguments (name, author, date)
    createPost: (_, args) => {
      return {
        id: String(Math.random()),
        name: args.name,
        author: args.author,
        date: args.date,
      };
    },
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server using the standalone server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
