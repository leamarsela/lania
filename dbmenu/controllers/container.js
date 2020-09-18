const config = require("../config.js").config();
const knex = require('knex')(config);


function inputData() {

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

function showDataAll() {

  knex('containers').select('*')
    .then((rows) => {

      for(row of rows) {
        let allData = document.getElementById('all_data');
        let tr = document.createElement('tr');

        tr.innerHTML = `
          <td> ${row.id_container} </td>
          <td> ${row.weight_container} </td>
        `;

        allData.appendChild(tr);
      }

    }).catch((err) => {
      conslode.log(err)
    }).finally(() => {
      knex.destroy()
    });
};

module.exports = {
  inputData,
  showDataAll
}