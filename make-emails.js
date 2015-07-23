var fs = require('fs');
var linebyline = require('line-by-line');

var fileReader;

var emailStart = 'Hello,\n\tYou have received this email because several people have expressed interest in you product.\n\n';
var emailEnd = 'From the make-emails bot :)';

var messages = [];

var maxInterval = 3600000;

setInterval(function() {

  console.log('timed out');

  if(messages.length === 0) return;

  var email = emailStart;

  for(var i=0;i<messages.length;i++) {

    console.log(messages[i]);

    fs.appendFile('log.txt', messages[i]+'\n');

    email += (i+1)+' : '+messages[i]+'\n';

  }

  messages = [];

  email += '\n'+emailEnd;

  fs.writeFile('email.txt', email);

}, maxInterval);

fs.watchFile('data.txt', function(){

  fileReader = new linebyline('data.txt');

  fileReader.on('line', function(data) {

    var email = 'Email address: \"'+JSON.parse(data).email+'\"';
    var message = 'Message: \"'+JSON.parse(data).message+'\"';
    var industry = 'Industry \"'+JSON.parse(data).industry+'\"';
    var timestamp = 'Timestamp \"'+JSON.parse(data).timestamp+'\"';

    messages.push(email + ' ' + message + ' ' + industry + ' ' + timestamp);

    if(messages.length >= 10) {

      var email = emailStart;

      for(var i=0;i<messages.length;i++) {

        console.log(messages[i]);

        fs.appendFile('log.txt', messages[i]+'\n');

        email += (i+1)+' : '+messages[i]+'\n';

      }

      messages = [];

      email += '\n'+emailEnd;

      fs.writeFile('email.txt', email);

    }

  });
  fileReader.on('end', function(){

    fs.writeFile('data.txt', '');

  });

});
