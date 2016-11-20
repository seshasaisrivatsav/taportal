/**
 * Created by Dhvani on 11/9/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var user = require('../project/model/user/user.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);


describe('Test For User', function() {

    it('should get all users', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });


    //dhvani start
    it('should get all users error', function (done) {
        chai.request(server)
            .get('/api/findallusers/789')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            })
    });
    //dhvani end

    it('should add a single user on /api/user POST', function(done) {
        chai.request(server)
            .post('/api/user')
            .send({'username': 'zxc', 'password': 'zxc'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('user should be able to login', function (done) {
        chai.request(server)
            .get('/api/loggedIn')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });


    it('should not be able to get user', function (done) {
        chai.request(server)
            .get('/api/user='+"?dsheth"+"&&dsheth")
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })

    });

    it('should be able to get a user', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc"+"&password=zxc")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should be able to get a user with username', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });


    it('should add a single user on /api/user POST', function(done) {
        chai.request(server)
            .post('/api/user')
            .send({'username': 'abc', 'password': 'abc'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });



    it('should not register present user on /api/register POST', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({'username': 'zxc', 'password': 'zxc'})
            .end(function(err, res){
                res.should.have.status(400);
                done();
            });
    });

    it('should register a user on /api/register POST', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({'username': 'new', 'password': 'neww'})
            .end(function(err, res){
                newid = res.body._id;
                res.should.have.status(200);
                done();
            });
    });

    it('should delete a user on /api/register delete', function(done) {
        chai.request(server)
            .delete('/api/user/' + newid)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should login a single user on /api/login POST', function(done) {
        chai.request(server)
            .post('/api/login')
            .send({'username': 'zxc', 'password': 'zxc'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should update a user', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/'+ res.body[0]._id)
                    .send({'firstName': 'updateFirstName'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    })
            });
    });

    it('should find user by userid', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .get('/api/user/'+ res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    })
            });
    });

    it('user should be able to logout', function (done) {
        chai.request(server)
            .post('/api/logout')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should find all users', function (done) {
        chai.request(server)
            .get('/api/user/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
        done();
    });


});










/*
describe('Tests For Users', function() {

    it('should find all semesters', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });


    it('should find all semesters error', function (done) {
        chai.request(server)
            .get('/api/findallsemesters/789')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });


    it('should create semester', function (done) {
        chai.request(server)
            .post('/api/semester')
            .send({'semestername': 'test sem1'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should not create a semester that exists', function (done) {
        chai.request(server)
            .post('/api/course')
            .send({'semestername': 'Summer 1 17'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });


    it('should update a semester', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/semester/'+res.body[0]._id)
                    .send({'semestername': 'updatedSem'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                done();
            });

    });


    it('should find semester by semesterid', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/semester/' + res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });


    it('should delete a semester', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/semester/' + res.body[1]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                done();
            });
    });


});*/
