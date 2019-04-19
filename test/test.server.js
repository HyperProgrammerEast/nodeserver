const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should();
const apiPrefix = "/api/";

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
//         .get(apiPrefix + "birthdays")
//         .end((err, res) => {
//             res.should.be.json;
//             res.should.have.status(200);
//             res.body.should.be.a("array");
//             done();
//         })
//     });
// });