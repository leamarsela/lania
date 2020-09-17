const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const config = require("../config.js").config();
  const knex = require('knex')(config);

  const idProject = document.querySelector('#id_project').value;
  const idClient = document.querySelector('#id_client').value;
  const projectName = document.querySelector('#project_name').value;
  const projectLocation = document.querySelector('#project_location').value;

  const project = [
    {
      'id_project': idProject,
      'id_client': idClient,
      'project_name': projectName,
      'project_location': projectLocation
    }
  ]

  knex('projects').insert(project)
    .then(() => {
      console.log('sukses')
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy();
    })
};




