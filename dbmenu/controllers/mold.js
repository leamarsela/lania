const config = require('../config.js').config();
const knex = require('knex')(config);

function inputData() {

  const idMold = document.querySelector('#id_mold').value;
  const weightMold = document.querySelector('#weight_mold').value;
  const diameterMold =document.querySelector('#diameter_mold').value;
  const thickMold = document.querySelector('#thick_mold').value;
  const createdAt = new Date();

  const mold = [
    {
      'id_mold': idMold,
      'weight_mold': weightMold,
      'diameter_mold': diameterMold,
      'thick_mold': thickMold,
      'created_at': createdAt,
      'updated_at': null
    }
  ]

  knex('mold').insert(mold)
    .then(() => {
      console.log('sukses');
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy();
    });
};


function showDataAll() {

  knex('mold').select('*')
    .then((rows) => {

      for(row of rows) {
        let allData = document.getElementById('all_data');
        let tr = document.createElement('tr');

        tr.innerHTML = `
          <td> ${row.id_mold} </td>
          <td> ${row.weight_mold} </td>
          <td> ${row.diameter_mold} </td>
          <td> ${row.thick_mold} </td>
        `;

        allData.appendChild(tr)
      }
      
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy();
    });
};

module.exports = {
  inputData,
  showDataAll
}