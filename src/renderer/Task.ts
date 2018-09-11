export default class Task {
  public readonly Id: string;

  public readonly CreateTime: Number;

  public State: TaskState;

  constructor(public Title: string, public DueDate: string, public Content?: string) {
    const now = (new Date()).getTime();
    this.CreateTime = now;
    this.Id = now.toString();
    this.State = TaskState.TODO;
  }
}

export enum TaskState {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}
