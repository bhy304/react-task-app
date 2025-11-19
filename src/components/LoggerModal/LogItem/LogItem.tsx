import { BsFillPersonFill } from 'react-icons/bs';
import type { LogItem as ILogItem } from '../../../types';
import { author, logItemContainer, message, timestamp } from './LogItem.css';

type LogItemProps = {
  logItem: ILogItem;
};

const LogItem: React.FC<LogItemProps> = ({ logItem }) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp));
  const minutes =
    timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : '';
  const seconds =
    timeOffset.getSeconds() > 0
      ? `${timeOffset.getSeconds()}s ago`
      : timeOffset.getSeconds() === 0
      ? 'just now'
      : '';

  return (
    <div className={logItemContainer}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={timestamp}>{`${minutes} ${seconds}`}</div>
    </div>
  );
};

export default LogItem;
