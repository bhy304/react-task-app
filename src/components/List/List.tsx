import { GrSubtract } from 'react-icons/gr';
import { v4 as uuidv4 } from 'uuid';
import { useDroppable } from '@dnd-kit/core';
import ActionButton from '../ActionButton/ActionButton';
import type { IList, Task as ITask } from '../../types';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import Task from '../Task/Task';
import { addLog } from '../../store/slices/loggerSlice';
import { setModalTask } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';

type ListProps = {
  list: IList;
  boardId: string;
};

const List: React.FC<ListProps> = ({
  list: { listId, listName, tasks },
  boardId,
}) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트 삭제: ${listName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalTask({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  const { setNodeRef, isOver } = useDroppable({
    id: listId,
    data: {
      type: 'list',
      listId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={listWrapper}
      style={{
        // backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        transition: 'background-color 200ms ease-in-out',
        borderRadius: isOver ? '8px' : '0px',
      }}>
      <div className={header}>
        <div className={name}>{listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleListDelete(listId)}
        />
      </div>
      {tasks.map((task, index) => (
        <div
          key={task.taskId}
          onClick={() => handleTaskChange(boardId, listId, task)}>
          <Task
            index={index}
            id={task.taskId}
            taskName={task.taskName}
            taskDescription={task.taskDescription}
            boardId={boardId}
          />
        </div>
      ))}
      <ActionButton boardId={boardId} listId={listId} />
    </div>
  );
};

export default List;
