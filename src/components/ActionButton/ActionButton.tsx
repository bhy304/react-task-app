import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import DropDownForm from './DropDownForm/DropDownForm';
import { listButton, taskButton } from './ActionButton.css';

type ActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  boardId,
  listId,
  list,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? '새로운 리스트 등록' : '새로운 일 등록';

  return isFormOpen ? (
    <DropDownForm
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
      setIsFormOpen={setIsFormOpen}
    />
  ) : (
    <div
      className={list ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}>
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>
  );
};

export default ActionButton;
