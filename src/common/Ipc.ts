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
