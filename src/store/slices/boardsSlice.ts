import { createSlice } from '@reduxjs/toolkit';
import type { Board } from '../../types';

type BoardState = {
  modalActive: boolean;
  boardArray: Board[];
};

const initialState: BoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번쨰 게시물',
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
  reducers: {},
});

export const boardsReducer = boardsSlice.reducer;
