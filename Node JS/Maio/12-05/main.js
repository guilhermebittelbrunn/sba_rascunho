const { app, BrowserWindow, ipcMain, Menu } = require('electron');
require('dotenv').config();

function createWindow(path) {
    const window = new BrowserWindow({
        width: 1280,
        height: 960,
        backgroundColor: '#123',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false,
    });

    const menuTemplate = [];
    const menuOptions = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menuOptions);

    window.loadFile(path);
    window.on('ready-to-show', () => {
        window.show();
    });
    process.env.ambiente === 'dev' && window.webContents.openDevTools();
}

(async () => {
    await app.whenReady();
    ipcMain.on('msg', (e, args) => {
        console.log(args);
        createWindow('./index.html');
    });
    app.on('before-quit', () => {
        console.log('end application');
    });
    createWindow('./index.html');
})();
