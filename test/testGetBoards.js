'use strict';

var assert = require('assert')
  , getBoards = require('../index').getBoards;
;

describe('opengov-meetings - getBoards', function(){

  it('Requires an opts object', function(done){

    getBoards(function(err, data){
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

    getBoards(opts, function(err, data){
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

    getBoards(opts, function(err, data){
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

    getBoards(opts, function(err, data){
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

});