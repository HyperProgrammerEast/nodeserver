const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

// Call chai and initial http functions
chai.use(chaiHttp)

// Initial test for Chai and Mocha
describe('Simple Test', () => {
    it('Should callback and tell me the test was successful', () => {
        
    });
});

// Actual call to get all birthdays
// describe('Birthdays', () => {
//     it('Should call and get all birthdays in the database on /birthdays GET', (done) => {
//         chai.request(server)
//         .get('/birthdays')
//         .end((err, res) => {
//             res.should.have.status(200)
//             done();
//         })
//     });
// });