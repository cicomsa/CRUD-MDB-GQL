import Post from '../models/post'

const getPosts = () => Post.find({})

const getPost = id => Post.findById(id)

const addPost = args => {
  const post = new Post(args)
  return post.save()
}

const updatePost = (id, input) => Post.findOneAndUpdate({ _id: id }, { $set: { ...input } })

const deletePost = id => Post.findByIdAndDelete(id) // to look more into it

const root = {
  posts: () => getPosts(),
  post: ({ id }) => getPost(id),
  addPost: ({ input }) => addPost(input),
  updatePost: ({ id, input }) => updatePost(id, input),
  deletePost: ({ id }) => deletePost(id)
}

export default root
