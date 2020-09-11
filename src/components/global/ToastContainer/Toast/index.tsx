import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ToastMessage, useToast } from '~/hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FontAwesomeIcon icon={faInfoCircle} />,
  success: <FontAwesomeIcon icon={faCheckCircle} />,
  error: <FontAwesomeIcon icon={faExclamationCircle} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>

        <p>{message.description}</p>
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </Container>
  );
};

export default Toast;
