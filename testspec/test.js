/**
 * Created by Dhvani on 11/9/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
// var server = require('../project/app');
var should = chai.should();
var userId = "";
var id = "";

var expect = require('chai').expect;


var user = require('../project/model/user/user.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);


describe('users service', function() {
    it('should get all users', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                res.should.have.status(200);
                // res.body.error.should.equal(false);
                done();
            })
    });


    //dhvani start
    it('should get all users error', function (done) {
        chai.request(server)
            .get('/api/findallusers/789')
            .end(function(err, res){
                res.should.have.status(404);
                // res.body.error.should.equal(false);
                done();
            })
    });
    //dhvani end

    it('user should be able to login', function (done) {
        chai.request(server)
            .get('/api/loggedIn')
            .end(function(err, res){
                res.should.have.status(200);
                // res.should.be.json;
                done();
            })
    });


    it('should not be able to get user', function (done) {
        chai.request(server)
            .get('/api/user='+"?dsheth"+"&&dsheth")
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            });

    });

    it('should be able to get all user', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc"+"&password=zxc")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });

    });

    it('should be able to get all user with username', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });

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
            });
    });


});

describe("user form", function(){
    var newuser = new user({
        username: 'manognya', password: 'manognyakoduganti', firstName: 'manognya', lastName: 'koduganti',
        email: 'manognya@ccs.neu.edu', usertype: 'student'
    });
    var confirm_password = 'manognyakoduganti';
    var case_check_password = 'ManognyaKoduganti';


    it("invalid e-mail id",function(done){
        expect(newuser.email).to.match(/^[a-zA-Z]+[a-zA-Z0-9._%+-]*@ccs.neu.edu$/);
        done();
    });


    it("firstname too small",function(done){
        expect(newuser.firstName).to.have.length.above(1);
        done();
    });

    it("firstname too large",function(done){
        expect(newuser.firstName).to.have.length.below(50);
        done();
    });

    it("lastname too small",function(done){
        expect(newuser.lastName).to.have.length.above(1);
        done();
    });
    it("lastname too large",function(done){
        expect(newuser.lastName).to.have.length.below(50);
        done();
    });

    it("password length too small",function(done){
        expect(newuser.password).to.have.length.above(8);
        done();
    });

    it("password too large",function(done){
        expect(newuser.firstName).to.have.length.below(50);
        done();
    });

    it("passwords should match",function(done){
        expect(newuser.password).equal(confirm_password);
        done();
    });

    it("passwords should match",function(done){
        expect(newuser.password).not.equal(case_check_password);
        done();
    });

});


it('should be able to get user', function (done) {

    var newUser = new user({
        username: 'dhvani',
        password: 'dhvani1234',
        usertype: 'student'
    });
    newUser.save(function (err, data) {
        chai.request(server)
            .get('/api/user/'+data.id)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                id = res.body._id;
                res.body._id.should.equal(data.id);
                done();
            })
    });

});



it('should update a SINGLE user on /api/user/<id> PUT', function(done) {
    var updated_user = new user({
        username: 'manognya',
        password: 'manognyakoduganti',
        usertype: 'student'
    });
    chai.request(server)
        .put('/api/user/'+id)
        .send(updated_user)
        .end(function(error, response){
            response.should.have.status(200);
            done();
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



it('should be able to get user', function (done) {

    var newUser = new user({
        username: 'dsheth',
        password: 'dsheth',
        usertype: 'student'
    });
    newUser.save(function (err, data) {
        chai.request(server)
            .get('/api/user/'+data.id)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                res.body.username.should.equal('dsheth');
                res.body.password.should.equal('dsheth');
                userId = res.body._id;
                res.body._id.should.equal(data.id);
                done();
            })
    });

});

it('should be able to find user by id', function (done) {

    chai.request(server)
        .get('/api/user/'+userId)
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body._id.should.equal(userId);
            done();
        });
});

it('should be able to delete user by id', function (done) {


    chai.request(server)
        .delete('/api/user/' + userId)
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
});

it('verify delete user by id', function (done) {

    chai.request(server)
        .get('/api/user/'+userId)
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });


});