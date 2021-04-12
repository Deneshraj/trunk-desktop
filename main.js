const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

const htmlPath = path.join(__dirname, path.join('public', 'html'));

const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
};

// Main Window
const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences,
    });

    mainWindow.loadURL(`file://${htmlPath}/index.html`);

    mainWindow.on('close', () => app.quit());
    
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);


// Items in the Menu
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: "Quit",
                accelerator: (process.platform == 'darwin') ? "Command+Q" : "ctrl+Q",
                click: () => {
                    app.quit();
                }
            },
        ]
    },
]

// Displaying Dev Tools on Development Mode
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle Dev Tools",
                accelerator: (process.platform == 'darwin') ? "Command+I" : "ctrl+I",
                click: (item, focusedWindow) => {
                    focusedWindow.toggleDevTools();
                },
            },
            {
                role: 'reload',
            }
        ],
    });
}

// To make Menu Items work for MAC
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}