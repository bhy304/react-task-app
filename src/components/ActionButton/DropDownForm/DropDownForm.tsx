import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { addLog } from '../../../store/slices/loggerSlice';
import {
  button,
  buttons,
  input,
  listForm,
  taskForm,
  close,
} from './DropDownForm.css';

type DropDownFormProps = {
  boardId: string;
  listId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
};

const DropDownForm: React.FC<DropDownFormProps> = ({
  boardId,
  listId,
  setIsFormOpen,
  list,
}) => {
  const [text, setText] = useState('');
  const dispatch = useTypedDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    if (!text) return;

    if (list) {
      // 리스트 추가
      dispatch(
        addList({
          boardId,
          list: { listId: uuidv4(), listName: text, tasks: [] },
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `리스트 추가: ${text}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
    } else {
      // 일 추가
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskId: uuidv4(),
            taskName: text,
            taskDescription: '',
            taskOwner: 'User',
          },
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `일 추가: ${text}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        autoFocus
        value={text}
        className={input}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
        placeholder={
          list ? '리스트의 제목을 입력하세요.' : '일의 제목을 입력하세요.'
        }
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {list ? '리스트 추가하기' : '일 추가하기'}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;
