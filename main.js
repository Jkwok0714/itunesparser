// const {app, BrowserWindow, dialog} = require('electron');
// const dialog = app.remote;
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const url = require('url');
const path = require('path');


// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//
//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(url.format ({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})
// }
