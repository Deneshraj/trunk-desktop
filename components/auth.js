const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
};
let authWindow;

const htmlPath = path.join("../" + __dirname, path.join('public', 'html'));

module.exports = () => {
    let authWindow = new BrowserWindow({
        webPreferences,
    });

    authWindow.loadURL(`file://${htmlPath}/auth.html`);
}