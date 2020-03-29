const {
  app,
  BrowserWindow
} = require('electron');

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

  mainWindow.loadFile('dist/index.html');
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
