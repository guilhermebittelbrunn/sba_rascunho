const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 900,
        height: 500,
        backgroundColor: '#ddddda',
        show: false,
        icon: path.join(__dirname, 'sba logo iimage.jpg'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const menuTemplete = [
        {
            role: 'appMenu',
            label: 'App',
        },
        {
            role: 'fileMenu',
        },
        {
            label: 'Settings',
            submenu: [
                {
                    label: 'open new window',
                    accelerator: 'Ctrl+e',
                    click: () => createWindow(),
                },
                {
                    label: 'close window',
                    accelerator: 'Ctrl+h',
                    click: () => {
                        console.log(window);
                        window.forEach((w) => {
                            console.log(w);
                        });
                    },
                },
            ],
        },
    ];
    const menu = Menu.buildFromTemplate(menuTemplete);
    Menu.setApplicationMenu(menu);

    window.webContents.openDevTools();
    window.loadFile('./index.html');

    window.on('ready-to-show', () => {
        window.show();
    });
};

app.on('ready', createWindow);
