'use strict';

var request = require('request')
  , cheerio = require('cheerio')
  , validUrl = require('valid-url')
  ;

function getAgenda(opts, callback){
  var endpoint = '/Meetings/Details/'
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

  if(!opts.meetingId){
    return callback(new Error('Missing required param: meetingId'), null);
  }

  url = opts.host + opts.path + endpoint + opts.meetingId;

  request(url, function (err, response, body) {
    if(err){
      return callback(err, null);
    } else {
      var $ = cheerio.load(body.toString())
        , data = {}
        , details = {}
        , agendaList = []
        , documentList = []
        , agenda = $('tr.on')
        , about = $('#about>div')
        , documents = $('#documents>ul>li>a')
        , item
        , doc
        ;

      details.board = about[1].attribs.title;
      details.place = about[3].children[0] ? about[3].children[0].data.trim() : '';
      details.date = about[5].children[0] ? about[5].children[0].data.trim() : '';
      details.status = about[7].children[0] ? about[7].children[0].data.trim() : '';

      data.details = details;

      Object.keys(documents).forEach(function(elem){
        if(typeof parseInt(elem, 10) === 'number'){
          doc = documents[elem];
          if(doc.hasOwnProperty('type')){
            item = {};
            item.fileUrl = opts.host + doc.attribs.href;
            item.title = doc.children[0].data;
            documentList.push(item);
          }
        }
      });

      data.documents = documentList;

      agenda.each(function (i, elem) {
        item = {};
        item.agendanumber = elem.children[1].children[0].data.trim();
        item.title = elem.children[3].children[1].children[0].data;
        item.id = elem.children[3].children[1].attribs.href ? elem.children[3].children[1].attribs.href.split('/').pop() : '';
        agendaList.push(item);
      });

      data.agenda = agendaList;

      return callback(null, data);
    }
  });

}

module.exports = getAgenda;