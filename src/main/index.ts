import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, {
  ExtensionReference,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';
import * as fs from 'fs';
import * as net from 'net';
import * as path from 'path';
import { format as formatUrl } from 'url';
import ErrorCode from '../common/ErrorCode';
import { IpcActions } from '../common/Ipc';
import Task from '../common/Task';

const isDevelopment = process.env.NODE_ENV !== 'production';

const isDebug = !!process.env.DEBUG;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    }
  });

  if (isDevelopment) {
    installDevExtension(REACT_DEVELOPER_TOOLS);
    installDevExtension(REDUX_DEVTOOLS);
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

  window.webContents.on('did-finish-load', () => {
    // when page load
  });

  initIpc();

  initSocket();

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

async function installDevExtension(extension: ExtensionReference) {
  try {
    let name = await installExtension(extension);
    // tslint:disable-next-line:no-console
    console.log(`Added Extension:  ${name}`);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log('An error occurred: ', error);
  }
}

function initIpc() {
  const dataDir = path.join(app.getPath('appData'), 'l_todo');
  const savePath = path.join(dataDir, 'todos.json');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  ipcMain.on(IpcActions.SAVE, (event: Electron.Event, args: Task[]) => {
    // tslint:disable-next-line:no-console
    console.log('main process save...');
    fs.writeFile(savePath, JSON.stringify(args), err => {
      // tslint:disable-next-line:no-console
      console.log(savePath);
      if (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        event.sender.send(IpcActions.SAVE, {
          code: ErrorCode.FILE_SAVE_ERROR,
          error: err
        });
      } else {
        event.sender.send(IpcActions.SAVE, {
          code: ErrorCode.SUCCESS,
          data: null
        });
      }
    });
  });

  ipcMain.on(IpcActions.READ, (event: Electron.Event) => {
    // tslint:disable-next-line:no-console
    console.log('main process read...');
    fs.readFile(savePath, (err, data) => {
      if (err) {
        event.sender.send(IpcActions.READ, {
          code: ErrorCode.FILE_READ_ERROR,
          error: err
        });
      } else {
        event.sender.send(IpcActions.READ, {
          code: ErrorCode.SUCCESS,
          data: JSON.parse(data.toString()) as Task[]
        });
      }
    });
  });
}

function initSocket() {
  const socket = net.connect(
    7269,
    '123.206.255.153',
    () => {
      // tslint:disable-next-line:no-console
      console.log('server connected...');
      socket.write('hello, server\n');
    }
  );

  socket.on('data', data => {
    // tslint:disable-next-line:no-console
    console.log(data.toString());
  });

  socket.on('error', err => {
    // tslint:disable-next-line:no-console
    console.log(err);
  });

  socket.on('end', () => {
    // tslint:disable-next-line:no-console
    console.log('disconnected from server...');
  });
}
