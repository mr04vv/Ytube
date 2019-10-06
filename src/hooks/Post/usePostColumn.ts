/* eslint-disable no-console */
import {
  useState,
} from 'react';
import { createGame } from 'reduxes/modules/games/createGame';
import { createCategory } from 'reduxes/modules/categories/createCategory';
import { useDispatch } from 'react-redux';

const usePostColumn = () => {
  const [newGame, setNewGame] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false);
  const dispatch = useDispatch();

  const postGame = async () => {
    if (newGame) {
      setIsLoadingGame(true);
      setNewGame('');
      try {
        await dispatch(createGame(newGame));
        setIsLoadingGame(false);
      } catch {
        setIsLoadingGame(false);
      }
    }
  };

  const postCategory = async () => {
    if (newCategory) {
      setIsLoadingCategory(true);
      setNewCategory('');
      try {
        await dispatch(createCategory(newCategory));
        setIsLoadingCategory(false);
      } catch {
        setIsLoadingCategory(false);
      }
    }
  };

  return {
    newCategory,
    newGame,
    setNewCategory,
    setNewGame,
    postGame,
    postCategory,
    isLoadingCategory,
    isLoadingGame,
  };
};

export default usePostColumn;
