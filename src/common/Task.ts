import moment from 'moment';

export enum TaskState {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}
export default class Task {
  public readonly Id: string;

  public readonly CreateTime: Number;

  public State: TaskState;

  public Title: string;

  public DueDate: string;

  public Content: string;

  constructor(title?: string, dueDate?: string, content?: string) {
    const now = (new Date()).getTime();
    this.Title = title ? title : '';
    this.DueDate = dueDate ? dueDate : moment().format('YYYY-MM-DD');
    this.Content = content ? content : '';
    this.CreateTime = now;
    this.Id = now.toString();
    this.State = TaskState.TODO;
  }
}
