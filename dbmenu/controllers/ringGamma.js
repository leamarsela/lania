const config = require('../config.js').config();
const knex = require('knex')(config);

function inputData() {

  const idRingGamma = document.querySelector('#id_ring_gamma').value;
  const weightRingGamma = document.querySelector('#weight_ring_gamma').value;
  const diameterRingGamma = document.querySelector('#diameter_ring_gamma').value;
  const thickRingGamma = document.querySelector('#thick_ring_gamma').value;
  const createdAt = new Date();

  const ringGamma = [
    {
      'id_ring': idRingGamma,
      'weight_ring': weightRingGamma,
      'diameter_ring': diameterRingGamma,
      'thick_ring': thickRingGamma,
      'created_at': createdAt,
      'updated_at': null
    }
  ]

  knex('ring_gamma').insert(ringGamma)
    .then(() => {
      console.log('sukses')
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy()
    });

};


function showDataAll() {

  knex('ring_gamma').select('*')
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

        allData.appendChild(tr);
      }

    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      knex.destroy()
    });
};

module.exports = {
  inputData,
  showDataAll
};

