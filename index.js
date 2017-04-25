const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow;


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1250,
        height: 700,
        //icon: __dirname + '/assets/logo.png',
        title: 'Shank Simulador'
        /*
        webPreferences: {
            plugins: true
        }
        */
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //mainWindow.openDevTools();
    mainWindow.setTitle("Shank Simulador");

    //mainWindow.setAutoHideMenuBar(true)
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
 
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})