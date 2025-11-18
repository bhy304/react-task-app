import { useState } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import { FiPlusCircle } from 'react-icons/fi';
import clsx from 'clsx';
import SideForm from './SideForm/SideForm';
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from './BoardList.css';

type BoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: React.FC<BoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className={container}>
      <div className={title}>게시판: </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}>
          <div
            className={clsx(
              {
                [boardItemActive]:
                  boardArray.findIndex((b) => b.boardId === activeBoardId) ===
                  index,
              },
              {
                [boardItem]:
                  boardArray.findIndex((b) => b.boardId === activeBoardId) !==
                  index,
              }
            )}
            onClick={() => setActiveBoardId(boardArray[index].boardId)}>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle
            className={addButton}
            onClick={() => setIsFormOpen(!isFormOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default BoardList;
