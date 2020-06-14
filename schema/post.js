
import { buildASTSchema } from 'graphql'
import gql from 'graphql-tag'

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
    addPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): [Post]
  }

  input PostInput {
    id: ID
    author: String!
    body: String!
  }
`)

export default schema
