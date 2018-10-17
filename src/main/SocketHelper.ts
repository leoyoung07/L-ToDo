import { EventEmitter } from 'events';
import net from 'net';

enum BufferReadState {
  HEAD = 'head',
  BODY = 'body'
}
export default class SocketHelper extends EventEmitter {

  private buffer: Buffer;

  private state: BufferReadState;

  private readonly headLength = 4;

  private bodyLength: number;
  constructor(public socket: net.Socket) {
    super();
    this.buffer = Buffer.alloc(0);
    this.state = BufferReadState.HEAD;
    this.bodyLength = 0;
    this.socket.on('data', this.onData.bind(this));
  }
  public writeData(data: Buffer, callback?: () => void) {
    if (data && data.length > 0) {
      // write Head and Body
      const head = Buffer.alloc(this.headLength);
      head.writeUInt32BE(data.length, 0);
      this.socket.write(head);
      const finished = this.socket.write(data);
      if (callback) {
        if (!finished) {
          this.socket.once('drain', callback);
        } else {
          process.nextTick(callback);
        }
      }
    }
  }
  private onData(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data], this.buffer.length + data.length);
    this.readData();
  }

  private readData() {
    // read Head and Body
    if (this.state === BufferReadState.HEAD) {
      this.readHead();
    } else if (this.state === BufferReadState.BODY) {
      this.readBody();
    } else {
      throw Error('Socket read state error');
    }
  }

  private readHead() {
    if (this.buffer && this.buffer.length >= this.headLength) {
      // get body length from head
      this.bodyLength = this.buffer.readUInt32BE(0);
      this.buffer = this.buffer.slice(this.headLength);
      this.state = BufferReadState.BODY;
      this.readData();
    }
  }

  private readBody() {
    if (this.buffer && this.buffer.length >= this.bodyLength) {
      // read body, emit 'data' event, and call `readData`
      const data = this.buffer.slice(0, this.bodyLength);
      this.emit('data', data);
      this.buffer = this.buffer.slice(this.bodyLength);
      this.state = BufferReadState.HEAD;
      this.readData();
    }
  }

}
