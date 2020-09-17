const config = require('./config.js').config();
const knex = require('knex')(config);

knex.select("*").from('projects').where('id', '=', 1)
  .then((rows) => {
    console.log(rows);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    knex.destroy();
  });
