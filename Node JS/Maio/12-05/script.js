const { ipcRenderer, ipcMain } = require('electron');

function randomNumber() {
    const random = Math.floor(Math.random() * 100);
    const password = document.querySelector('#random_value');
    password.innerHTML = `<h2>${random}</h2>`;
    ipcRenderer.send('msg', { ok: true, random });
}

ipcMain.on('msg', (e, args) => {
    console.log('recebido');
    console.log(args);
});
