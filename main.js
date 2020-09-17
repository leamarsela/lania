const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, Menu, ipcMain } = electron;

const dbcontainer = require('./dbmenu/js/dbContainer.js');
const dbproject = require('./dbmenu/js/dbProject.js');
const dbringgamma = require('./dbmenu/js/dbRingGamma.js');
const dbpycnometer = require('./dbmenu/js/dbPycnometer.js');

// set ENV
// process.env.NODE_ENV = 'production';

let parentWindow;

// listen for app to be ready
app.on('ready', () => {
  // create new window
  parentWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
        nodeIntegration: true
    }
  });

  // load html into window
  parentWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
  }));

  // quit app when closed
  parentWindow.on('closed', () => {
      app.quit();
  });

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // insert menu
  Menu.setApplicationMenu(mainMenu);
});


// create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Project',
        click() {
          dbproject.dbProject();
        }
      },
      {
        label: 'Database',
        submenu: [
          {
            label: 'Container',
            click() {
              dbcontainer.dbContainer();
            }
          },
          {
            label: 'Ring Gamma',
            click() {
              dbringgamma.dbRingGamma();
            }
          },
          {
            label: 'Pycnometer',
            click() {
              dbpycnometer.dbPycnometer();
            }
          },
          {
            label: 'Mold',
            click() {
              console.log('Mold');
            }
          },
          {
            label: 'CBR',
            click() {
              console.log('cbr');
            }
          },
          {
            label: 'consolidation',
            click() {
              console.log('consolidation');
            }
          }
        ]
      },
      {
        label: 'Clear Items',
        click() {
            mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
            app.quit();
        }
      }
    ]
  },
];


// for mac add empty object to menu
if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add developer tools item
if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
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

