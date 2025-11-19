import { useState } from 'react';
import { appContainer, board, buttons } from './App.css';
import BoardList from './components/BoardList/BoardList';
import ListContainer from './components/ListContainer/ListContainer';
import { useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const [{ boardId, lists }] = boards.filter(
    (board) => board.boardId === activeBoardId
  );

  return (
    <div className={appContainer}>
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListContainer boardId={boardId} lists={lists} />
      </div>
      <div className={buttons}>
        <button>이 게시판 삭제하기</button>
        <button>활동 목록 보이기</button>
      </div>
    </div>
  );
}

export default App;
