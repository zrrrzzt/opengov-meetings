'use strict';

var assert = require('assert')
  , getDetails = require('../index').getDetails;
;

describe('opengov-meetings - getDetails', function(){

  it('Requires an opts object', function(done){

    getDetails(function(err, data){
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

    getDetails(opts, function(err, data){
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

    getDetails(opts, function(err, data){
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

    getDetails(opts, function(err, data){
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

  it('Requires agendaId is set', function(done){

    var opts = {
        host: 'http://opengov.cloudapp.net',
        path: '/Meetings/tfk',
        agendaId: false
      }
      ;

    getDetails(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required param: agendaId/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

});