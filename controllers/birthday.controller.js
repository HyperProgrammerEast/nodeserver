/**
 * This controller will handle all our operations for the birthdays such as:
 *  -adding
 *  -editing
 *  -removing
 *  -reading or viewing
 */

 const Birthday = require('./../models/Birthday')
 const User = require('./../models/User')
 const fs = require('fs')
//  const cloudinary = require('cloudinary')

 module.exports = {

    /**
     * 
     */
     addBirthday: (req, res, next) => {
        let {text,title,claps,description} = req.body
        _saveBirthday({
            text,
            title,
            claps,
            description,
            feature_img: ''
        })

        function _saveBirthday(object) {
            new Birthday(object).save((err, birthday) => {
                if(err)
                    res.send(err)
                else if (!birthday)
                    res.sendStatus(400)
                else {
                    return birthday.addAuthor(req.body.author_id)
                        .then((_birthday) => {
                            return res.send(_birthday)
                    })
                }
                next()        
            })
        }
     },

     getAll: (req, res, next) => {
         Birthday.find(req.params.id)
         .populate('author')
         .populate('comments.author').exec((err, birthday) => {
             if(err)
                res.send(err)
             else if(!birthday)
                res.sendStatus(404)
             else
                res.send(birthday)
             next()         
         })
     },

     clapBirthday: (req, res, next) => {
         Birthday.findById(req.body.birthday_id)
            .then((birthday) => {
                return birthday.clap().then(() => {
                    return res.json({mesg: "Done"})
                })
            })
            .catch(next)
     }, 

     commentBirthday: (req, res, next) => {
         Birthday.findById(req.body.birthday_id)
            .then((birthday) => {
                return birthday.comment({
                    author: req.body.author_id,
                    text: req.body.comment
                })
            })
            .catch(next)
     },

     getBirthday: (req, res, next) => {
         Birthday.findById(req.params.id)
         .populate('author')
         .populate('comments.author').exec((err, birthday) => {
             if (err)
                res.send(err)
             else if (!birthday)
                res.sendStatus(400)
             else 
                res.send(birthday)
             next()         
         })
     }
 }