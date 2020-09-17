const config = require('../config.js').config();
const knex = require('knex')(config);

function inputData() {

  const idPycnometer = document.querySelector('#id_pycnometer').value;
  const pycnometerWeight = document.querySelector('#pycnometer_weight').value;
  const valM = document.querySelector('#val_m').value;
  const valN = document.querySelector('#val_n').value;
  const createdAt = new Date();

  const pycnometer = [
    {
      'id_pycnometer': idPycnometer,
      'pycnometer_weight': pycnometerWeight,
      'val_m': valM,
      'val_n': valN,
      'created_at': createdAt,
      'updated_at': null
    }
  ]

  knex('pycnometer').insert(pycnometer)
    .then(() => {
      console.log('sukses');
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy()
    });

};


function showDataAll() {
  
  knex('pycnometer').select('*')
    .then((rows) => {

      for(row of rows) {
        let allData = document.getElementById('all_data');
        let tr = document.createElement('tr');
        
        tr.innerHTML = `
          <td> ${row.id_pycnometer} </td>
          <td> ${row.pycnometer_weight} </td>
          <td> ${row.val_m} </td>
          <td> ${row.val_n} </td>
        `;

        allData.appendChild(tr);
      }

    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      knex.destroy()
    });
}

module.exports = {
  inputData,
  showDataAll
}