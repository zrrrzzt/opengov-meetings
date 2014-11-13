'use strict';

var assert = require('assert')
  , getMeetings = require('../index').getMeetings;
;

describe('opengov-meetings - getMeetings', function(){

  it('Requires an opts object', function(done){

    getMeetings(function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required opts object/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

  it('Requires host is set', function(done){

    var opts = {
        host:false
      }
      ;

    getMeetings(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required param: host/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

  it('Requires host is a valid url', function(done){

    var opts = {
        host:'pølsedasking'
      }
      ;

    getMeetings(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /host is not a valid url/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

  it('Requires path is set', function(done){

    var opts = {
        host: 'http://opengov.cloudapp.net',
        path: false
      }
      ;

    getMeetings(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required param: path/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

  it('Requires boardId is set', function(done){

    var opts = {
        host: 'http://opengov.cloudapp.net',
        path: '/Meetings/tfk',
        boardId: false
      }
      ;

    getMeetings(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required param: boardId/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

});