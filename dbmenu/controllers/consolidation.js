const config = require('../config.js').config();
const knex = require('knex')(config);

function inputData() {

  const idConsolidation = document.querySelector('#id_consolidation').value;
  const weightConsolidation = document.querySelector('#weight_consolidation').value;
  const diameterConsolidation = document.querySelector('#diameter_consolidation').value;
  const thickConsolidation = document.querySelector('#thick_consolidation').value;
  const createdAt = new Date();

  const consolidation = [
    {
      'id_ring': idConsolidation,
      'weight_ring': weightConsolidation,
      'diameter_ring': diameterConsolidation,
      'thick_ring': thickConsolidation,
      'created_at': createdAt,
      'updated_at': null,
    }
  ]

  knex('consolidation').insert(consolidation)
    .then(() => {
      console.log('sukses');
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy();
    });
}


function showDataAll() {

  knex('consolidation').select('*')
    .then((rows) => {
      
      for(row of rows) {
        let allData = document.getElementById('all_data');
        let tr = document.createElement('tr');

        tr.innerHTML = `
          <td> ${row.id_ring} </td>
          <td> ${row.weight_ring} </td>
          <td> ${row.diameter_ring} </td>
          <td> ${row.thick_ring} </td>
        `;

        allData.appendChild(tr)
      }

    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      knex.destroy();
    });
};

module.exports = {
  inputData,
  showDataAll
}