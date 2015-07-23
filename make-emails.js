var fs = require('fs');
var linebyline = require('line-by-line');

var fileReader;

var emailStart = 'Hello,\n You have recieved this email because several people have expressed interest in you product.\n\n';

var messages = [];

fs.watchFile('data.txt', function(){

  fileReader = new linebyline('data.txt');

  fileReader.on('line', function(data) {

    var email = 'Email address: \"'+JSON.parse(data).email+'\"';
    var message = 'Message: \"'+JSON.parse(data).message+'\"';
    var industry = 'Industry \"'+JSON.parse(data).industry+'\"';
    var timestamp = 'Timestamp \"'+JSON.parse(data).timestamp+'\"';

    messages.push(email + ' ' + message + ' ' + industry + ' ' + timestamp);

    if(messages.length >= 10) {

      for(var i=0;i<messages.length;i++) {

        console.log(messages[i]);

        fs.appendFile('log.txt', messages[i]+'\n');

      }

      messages = [];

    }

  });
  fileReader.on('end', function(){

    fs.writeFile('data.txt', '');

  });

});
