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

describe('DB', () => {});

