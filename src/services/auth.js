const { createUserToken, verifyToken } = require('../utils/jwt')

const User = require('../models/user')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body
    const findUserWithEmail = await User.findOne({
      'email.email_str': req.body.email,
    }).exec()

    if (findUserWithEmail) {
      return res.status(404).send({
        message: 'Email ' + req.body.email + ' already used',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    let temp = ''
    for (let i = 0; i < 6; i++) {
      temp += Math.floor(Math.random() * 10)
    }
    const newlyCreatedUser = await User.create({
      email: {
        email_str: email,
      },
      password: hashedPassword,
      full_name,
      pin: temp,
    })

    const token = createUserToken({
      email,
    })

    delete newlyCreatedUser.password

    return res.status(200).send({
      message: 'Success Register',
      result: {
        user: newlyCreatedUser,
        token,
      },
    })
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.',
    })
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    })

    if (!user) {
      return res.status(400).send({
        message: 'Pone number tidak terdaftar',
      })
    }

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if (!validPwd) {
      return res.status(400).send({
        message: 'Password Salah!',
      })
    }

    const token = createUserToken({
      _id: user.id,
    })

    return res
      .header('auth-token', token)
      .status(200)
      .json({
        status: res.statusCode,
        message: 'User logged in!',
        result: {
          user: user,
          token,
        },
      });
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error',
    })
  }
}


module.exports = {
  register,
  login,
}
