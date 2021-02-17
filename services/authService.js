const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS } = require('../config/index');;
let { SECRET } = require('../config/index');

const register = async (data) => {
    let salt = await bcrypt.genSalt(SALT_ROUNDS)

    
    let hash = await bcrypt.hash(data.password, salt)
    const user = new User({ username: data.username, password: hash })

    console.log(user)
    return await user.save()
}

const login = async ({ username, password }) => {
    //get user from DB
    let user = await User.findOne({ username }).lean()
    if (!user) throw { message: 'User not found!' };

    // comapare pass with hash
    let isIdentical = await bcrypt.compare(password, user.password)
    if (!isIdentical) throw { message: 'Wrong PASSWORD!' }
    // generate token

    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET)

    return token


}
const getName =async  (id) => {
    let res =   await User.findById(id).lean()
    return res.username
}

module.exports = {
    register,
    login,
    getName,

}