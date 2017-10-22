var express = require('express'),
    app = express(),
    engines = require('consolidate'); // a wrapper for number of template engines

app.engine('html', engines.nunjucks); // registering nunjucks 
app.set('view engine', 'html'); // we will end up using this engine for html
app.set('views', __dirname + '/views'); // full path to directory in which our template is in

app.get('/', function(req, res) {
    res.render('hello', { name : 'Templates' }); // use render instead of send, and send data as param
});

app.use(function(req, res){
    res.sendStatus(404); 
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
