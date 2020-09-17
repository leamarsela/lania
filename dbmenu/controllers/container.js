const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const config = require("../config.js").config();
  const knex = require('knex')(config);

  const idContainer = document.querySelector('#id_container').value;
  const weightContainer = document.querySelector('#weight_container').value;

  const container = [
    {
      'id_container': idContainer,
      'weight_container': weightContainer,
    }
  ]

  knex('containers').insert(container)
    .then(() => {
      console.log('sukses');
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy();
    })
};