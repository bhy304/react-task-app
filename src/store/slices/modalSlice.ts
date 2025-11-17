import { createSlice } from '@reduxjs/toolkit'
import type { Task } from '../../types'

type ModalState = {
  boardId: string
  listId: string
  task: Task
}

const initialState: ModalState = {
  boardId: 'board-0',
  listId: 'list-0',
  task: {
    taskId: 'task-0',
    taskName: 'task 0',
    taskDescription: 'task 0 description',
    taskOwner: 'John',
  },
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
})

export const modalReducer = modalSlice.reducer
