const user = require('user')
const birthday = require('birthday')


module.exports = (router) => {
    user(router)
    birthday(birthday)
}