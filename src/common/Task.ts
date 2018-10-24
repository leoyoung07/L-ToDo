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

  public DueTimeBegin: string;

  public DueTimeEnd: string;

  public Content: string;

  public Priority: TaskPriority;

  constructor(
    title?: string,
    dueDate?: string,
    dueTimeBegin?: string,
    dueTimeEnd?: string,
    content?: string,
    priority?: TaskPriority
  ) {
    const now = new Date().getTime();
    this.Title = title ? title : '';
    this.DueDate = dueDate ? dueDate : moment().format('YYYY-MM-DD');
    this.DueTimeBegin = dueTimeBegin ? dueTimeBegin : '00:00:00';
    this.DueTimeEnd = dueTimeEnd ? dueTimeEnd : '23:59:59';
    this.Content = content ? content : '';
    this.Priority = priority ? priority : TaskPriority.MIDDLE;
    this.CreateTime = now;
    this.Id = now.toString();
    this.State = TaskState.TODO;
  }
}
