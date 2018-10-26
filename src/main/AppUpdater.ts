import Logger from 'electron-log';
import { autoUpdater } from 'electron-updater';

export class AppUpdater {
  constructor() {
    Logger.transports.file.level = 'debug';
    autoUpdater.logger = Logger;
  }

  public checkAndNotify() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
