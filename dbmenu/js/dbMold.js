const electron = require('electron');
const path = require('path');
const url = require('url');

const { BrowserWindow, Menu } = electron;

let mainWindow;

function dbMold() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Add Data Mold',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../views/dbMold.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.on('close', () => {
    mainWindow = null
  });

  const menu = Menu.buildFromTemplate(menuTemplate);

  mainWindow.setMenu(menu)
};

const menuTemplate = [
  {
    label: 'Quit',
    click() {
      mainWindow.hide();
    }
  },
  {
    label: 'Show Data',
    click() {
      showData();
    }
  }
]

let mainShowData;

function showData() {
  mainShowData = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Show Data',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainShowData.loadURL(url.format({
    pathname: path.join(__dirname, '../views/dbMoldAll.html'),
    protocol: 'file',
    slashes: true
  }));

  const menu = Menu.buildFromTemplate(mainShowDataTemplate);

  mainShowData.setMenu(menu);
};

const mainShowDataTemplate = [
  {
    label: 'Quit',
    click() {
      mainShowData.hide();
    }
  }
]

// add developer tools item
if(process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'Darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focuseWindow) {
            focuseWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

exports.dbMold = dbMold;