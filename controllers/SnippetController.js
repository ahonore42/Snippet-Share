const { Snippet } = require('../models')

const GetSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.findAll({include: ['owner','comments']})
    res.json(snippets)
  } catch (error) {
    throw error
  }
}

const GetSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findByPk(req.parms.id, {include: ['owner','comments']})
    res.json(snippet)
  } catch (error) {
    throw error
  }
}

const CreateSnippet = async (req, res) => {
  try {
    // const { token } = res.locals
    const snippet = await Snippet.create({...req.body})
    res.json(snippet)
  } catch (error) {
    throw error
  }
}

const UpdateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.update({where: {id: req.params.id}})
    res.json(snippet)
  } catch (error) {
    throw error
  }
}

const DeleteSnippet = async (req, res) => {
  try {
    await Snippet.destroy({where: {id: req.params.id}})
    res.status(204).send({ msg: 'deleted snippet'})
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSnippets,
  GetSnippetById,
  CreateSnippet,
  UpdateSnippet,
  DeleteSnippet
}