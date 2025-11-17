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
