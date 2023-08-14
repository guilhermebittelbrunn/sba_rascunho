const axios = require('axios');
const fs = require('fs');

// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
// const siglasEstados = [
//     'AC',
//     'AL',
//     'SC',
//     'AP',
//     'BA',
//     'CE',
//     'DF',
//     'ES',
//     'GO',
//     'MA',
//     'MG',
//     'MS',
//     'MT',
//     'PA',
//     'PB',
//     'PE',
//     'PI',
//     'PR',
//     'RJ',
//     'RN',
//     'RO',
//     'RR',
//     'RS',
//     'SC',
//     'SE',
//     'SP',
//     'TO',
// ];

// const crypto = require('crypto');
// const https = require('https');

// /**
//  * Handle this problem with Node 18
//  * write EPROTO B8150000:error:0A000152:SSL routines:final_renegotiate:unsafe legacy renegotiation disabled
//  * see https://stackoverflow.com/questions/74324019/allow-legacy-renegotiation-for-nodejs/74600467#74600467
//  **/
// const allowLegacyRenegotiationforNodeJsOptions = {
//     httpsAgent: new https.Agent({
//         // for self signed you could also add
//         // rejectUnauthorized: false,
//         // allow legacy server
//         secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
//     }),
// };

// function makeRequest(url, data) {
//     return axios({
//         ...allowLegacyRenegotiationforNodeJsOptions,
//         url,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         method: 'GET',
//         data: { some: 'data' },
//     });
// }
// (async () => {
//     const fs = require('fs');
//     let x = 0;
//     for (let estado of siglasEstados) {
//         x++;
//         const { data } = await makeRequest(
//             `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${estado}?formato=application/vnd.geo+json`
//         );
//         data.features[0].geometry.coordinates[0].forEach((item) => {
//             fs.appendFile('./brasiljson.txt', `[${item}], `, (err) => {
//                 if (err) throw err;
//                 console.log(`${estado}, ${item}`);
//             });
//         });
//         await sleep(4000);
//     }
//     console.log(x);
// })();

fs.readFile('./texte.json', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
});
