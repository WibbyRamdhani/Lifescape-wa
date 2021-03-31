const fetch = require('node-fetch');
const API = module.exports

// API.getlifescape = () => new Promise((resolve, reject) => {
//   fetch('https://testinglifescape.bellezza.id/lifescape_monitoring/index.php', {
//      method: 'GET'
//     })
//     .then(res => res.json())
//     .then(res => {
//       resolve(res.data)
//     })
//     .catch(err => {
//       reject(err)
//     });
// })

API.getlifescape = () => new Promise((resolve, reject) => {
  fetch("https://testinglifescape.bellezza.id/lifescape_monitoring/index.php")
        .then(response => {
        return resolve(response.json());
        }).then(people => {
        console.log(people);
    });
})