import ReactDOM from 'react-dom';

import classes from './notification.module.css';

export type NotificationStatus = 'pending' | 'success' | 'error';

interface NotificationProps {
  title: string;
  message: string;
  status: NotificationStatus;
}

function Notification({ title, message, status }: NotificationProps) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  const container = document.getElementById('notifications');

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    container
  );
}

export default Notification;
