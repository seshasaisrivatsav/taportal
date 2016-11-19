/**
 * Created by Dhvani on 11/18/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var position = require('../project/model/user/position.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);

var pid = "";

describe('TestsForPositions', function() {

    it('should find all positions', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });


    it('should find all positions error', function (done) {
        chai.request(server)
            .get('/api/findallpositions/789')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });


    it('should create position', function (done) {
        chai.request(server)
            .post('/api/position')
            .send({'course' : 'testCourse1', 'semester': 'test sem1', 'number' : '10',
                'professor' : 'test prof', 'deadline' : '2/1/2016'})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });


    it('should update a position', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/position/' + res.body._id)
                    .send({'course' : 'testCourse2', 'semester': 'test sem2', 'number' : '20',
                        'professor' : 'test prof updated', 'deadline' : '2/1/2016'})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                done();
            });

    });


    // it('should find position by positionid', function (done) {
    //     chai.request(server)
    //         .get('/api/findallpositions')
    //         .end(function (err, res) {
    //             chai.request(server)
    //                 .get('/api/position/' + res.body._id)
    //                 .end(function (error, response) {
    //                     response.should.have.status(200);
    //                     done();
    //                 });
    //         });
    // });

    it('should find position by positionid', function (done) {

        chai.request(server)
            .post('/api/position')
            .send({'course' : 'testCourse3', 'semester': 'test sem3', 'number' : '25',
                'professor' : 'test prof3', 'deadline' : '2/2/2016'})
            .end(function (err, res) {
                pid = res.body._id;
                chai.request(server)
                    .get('/api/position/' + pid)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    })
                done();
            });
    });


    it('should delete a position', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/position/' + res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                done();
            });
    });


});



