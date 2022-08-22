console.clear();
require('../index')

const 
     chai                = require("chai"),
     chaiHttp            = require('chai-http'),
     expect              = chai.expect,
     should              = chai.should(),
     server              = require('../src/app'),

     {Profile}           = require("../src/models/Profile"),
     {Simulator}         = require("../src/models/Simulator"),
     {Favorite}          = require("../src/models/Favorite");


chai.use(chaiHttp);

let idProfile

describe('Empty DB', () => {
     Profile.deleteMany({})   .then()
     Simulator.deleteMany({}) .then()
     Favorite.deleteMany({})  .then()
});

describe('Seed DB', () => {

     it("Create Sample Profile",done => {

          Profile.create({

               name:                       `String`,
               email:                      `String`,
               capital:                    `123`,
               divisa:                     `String`,
               prefered_cryptocurrency:    `String`,

          })
          .then(profile => {
               idProfile = profile._id
               expect(profile).to.not.equal(null)
               done();
          })

     });

     it("Create Sample Simulator",done => {

          Simulator.create({
               profile_id:         idProfile,
               name:               `String`,
               start_date:         `01/05/2021`,
               check_date:         `01/05/2021`,
               cryptocurrency:     `String`,
               divisa:             `String`,
               Crypto_price_start: `123`,
               Crypto_price_check: `123`,
          })
          .then(simulator => {
               expect(simulator).to.not.equal(null)
               done();
          })

     });

     it("Create Sample Favorite",done => {

          Favorite.create({

               profile_id:         idProfile,
               name:               `String`,
               favorite1:          `String`,
               favorite2:          `String`,
               favorite3:          `String`,
           })
          .then(favorite => {
               
               expect(favorite).to.not.equal(null)
               done();
               
          })

     });

});

describe('CHECK SECTION', () => {

     it("get-favorite", done => {

          chai.request(server)
               .get('/favorite')
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });
     
     it("get-profile", done => {

          chai.request(server)
               .get('/profile')
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

     it("get-favorite", done => {

          chai.request(server)
               .get('/simulator')
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

     it("get-favorite-byID", done => {

          chai.request(server)
               .get(`/favorite/${idProfile}`)
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

     it("get-simulator-byID", done => {

          chai.request(server)
               .get(`/simulator/${idProfile}`)
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

     it("set-profile", done => {

          chai.request(server)
               .post(`/profile`)
               .send({
                    "email":                    "hamed.elahfar@gmail.com",
                    "name":                     "hamed",
                    "nickname":                 "med",
                    "capital":                  1,
                    "divisa":                   "string",
                    "prefered_cryptocurrency":  "string"
               })
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

     it("set-simulator", done => {

          chai.request(server)
               .post(`/simulator/${idProfile}`)
               .send({
                    "email":           "hamed.elahifar@gmail.com",
                    "name":            "hamed",
                    "nickname":        "med",
                    "cryptocurrency":  "BTC",
                    "euros":           1,
                    "price":           1,
                    "quantity":        1

               })
               .end((err, res) => {
                    if (err) {done(err)}
                    expect(res.body[0]).to.not.equal(null)
                    done();
               })
     });

})
