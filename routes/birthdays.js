const birthdayController = require('./controllers/birthday.controller')
const multipart = require('connect-mmultiparty')
const multipartWare = multipart()

module.exports = (router) => {
    /**
     * get all birthdays
     */
    router.route('/birthdays')
        .get(birthdayController.getAll)

    // show a birthday
    router.route('/birthday')
        .post(multipartWare, birthdayController.addBirthday)

    // Clap a birthday 
    router.route('/birthday/clap')
        .post(birthdayController.clapBirthday)
        
    // comment on a birthday
    router.route('/birthday/comment')
        .post(birthdayController.commentBirthday)
        
    // get a particular birthday to view
    router.route('/birthday/:id')
        get(birthdayController.getBirthday) 
}