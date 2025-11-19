import type React from 'react';
import { useTypedSelector } from '../../hooks/redux';
import { FiX } from 'react-icons/fi';
import LogItem from './LogItem/LogItem';
import {
  body,
  closeButton,
  header,
  modalContainer,
  title,
  wrapper,
} from './LoggerModal.css';

type LoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoggerModal: React.FC<LoggerModalProps> = ({ setIsLoggerOpen }) => {
  const logs = useTypedSelector((state) => state.logger.logArray);

  return (
    <div className={wrapper}>
      <div className={modalContainer}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX className={closeButton} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;
