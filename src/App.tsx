import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { deleteBoard } from './store/slices/boardsSlice';
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

  return (
    <div className={appContainer}>
      {modalActive ? <EditModal /> : null}
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListContainer boardId={boardId} lists={lists} />
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
