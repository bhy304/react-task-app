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
  logTimestamp: number;
}

export interface Board {
  boardId: string;
  boardName: string;
  lists: List[];
}

export interface List {
  listId: string;
  listName: string;
  tasks: Task[];
}
