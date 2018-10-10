import net from 'net';

enum BufferReadState {
  HEAD = 'head',
  BODY = 'body'
}
export default class SocketHelper {

  private buffer: Buffer;

  private state: BufferReadState;
  constructor(private socket: net.Socket) {
    this.buffer = new Buffer(0);
    this.state = BufferReadState.HEAD;
  }
}
