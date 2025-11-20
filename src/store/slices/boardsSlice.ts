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

type MoveTaskAction = {
  boardId: string;
  fromListId: string;
  toListId: string;
  task: Task;
  fromIndex: number;
  toIndex: number;
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
    moveTask: (state, { payload }: PayloadAction<MoveTaskAction>) => {
      state.boardArray = state.boardArray.map((board) => {
        if (board.boardId !== payload.boardId) return board;

        // 같은 리스트 내에서의 위치 변경
        if (payload.fromListId === payload.toListId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.listId !== payload.fromListId) return list;

              const tasks = [...list.tasks];
              // 원본 위치에서 제거
              const [movedTask] = tasks.splice(payload.fromIndex, 1);
              // 새 위치에 삽입
              tasks.splice(payload.toIndex, 0, movedTask);
              return { ...list, tasks };
            }),
          };
        }

        // 다른 리스트로의 이동
        return {
          ...board,
          lists: board.lists.map((list) => {
            // 원본 리스트에서 태스크 제거
            if (list.listId === payload.fromListId) {
              const tasks = [...list.tasks];
              tasks.splice(payload.fromIndex, 1);
              return { ...list, tasks };
            }
            // 대상 리스트에 태스크 추가
            if (list.listId === payload.toListId) {
              const tasks = [...list.tasks];
              tasks.splice(payload.toIndex, 0, payload.task);
              return { ...list, tasks };
            }
            return list;
          }),
        };
      });
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
  moveTask,
} = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
