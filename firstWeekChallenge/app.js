const express = require('express'),
      app = express(),
      engines = require('consolidate'),
      MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

MongoClient.connect('mongodb://localhost:27017/challengeOne', function(err, db) {
  assert.equal(null, err);
  console.log('Succesfully connected to MongoDB');
  app.get('/', function(req, res) {
    db.collection('newMovies').find({}).toArray(function(err, docs) {
      res.render('newMovies', {'movies': docs});
    });
  });
  // If any unrecognised path is given, use the following code.
  app.use(function(req, res){
    res.sendStatus(404);
  });
  const server = app.listen(3300, function() {
    const port = server.address().port;
    console.log('Express started listening on port %s', port);
  });
});  
