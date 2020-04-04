'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';
let win;
var sql = require("mssql");
const Store = require('electron-store');
const store = new Store({ watch: true });

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  },
}]);

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    store.clear();
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    store.clear();
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow();

  ipcMain.on('menuMinimizedBtnClicked', (err, data) => {
    win.minimize();
  });

  ipcMain.on('menuClosedBtnClicked', (err, data) => {
    app.quit();
  });

  connectToDatabase();

  store.onDidChange((newVal,oldVal)=>{
    console.log(newVal)
  });
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function connectToDatabase() {
  var config = {
    user: 'klaus',
    password: 'sametozrn.123',
    server: 'localhost',
    database: 'otelresepsiyon',
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM Ulkeler', function (err, recordset) {
      if (err) {
        console.log("Something went wrong")
      } else {
        var result = JSON.stringify(recordset);


        store.set('ulkeler', result);
      }
    });
  });
}