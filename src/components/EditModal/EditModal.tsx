import { FiX } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { useState } from 'react';
import {
  deleteTask,
  setModalActive,
  updateTask,
} from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import {
  buttons,
  deleteButton,
  header,
  title,
  input,
  modalContainer,
  updateButton,
  wrapper,
  closeButton,
} from './EditModal.css';

const EditModal = () => {
  const dispatch = useTypedDispatch();

  const { boardId, listId, task } = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(task);
  const { taskName, taskDescription, taskOwner } = data;

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: boardId,
        listId: listId,
        task: data,
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 수정: ${taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ boardId, listId, taskId: task.taskId }));
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 삭제: ${taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalContainer}>
        <div className={header}>
          <div className={title}>{taskName}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          type='text'
          name='taskName'
          className={input}
          value={taskName}
          onChange={handleChange}
        />
        <div className={title}>설명</div>
        <input
          type='text'
          name='taskDescription'
          className={input}
          value={taskDescription}
          onChange={handleChange}
        />
        <div className={title}>생성한 사람</div>
        <input
          type='text'
          name='taskOwner'
          className={input}
          value={taskOwner}
          onChange={handleChange}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
