// const {app, BrowserWindow, dialog} = require('electron');
// const dialog = app.remote;
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const url = require('url');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  win.on('closed', () => {
    app.quit();
  });
  win.loadURL(url.format ({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit()
});
