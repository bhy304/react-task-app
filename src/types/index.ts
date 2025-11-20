export interface Task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

export interface LogItem {
  logId: string;
  logAuthor: string;
  logMessage: string;
  logTimestamp: string;
}

export interface Board {
  boardId: string;
  boardName: string;
  lists: IList[];
}

export interface IList {
  listId: string;
  listName: string;
  tasks: Task[];
}
