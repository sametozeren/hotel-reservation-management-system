const {
  app,
  BrowserWindow
} = require('electron');
const url = require('url');
const path = require('path');

function createWindow() {
  // Yeni pencere oluşturma
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    //require is not defined fixed
    webPreferences: {
      nodeIntegration: true
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
  //uygulama açıldığında geliştirici penceresini açıyor
  mainWindow.webContents.openDevTools();
}

//uygulama hazır olduğunda
app.on('ready', () => {
  createWindow();

});

//tüm pencereleri kapatır
app.on('window-all-closed', () => {
  app.quit();
});