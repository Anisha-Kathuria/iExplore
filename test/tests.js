process.env.NODE_ENV = 'test';

const chai = require('chai');
const express = require('express');
const request = require('supertest');
const chaiHttp =require('chai-http');

const expect=chai.expect();
chai.use(chaiHttp);

const conn = require('../db/index');
var androidRoutes = require("../routes/androidRoutes");

describe('GET /buildingsInfo', () => {

    /*
    before((done) => {
        conn.connect()
          .then(() => done())
          .catch((err) => done(err));
      })
    
      after((done) => {
        conn.close()
          .then(() => done())
          .catch((err) => done(err));
      })
    */
    it('OK, /buildingsInfo sends no buildings',(/*done*/) => {
        chai.request(androidRoutes)
        .get('/buildingsInfo')
        .then((err,res) => {
          expect(res).to.have.status(200);
          const body = res.body;  
          expect(body.length).to.equal(0);
          //done();
        })
        //.catch((err) => done(err));
    });


    it('OK, /buildingsInfo sends 4 buildings', () => {
        request(androidRoutes).get('/buildingsInfo')
          .then((res) => {
            expect(res).to.have.status(200);
            const body = res.body;
            expect(body.length).to.equal(4);
          })
         
    });
})  

