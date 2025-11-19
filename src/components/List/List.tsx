import { GrSubtract } from 'react-icons/gr';
import { v4 as uuidv4 } from 'uuid';
import ActionButton from '../ActionButton/ActionButton';
import type { List, Task as ITask } from '../../types';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import Task from '../Task/Task';
import { addLog } from '../../store/slices/loggerSlice';
import { setModalTask } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';

type ListProps = {
  list: List;
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

  return (
    <div className={listWrapper}>
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
