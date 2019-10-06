/* eslint-disable no-console */
import {
  useState,
} from 'react';

const usePostModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export default usePostModal;
