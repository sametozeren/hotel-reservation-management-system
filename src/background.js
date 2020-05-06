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

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  },
}]);

/**
 * Creates the application window
 * @method createWindow
 * @return none;
 */
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
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null
  });
}

/**
 * Sends a query to the database and returns the result
 * @method sendQueryToDatabase
 * @param {string} incomingQuery
 * @return string;
 */
function sendQueryToDatabase(incomingObject) {
  var config = {
    user: 'admin',
    password: '12312',
    server: 'localhost',
    database: 'otelresepsiyon',
  };

  return sql.connect(config).then(() => {
    var incomingObjectParse = JSON.parse(incomingObject || '{}') || {};
    var queryString = incomingObjectParse.queryString || '';
    console.log(queryString+'*******************');
    var request = new sql.Request().query(queryString).then(result => {
      return '{ "status":"success", "responseType":"' + (incomingObjectParse.queryType || '') + '","result":' +
        JSON.stringify(result) + '}';
    }).catch(err => {
      console.log(err)
      return '{ "status":"error", "result":"Sorgu Çalıştırılırken Bir Problem İle Karşılaşıldı: ' + err + '" }';
    });
    return request;
  }).catch(err => {
    return '{ "status":"error", "result":"Veri Tabanına Bağlanırken Bir Hata İle Karşılaşıldı: ' + err + '" }';
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
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

app.on('ready', async () => {
  createWindow();

  ipcMain.on('menuMinimizedBtnClicked', (err, data) => {
    win.minimize();
  });

  ipcMain.on('menuClosedBtnClicked', (err, data) => {
    app.quit();
  });

  /* HotelReport komponentine ait işlemler*/
  ipcMain.on('totalCustomer', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('totalCustomerResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  ipcMain.on('roomRatio', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('roomRatioResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  ipcMain.on('monthPerPrice', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('monthPerPriceResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /* NewRoom komponentine ait işlemler */
  ipcMain.on('roomTypeList', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('roomTypeListResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  ipcMain.on('newRoom', async (err, data) => {
    console.log(data)
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('newRoomResponse', 'success');
      } else {
        console.log("Kayıt Eklenemedi");
      }
    }
  });

  /* NewCustomer komponentine ait işlemler */
  ipcMain.on('countryList', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('countryListResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  ipcMain.on('identityList', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('identityListResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  ipcMain.on('newCustomer', async (err, data) => {
    console.log(data)
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('newCustomerResponse', 'success');
      } else {
        console.log("Kayıt Eklenemedi");
      }
    }
  });

  /* RoomList komponentinde odaları listeleme için yazılan kodlar */
  ipcMain.on('roomList', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('roomListResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /* Customer komponentinde müşterileri listeleme için yazılan kodlar */
  ipcMain.on('customerList', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('customerListResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /* CustomerDetail komponentinde müşteri bilgilerini çekmek için yazılan kodlar */
  ipcMain.on('getCustomer', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        console.log(JSON.stringify(((response.result || {}).recordset || [])))
        win.webContents.send('getCustomerResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /* DeleteCustomer komponentinde müşteriyi silmek için yazılan kodlar */
  ipcMain.on('deleteCustomer', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('deleteCustomerResponse', 'success');
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /*Dolu Odanın Müşteri Çekme İşlemi */
  ipcMain.on('getFullRoom', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('getFullRoomResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

 /*Oda Bilgi Çekme İşlemi*/ 
  ipcMain.on('getRoom', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('getRoomResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

  /*Odaya Müşteri Ekleme işlemi*/ 
  ipcMain.on('addCustomerToRoom', async (err, data) => {
    if (data !== '' && typeof data === 'string') {
      var result = await sendQueryToDatabase(data);
      var response = JSON.parse(result || '{}') || {};

      if (response.status === 'success') {
        win.webContents.send('addCustomerToRoomResponse', JSON.stringify(((response.result || {}).recordset || [])));
      } else {
        console.log("Sonuç Bulunamadı");
      }
    }
  });

});