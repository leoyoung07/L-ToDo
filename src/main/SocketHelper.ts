import { EventEmitter } from 'events';
import net from 'net';

enum BufferReadState {
  HEAD = 'head',
  BODY = 'body'
}
export default class SocketHelper extends EventEmitter {

  private buffer: Buffer;

  private state: BufferReadState;
  constructor(private socket: net.Socket) {
    super();
    this.buffer = Buffer.alloc(0);
    this.state = BufferReadState.HEAD;
    this.socket.on('data', this.onData);
  }
  public writeData(data: Buffer) {
    // TODO write Head and Body
  }
  private onData(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data], this.buffer.length + data.length);
    this.readData(this.buffer);
  }

  private readData(data: Buffer) {
    // TODO read Head and Body
  }

  private readHead(data: Buffer) {
    let bodyLength = 0;
    // TODO get body length from head
    return bodyLength;
  }

  private readBody(data: Buffer, bodyLength: number) {
    // TODO read body, emit 'data' event, and call `readData` if buffer not empty
  }

}
