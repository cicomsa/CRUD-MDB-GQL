import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: String,
  body: String
})

const Post = mongoose.model('Post', PostSchema)

export default Post
