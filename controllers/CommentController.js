const { Comment, User } = require('../models')

const AddComment = async (req, res) => {
  try {
    const { token } = res.locals
    const comment = await Comment.create({
      ...req.body,
      userId: token.id,
      snippetId: req.params.id
    })
    let merged = {
      commenter: { id: token.id, username: token.username },
      ...comment.dataValues
    }
    res.send(merged)
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddComment
}