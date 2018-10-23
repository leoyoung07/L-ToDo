import moment from 'moment';

export enum TaskState {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export enum TaskPriority {
  HIGH = 'HIGH',
  MIDDLE = 'MIDDLE',
  LOW = 'LOW'
}
export default class Task {
  public readonly Id: string;

  public readonly CreateTime: Number;

  public State: TaskState;

  public Title: string;

  public DueDate: string;

  public Content: string;

  public Priority: TaskPriority;

  constructor(
    title?: string,
    dueDate?: string,
    content?: string,
    priority?: TaskPriority
  ) {
    const now = new Date().getTime();
    this.Title = title ? title : '';
    this.DueDate = dueDate ? dueDate : moment().format('YYYY-MM-DD');
    this.Content = content ? content : '';
    this.Priority = priority ? priority : TaskPriority.MIDDLE;
    this.CreateTime = now;
    this.Id = now.toString();
    this.State = TaskState.TODO;
  }
}
