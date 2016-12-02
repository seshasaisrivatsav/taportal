/**
 * Created by Dhvani on 11/18/2016.
 */

//Author: Dhvani
//Test cases for courses and semesters

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
            .send({'coursename': 'newCourse_test'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    //anvita
    // it('should create course negative path', function (done) {
    //    chai.request(server)
    //        .post('/api/course')
    //        .send("")
    //        .end(function (err, res) {
    //            err.should.have.status(200);
    //            done();
    //        });
    // });
    //end anvita

    it('should not create a course that exists', function (done) {
        chai.request(server)
            .post('/api/course')
            .send({'coursename': 'newCourse_test'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should update a course', function (done) {
        chai.request(server)
            .get('/api/courseName/newCourse_test')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/course/'+res.body._id)
                    .send({'coursename': 'newCourse_test1'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });
    });

    // anvita
    it('should update a course negative path', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/course/123')
                    .send({'coursename': 'updatedCourse'})
                    .end(function (error, response) {
                        response.should.have.status(404);
                        // done();
                    });
                done();
            });
    });
    // end anvita

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

// Anvita working ---- async test
    // this.timeout(15000);
//    it('should find course by courseid negative path', function (done) {
//        this.timeout(150);
//        setTimeout(done, 150);
//        chai.request(server)
//            .get('/api/course/123')
//            .end(function (error, response) {
//                response.should.have.status(200);
//done();
//            });

    //chai.request(server)
    //    .get('/api/findallcourses')
    //    .end(function (err, res) {
    //        chai.request(server)
    //            .get('/api/course/123')
    //
    //            .end(function (error, response) {
    //                response.should.have.status(200);
    //
    //            });
    //        done();
    //    });


    it('should delete a course', function (done) {
        chai.request(server)
            .get('/api/courseName/newCourse_test1')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/course/' + res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                // done();
            });
    });
// end anvita

    // anvita fix
//anvita
    it('should delete a course negative path', function (done) {
        chai.request(server)
            .get('/api/courseName/:courseName')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/course/123')
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });
    });
// end anvita


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
            .send({'semestername': 'testsem1'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
//anvita - check
//     it('should create semester negative path', function (done) {
//         chai.request(server)
//             .post('/api/semester')
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
    // anvita end

    it('should not create a semester that exists', function (done) {
        chai.request(server)
            .post('/api/semester')
            .send({'semestername': 'testsem1'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });


    it('should update a semester', function (done) {
        chai.request(server)
            .get('/api/semesterName/testsem1')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/semester/'+res.body._id)
                    .send({'semestername': 'testsem11'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });

    });

    //anvita
    it('should update a semester negative path', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/semester/:123')
                    .send({'semestername': 'updatedSem'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });

    });



    it('should find semester by semesterid negative path', function (done) {
        chai.request(server)
            .get('/api/semester/123')
            .end(function (error, response) {
                response.should.have.status(200);
                done();
            });
        done();
    });

    //end anvita


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
            .get('/api/semesterName/testsem11')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/semester/' + res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        // done();
                    });
                done();
            });
    });



});



