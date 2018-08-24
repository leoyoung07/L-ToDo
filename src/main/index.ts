import { fork } from 'child_process';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

const isDebug = !!process.env.DEBUG;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow(
    {
      webPreferences: {
        webSecurity: false
      }
    }
  );

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  let url: string;
  if (isDevelopment) {
    url = `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`;
  } else if (isDebug) {
    url = formatUrl({
      pathname: path.resolve(__dirname, '..', 'renderer', 'index.html'),
      protocol: 'file',
      slashes: true
    });
  } else {
    url = formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    });
  }

  window.loadURL(url);

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  window.webContents.on('did-finish-load', () => {});

  ipcMain.on('load-url', async (event: Electron.Event, args: string) => {});

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});
