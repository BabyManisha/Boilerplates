const bodyParser = require('body-parser');
const api = require('./api');

module.exports = app => {
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({extended: true}));
  app.use('/api', api);
};