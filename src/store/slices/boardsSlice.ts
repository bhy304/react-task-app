import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, List, Task } from '../../types';

type BoardState = {
  modalActive: boolean;
  boardArray: Board[];
};

type AddBoardAction = {
  board: Board;
};

type DeleteBoardAction = {
  boardId: string;
};

type AddListAction = {
  boardId: string;
  list: List;
};

type TaskAction = {
  boardId: string;
  listId: string;
  task: Task;
};

type DeleteListAction = {
  boardId: string;
  listId: string;
};

type DeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

const initialState: BoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'Owner 1',
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'Owner 2',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'Owner 4',
            },
            {
              taskId: 'task-4',
              taskName: 'Task 4',
              taskDescription: 'Description',
              taskOwner: 'Owner 5',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<AddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    deleteBoard: (state, { payload }: PayloadAction<DeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId
      );
    },
    addList: (state, { payload }: PayloadAction<AddListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<DeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    addTask: (state, { payload }: PayloadAction<TaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? { ...list, tasks: list.tasks.push(payload.task) }
                  : list
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<DeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.taskId !== payload.taskId
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  addList,
  deleteList,
  addTask,
  updateTask,
  deleteTask,
  setModalActive,
} = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
