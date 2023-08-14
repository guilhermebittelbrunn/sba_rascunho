const axios = require('axios');
const crypto = require('crypto');
const https = require('https');

/**
 * Handle this problem with Node 18
 * write EPROTO B8150000:error:0A000152:SSL routines:final_renegotiate:unsafe legacy renegotiation disabled
 * see https://stackoverflow.com/questions/74324019/allow-legacy-renegotiation-for-nodejs/74600467#74600467
 **/
const allowLegacyRenegotiationforNodeJsOptions = {
    httpsAgent: new https.Agent({
        // for self signed you could also add
        // rejectUnauthorized: false,
        // allow legacy server
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    }),
};

function makeRequest(url, data) {
    return axios({
        ...allowLegacyRenegotiationforNodeJsOptions,
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
        data: { some: 'data' },
    });
}

(async () => {
    const { data } = await makeRequest(
        'https://servicodados.ibge.gov.br/api/v3/malhas/estados/RJ?formato=application/vnd.geo+json'
    );
    console.log(JSON.stringify(data));
})();
