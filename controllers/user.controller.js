const User = require('./../models/User')
const Birthday = require('./../models/Birthday')

module.exports = {
    addUser: (req, res, next) => {
        new User(req.body).save((err, newUer) => {
            if(err)
                res.send(err)
            else if(!newUser)
                res.sendStatus(404)
            else
                res.send(newUer)
            next()            
        })
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id)
        .then((err, user) => {
            if(err)
                res.send(err)
            else if(!user)
                res.sendStatus(404)
            else 
                res.send(user)
            next()            
        })
    },

    followUser: (req, res, next) => {
        User.findById(req.body.id)
        .then((user) => {
            return user.follow(req.body.user_id)
            .then(() => {
                return res.json({msg: "Followed"})
            })
        })
        .catch(next)
    }, 

    getUserProfile: (req, res, next) => {
        User.findById(req.params.id)
        .then((_user) => {
            return User.find({following: req.params.id})
            .then((_users) => {
                _users.foreach((user_) => {
                    _user.addFollower(user_)
                })
                return Birthday.find({author: req.params.id})
                .then((_birthdays) => {
                    return res.json({user: _user, birthdays: _birthdays})
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}