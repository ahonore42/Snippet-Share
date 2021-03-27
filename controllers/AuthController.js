const { User } = require('../models')
const { ComparePassword, CreateToken, HashPassword } = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: ['snippets', 'comments'],
      raw: true
    })
    if (user && (await ComparePassword(req.body.password, user.passwordDigest))) {
      const payload = {
        id: user.id,
        username: user.username
      }
      const token = CreateToken(payload)
      return res.status(200).json({ currentUser: user, token: token })
    }
    return res.status(401).send({ msg: 'Unauthorized', reason: 'Login Failed' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    let passwordDigest = await HashPassword(password)
    const user = await User.create({
      username,
      email,
      passwordDigest
    })
    user ? res.status(200).send({msg: 'Successfully Created Account'}) :
    res.status(406).send({msg: 'Registration Failed'})
    
  } catch (error) {
    throw error
  }
}

const GetCurrentUser = async (req, res) => {
  try {
    const {token} = res.locals
    const user = await User.findByPk(token.id, {include: ['snippets','comments']})
    res.status(200).json({token, user})
  } catch (error) {
    throw error
  }
}

const DeleteAccount = async (req, res) => {
  try {
    const {token} = res.locals
    await User.destroy({where: {id: token.id}})
    res.status(204).send({msg: 'Account Deleted'})
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
  GetCurrentUser,
  DeleteAccount
}
