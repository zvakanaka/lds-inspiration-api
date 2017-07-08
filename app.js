var restify = require('restify');
var plugins = require('restify-plugins');


const server = restify.createServer({
  name: 'inspirational-api',
  version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/quote', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let authoredQuotes = require('./quotes.json');
  let quote = authoredQuotes[getRandomIndex(authoredQuotes)];
  res.json(quote);
  return next();
});

server.get('/image', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let backgroundUrls = require('./backgrounds.json');
  let background = backgroundUrls[getRandomIndex(backgroundUrls)];
  res.json(background);
  return next();
});

function getRandomIndex(arr) {
  let max = arr.length-1;
  return Math.floor(Math.random() * (max + 1));
}

server.listen(5555, function () {
  console.log('%s listening at %s', server.name, server.url);
});
