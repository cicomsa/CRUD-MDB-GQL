const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { author: "John Doe", body: "Hello world" },
  { author: "Jane Doe", body: "Hi, planet!" },
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID
    author: String
    body: String
  },
  type Mutation {
    submitPost(input: PostInput!): Post
    deletePost(id: ID!): [Post]
  }

  input PostInput {
    id: ID
    author: String!
    body: String!
  }
`);

const mapPost = (post, id) => post && ({ id, ...post });

const submitPost = ({ input: {author, id, body} }) => {
  const post = { author, body };
  let index = POSTS.length;

  if (id != null && id !== '' && id >= 0 && id < POSTS.length) {
    POSTS.splice(id, 1, post);
    index = id;
  } else {
    POSTS.push(post);
  }

  return mapPost(post, index);
}

const deletePost = id => {
  console.log(id)
  if (id != null && id !== '' && id >= 0 && id < POSTS.length) {
    POSTS.splice(id, 1);
  }

  return POSTS.map(mapPost)
}

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  submitPost: input => submitPost(input),
  deletePost: ({ id }) => deletePost(id)
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
