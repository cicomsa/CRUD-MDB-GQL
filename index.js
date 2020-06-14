import express from 'express'
import cors from 'cors'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import schema from './schema/post'
import root from './roots/post'

const mongoDB = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection
  .once('open', () => console.log('Connected to database'))
  .on('error', error => console.log(`Error: ${error.message}`))

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Running a GraphQL API server at localhost:${port}/graphql`))
