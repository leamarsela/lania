const electron = require('electron');
const path = require('path');
const url = require('url');

const { BrowserWindow, Menu } = electron;

let mainWindow;
let parentWindow;

function dbProject() {
  mainWindow = new BrowserWindow({
    parent: parentWindow,
    modal: true,
    width: 800,
    height: 600,
    title: 'Add Data Project',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../views/dbProject.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.on('close', () => {
    mainWindow = null;
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

exports.dbProject = dbProject;
