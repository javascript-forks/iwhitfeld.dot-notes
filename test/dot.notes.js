var dots = require('../');

var should = require('should');

describe('#fromNotation', function(){

    it('parses a flat object into nests', function(){
        var notatedObj = {
            'this.is.a.test': 5
        };

        var obj = dots.fromNotation(notatedObj);

        should(obj).be.ok;
        should(obj).be.an.Object;
        should(obj.this).be.ok;
        should(obj.this).be.an.Object;
        should(obj.this.is).be.ok;
        should(obj.this.is).be.an.Object;
        should(obj.this.is.a).be.ok;
        should(obj.this.is.a).be.an.Object;
        should(obj.this.is.a.test).be.ok;
        should(obj.this.is.a.test).be.a.Number;
        should(obj.this.is.a.test).eql(5);
    });

    it('parses multiple keys into nests', function(){
        var notatedObj = {
            'first.one': 5,
            'second.one': 5
        };

        var obj = dots.fromNotation(notatedObj);

        should(obj).be.ok;
        should(obj).be.an.Object;
        should(obj.first).be.ok;
        should(obj.first).be.an.Object;
        should(obj.first.one).be.ok;
        should(obj.first.one).be.an.Number;
        should(obj.first.one).eql(5);
        should(obj.second).be.ok;
        should(obj.second).be.an.Object;
        should(obj.second.one).be.ok;
        should(obj.second.one).be.a.Number;
        should(obj.second.one).eql(5);
    });

    it('merges together multiple keys', function(){
        var notatedObj = {
            'test.one': 5,
            'test.two': 5
        };

        var obj = dots.fromNotation(notatedObj);

        should(obj).be.ok;
        should(obj).be.an.Object;
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.one).be.ok;
        should(obj.test.one).be.an.Number;
        should(obj.test.one).eql(5);
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.two).be.ok;
        should(obj.test.two).be.a.Number;
        should(obj.test.two).eql(5);
    });

    it('merges together multiple keys', function(){
        var notatedObj = {
            'test.one': 5,
            'test.two': 5
        };

        var obj = dots.fromNotation(notatedObj);

        should(obj).be.ok;
        should(obj).be.an.Object;
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.one).be.ok;
        should(obj.test.one).be.an.Number;
        should(obj.test.one).eql(5);
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.two).be.ok;
        should(obj.test.two).be.a.Number;
        should(obj.test.two).eql(5);
    });

    it('merges together multiple objects', function(){
        var notatedObj = {
            'test.one': 5
        };

        var obj = dots.fromNotation(notatedObj, {
            test: {
                two: 5
            }
        });

        should(obj).be.ok;
        should(obj).be.an.Object;
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.one).be.ok;
        should(obj.test.one).be.an.Number;
        should(obj.test.one).eql(5);
        should(obj.test).be.ok;
        should(obj.test).be.an.Object;
        should(obj.test.two).be.ok;
        should(obj.test.two).be.a.Number;
        should(obj.test.two).eql(5);
    });

});

describe('#toNotation', function() {

    it('converts an object into flat dot notation', function () {
        var obj = {
            test: {
                one: 5
            }
        };

        var notatedObj = dots.toNotation(obj);

        should(notatedObj).be.ok;
        should(notatedObj).be.an.Object;
        should(notatedObj['test.one']).be.ok;
        should(notatedObj['test.one']).be.a.Number;
        should(notatedObj['test.one']).eql(5);
    });

    it('handles array values', function () {
        var obj = {
            test: {
                one: 5,
                two: [ 1, 2, 3 ]
            }
        };

        var notatedObj = dots.toNotation(obj);

        should(notatedObj).be.ok;
        should(notatedObj).be.an.Object;
        should(notatedObj['test.one']).be.ok;
        should(notatedObj['test.one']).be.a.Number;
        should(notatedObj['test.one']).eql(5);
        should(notatedObj['test.two[0]']).be.ok;
        should(notatedObj['test.two[0]']).be.a.Number;
        should(notatedObj['test.two[0]']).eql(1);
        should(notatedObj['test.two[1]']).be.ok;
        should(notatedObj['test.two[1]']).be.a.Number;
        should(notatedObj['test.two[1]']).eql(2);
        should(notatedObj['test.two[2]']).be.ok;
        should(notatedObj['test.two[2]']).be.a.Number;
        should(notatedObj['test.two[2]']).eql(3);
    });

    it('handles complex object values', function () {
        var obj = {
            test: {
                one: 5,
                two: [ 1, 2, { three: 3 } ]
            }
        };

        var notatedObj = dots.toNotation(obj);

        should(notatedObj).be.ok;
        should(notatedObj).be.an.Object;
        should(notatedObj['test.one']).be.ok;
        should(notatedObj['test.one']).be.a.Number;
        should(notatedObj['test.one']).eql(5);
        should(notatedObj['test.two[0]']).be.ok;
        should(notatedObj['test.two[0]']).be.a.Number;
        should(notatedObj['test.two[0]']).eql(1);
        should(notatedObj['test.two[1]']).be.ok;
        should(notatedObj['test.two[1]']).be.a.Number;
        should(notatedObj['test.two[1]']).eql(2);
        should(notatedObj['test.two[2].three']).be.ok;
        should(notatedObj['test.two[2].three']).be.a.Number;
        should(notatedObj['test.two[2].three']).eql(3);
    });

    it('handles special field names', function () {
        var obj = {
            'testing': {
                'test.one': [ { 'test.two': 2 }]
            }
        };

        var notatedObj = dots.toNotation(obj);

        should(notatedObj).be.ok;
        should(notatedObj).be.an.Object;
        should(notatedObj['testing[\'test.one\'][0][\'test.two\']']).be.ok;
        should(notatedObj['testing[\'test.one\'][0][\'test.two\']']).be.a.Number;
        should(notatedObj['testing[\'test.one\'][0][\'test.two\']']).eql(2);
    });

});

describe('#parseObject', function(){

    it('parses a string into an object', function(){
        var parsedObj = dots.parseObject('this.is.a.test', 5);
        
        should(parsedObj).be.ok;
        should(parsedObj).be.an.Object;
        should(parsedObj.this).be.ok;
        should(parsedObj.this).be.an.Object;
        should(parsedObj.this.is).be.ok;
        should(parsedObj.this.is).be.an.Object;
        should(parsedObj.this.is.a).be.ok;
        should(parsedObj.this.is.a).be.an.Object;
        should(parsedObj.this.is.a.test).be.ok;
        should(parsedObj.this.is.a.test).be.ok;
        should(parsedObj.this.is.a.test).be.a.Number;
        should(parsedObj.this.is.a.test).eql(5);
    });

    it('handles undefined values', function(){
        var parsedObj = dots.parseObject('this.is.a.test');

        should(parsedObj).be.ok;
        should(parsedObj).be.an.Object;
        should(parsedObj.this).be.ok;
        should(parsedObj.this).be.an.Object;
        should(parsedObj.this.is).be.ok;
        should(parsedObj.this.is).be.an.Object;
        should(parsedObj.this.is.a).be.ok;
        should(parsedObj.this.is.a).be.an.Object;
        should(parsedObj.this.is.a.test).not.be.ok;
    });

    it('merges a string into an object', function(){
        var parsedObj = dots.parseObject('this.is.a.test', 5, {
            this: {
                is: {
                    a: {
                        party: 5
                    }
                }
            }
        });

        should(parsedObj).be.ok;
        should(parsedObj).be.an.Object;
        should(parsedObj.this).be.ok;
        should(parsedObj.this).be.an.Object;
        should(parsedObj.this.is).be.ok;
        should(parsedObj.this.is).be.an.Object;
        should(parsedObj.this.is.a).be.ok;
        should(parsedObj.this.is.a).be.an.Object;
        should(parsedObj.this.is.a.test).be.ok;
        should(parsedObj.this.is.a.test).be.a.Number;
        should(parsedObj.this.is.a.test).eql(5);
        should(parsedObj.this.is.a.party).be.ok;
        should(parsedObj.this.is.a.party).be.a.Number;
        should(parsedObj.this.is.a.party).eql(5);
    });

});