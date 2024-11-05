import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// To store the posts
const posts = [];

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
  posts : [Post] # To get all the posts
  getPost(id: ID!) : Post # To get specific post
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
    posts: () => posts, // To return all the posts
    getPost: (_, { id }) => posts.find((post) => post.id === id), // getting a specific post
  },

  //   Mutation Resolver
  Mutation: {
    // _ = parent (not used here)
    // args = mutation arguments (name, author, date)
    createPost: (_, args) => {
      const post = {
        id: String(Math.random()),
        name: args.name,
        author: args.author,
        date: args.date,
      };
      posts.push(post); // save to our declared array
      return post;
    },
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs, // Our schema definition
  resolvers, // Resolver functions
});

// Start the server using the standalone server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
