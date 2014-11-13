'use strict';

var request = require('request')
  , cheerio = require('cheerio')
  , validUrl = require('valid-url')
  ;

function getDetails(opts, callback){

  var endpoint = '/AgendaItems/Details/'
    , url
    ;

  if(typeof opts === 'function'){
    callback = opts;
  }

  if(typeof opts !== 'object'){
    return callback(new Error('Missing required opts object'), null);
  }

  if(!opts.host){
    return callback(new Error('Missing required param: host'), null);
  }

  if(opts.host && !validUrl.isWebUri(opts.host)){
    return callback(new Error('host is not a valid url'), null);
  }

  if(!opts.path){
    return callback(new Error('Missing required param: path'), null);
  }

  if(!opts.agendaId){
    return callback(new Error('Missing required param: agendaId'), null);
  }

  url = opts.host + opts.path + endpoint + opts.agendaId;

  request(url, function (err, response, body) {
    if(err){
      return callback(err, null);
    } else {
      var $ = cheerio.load(body.toString())
        , list = []
        , files = $('table.agendaDetails>tbody>tr')
        , item
        ;

      files.each(function (i, elem) {
        if(i > 0) {
          item = {};
          item.title = elem.children[3].children[0].children[0].data;
          item.documentUrl = opts.host + elem.children[3].children[0].attribs.href;
          item.documentSize = elem.children[5].children[0].data;
          item.documentCategory = elem.children[7].children[0].data;
          list.push(item);
        }
      });

      return callback(null, list);
    }
  });

}

module.exports = getDetails;