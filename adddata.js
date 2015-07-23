var fs = require('fs');

var data;

data = JSON.stringify({email:'generic@email.com',message:'I very much like your product, and am very interested in buying it.',industry:'Architect',timestamp:'2015-07-23T11:34:50.528Z'});

fs.appendFile('data.txt', data+'\n', function(err){})
