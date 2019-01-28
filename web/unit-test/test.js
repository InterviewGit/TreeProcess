var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
var should = require('should');
var app = require('../index').app;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var agent = request.agent(app);
const processTree = require('../processTree');


describe('ProcessTree process function ', () => {
    it('should return 9 for give input', async () => {
        var input = "1,2,NULL,5,1,NULL,NULL,NULL,3,6,NULL,NULL,7,NULL,NULL";
        var p = await processTree.process(input)
        expect(p).to.equal('9');
    });
    it('should return 3 for give input', async () => {
        var input = "1,2,NULL,NULL,NULL";
        var p = await processTree.process(input)
        expect(p).to.equal('3');
    });
    it('single root value', async () => {
        var input = "1,NULL,NULL";
        var p = await processTree.process(input)
        expect(p).to.equal('1');
    });
    it('null should return zero', async () => {
        var input = "NULL";
        var p = await processTree.process(input)
        expect(p).to.equal('0');
    });
});

describe('createTree ', () => {
    it('should create a valid tree_1', async () => {
        var input = "1,2,NULL,5,1,NULL,NULL,NULL,3,6,NULL,NULL,7,NULL,NULL";
        input = input + '';
        input = input.split(",");
        var p = await processTree.createTree(input);
        expect(p.data).to.equal(1);
    });
    it('should create a valid tree_2', async () => {
        var input = "12,2,NULL,NULL,NULL";
        input = input + '';
        input = input.split(",");
        var p = await processTree.createTree(input);
        expect(p.data).to.equal(12);
    });
    it('should create a valid tree with single root', async () => {
        var input = "2,NULL,NULL";
        input = input + '';
        input = input.split(",");
        var p = await processTree.createTree(input);
        expect(p.data).to.equal(2);
    });
});

describe('maxsum function ', () => {
    it('should change finalSum to valid answer', async () => {
        var input = "1,2,NULL,5,1,NULL,NULL,NULL,3,6,NULL,NULL,7,NULL,NULL";
        input = input + '';
        input = input.split(",");
        var p = await processTree.createTree(input);
        await processTree.maxSum(p);
        setTimeout(function(){
            expect(processTree.finalSum).to.equal(9);
        },100);
    });
});

describe('Express/Mongodb testing', function () {
	describe('Get user details', function () {
		it('Should get status equal success', function (done) {
			agent
            .get('/')
			.expect(200, done);
        });
        it('Should get status equal success', function (done) {
			agent
            .get('/gg')
			.expect(404, done);
        });
    });
});