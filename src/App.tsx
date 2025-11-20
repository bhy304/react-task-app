import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from './App.css';
import BoardList from './components/BoardList/BoardList';
import ListContainer from './components/ListContainer/ListContainer';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard, moveTask } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const dispatch = useTypedDispatch();
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const [{ boardId, lists }] = boards.filter(
    (board) => board.boardId === activeBoardId
  );

  const handleDeleteBoard = () => {
    if (boards.length <= 1) {
      alert('최소 하나의 게시판이 필요합니다.');
      return;
    }

    dispatch(deleteBoard({ boardId: activeBoardId }));

    const newIndexToSet = () => {
      const currentIndex = boards.findIndex(
        (board) => board.boardId === activeBoardId
      );

      return currentIndex === 0 ? currentIndex + 1 : currentIndex - 1;
    };
    setActiveBoardId(boards[newIndexToSet()].boardId);

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 삭제: ${activeBoardId}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // 같은 위치에 드롭되면 무시
    if (active.id === over.id) return;

    // task가 아니면 무시
    if (activeData?.type !== 'task') return;

    const currentBoard = boards.find((b) => b.boardId === activeBoardId);
    if (!currentBoard) return;

    // task를 찾기 위해 모든 리스트를 순회
    let foundTask = null;
    let foundListId = '';
    let fromIndex = -1;

    for (const list of currentBoard.lists) {
      const taskIndex = list.tasks.findIndex(
        (t) => t.taskId === activeData?.taskId
      );
      if (taskIndex !== -1) {
        foundTask = list.tasks[taskIndex];
        foundListId = list.listId;
        fromIndex = taskIndex;
        break;
      }
    }

    if (!foundTask) return;

    // list로 드롭한 경우
    if (overData?.type === 'list') {
      const toListId = overData.listId;
      const toIndex =
        currentBoard.lists.find((l) => l.listId === toListId)?.tasks.length ||
        0;

      dispatch(
        moveTask({
          boardId: activeBoardId,
          fromListId: foundListId,
          toListId,
          task: foundTask,
          fromIndex,
          toIndex,
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `태스크 이동: ${foundTask.taskName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      return;
    }

    // task-position으로 드롭한 경우 (같은 리스트 내 순서 변경)
    if (overData?.type === 'task-position') {
      const toListId = overData.listId;
      const toIndex = overData.index;

      // 같은 위치이면 스킵
      if (foundListId === toListId && fromIndex === toIndex) return;

      dispatch(
        moveTask({
          boardId: activeBoardId,
          fromListId: foundListId,
          toListId,
          task: foundTask,
          fromIndex,
          toIndex:
            foundListId === toListId && fromIndex < toIndex
              ? toIndex - 1
              : toIndex,
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `태스크 위치 변경: ${foundTask.taskName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      return;
    }
  };

  return (
    <div className={appContainer}>
      {modalActive ? <EditModal /> : null}
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DndContext onDragEnd={handleDragEnd}>
          <ListContainer boardId={boardId} lists={lists} />
        </DndContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보이기'}
        </button>
      </div>
    </div>
  );
}

export default App;
