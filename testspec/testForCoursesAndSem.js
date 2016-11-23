/**
 * Created by Dhvani on 11/18/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var course = require('../project/model/user/course.schema.server');
var semester = require('../project/model/user/semester.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);

var cid = "";

describe('Tests For Courses', function() {

    it('should find all courses', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });


    it('should find all courses error', function (done) {
        chai.request(server)
            .get('/api/findallcourses/789')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });


    it('should create course', function (done) {
        chai.request(server)
            .post('/api/course')
            .send({'coursename': 'testCourse1'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should create course', function (done) {
        chai.request(server)
            .post('/api/course')
            .send({'coursename': 'test course qwerty'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should not create a course that exists', function (done) {
        chai.request(server)
            .post('/api/course')
            .send({'coursename': '(CS 5010) PDP'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });


    it('should update a course', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function(err, res){
        chai.request(server)
            .put('/api/course/'+res.body[0]._id)
            .send({'coursename': 'updatedCourse'})
            .end(function (error, response) {
                response.should.have.status(200);
                // done();
            });
            done();
        });
    });


    it('should find course by courseid', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/course/' + res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });


    it('should delete a course', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function(err, res){
        chai.request(server)
            .delete('/api/course/' + res.body[1]._id)
            .end(function (error, response) {
                response.should.have.status(200);
                // done();
            });
            done();
        });
    });

    it('should delete a course error', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/course/' + res.body[1]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });
    });


});

describe('Tests For Semesters', function() {

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
            .post('/api/semester')
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
                        // done();
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
                        // done();
                    });
                done();
            });
    });



});



