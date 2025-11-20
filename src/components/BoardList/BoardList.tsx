import { useRef, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { FiPlusCircle, FiLogIn } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import clsx from 'clsx';
import SideForm from './SideForm/SideForm';
import {
  iconButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from './BoardList.css';
import { auth } from '../../firebase';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';

type BoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: React.FC<BoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAuth } = useAuth();

  const dispatch = useTypedDispatch();
  const provider = new GoogleAuthProvider();

  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      dispatch(
        setUser({
          email: userCredential.user.email || '',
          id: userCredential.user.uid,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };

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
          <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={iconButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={iconButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={iconButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
