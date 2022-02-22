const { createUserToken, verifyToken } = require('../utils/jwt')

const User = require('../models/user')
const bcrypt = require('bcryptjs')

const addUser = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, pin } = req.body;

    const findPhone = await User.findOne({
      phoneNumber : phoneNumber,
    });

    if (findPhone) {
      return res.status(404).send({
        message: 'This phone number ' + req.body.phoneNumber + ' already used',
      })
    }

    let temp = '';
    for (let i = 0; i < 6; i++) {
      temp += Math.floor(Math.random() * 10)
    }
    
    const hashedPassword = await bcrypt.hash(temp, 5)

    const newlyCreatedUser = await User.create({
      fullName,
      phoneNumber,
      password : hashedPassword,
      pin: temp,

    });

    const token = createUserToken({
      phoneNumber,
    })

    return res.status(200).send({
      message: 'Success Added',
      result: {
        user: newlyCreatedUser,
        token,
      },
    })


    
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error',
    })
  }

}


module.exports = {
  addUser
}
