import ErrorCode from './ErrorCode';
export type IpcResponseSuccess = {
  code: ErrorCode,
  // tslint:disable-next-line:no-any
  data: any
};

export type IpcResponseError = {
  code: ErrorCode,
  error: Error
};

export type IpcResponse = IpcResponseSuccess | IpcResponseError;

export enum IpcActions {
  READ = 'read',
  SAVE = 'save',
  SERVER_UPLOAD = 'server_upload',
  SERVER_DOWNLOAD = 'server_download'
}
