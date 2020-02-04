/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameInterface } from 'interfaces/GameInterface';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { fetchCategories } from 'reduxes/modules/categories/categoryList';
import { fetchGames } from 'reduxes/modules/games/gameList';

export interface UseMasterData {
  categoryMaster: CategoryInterface[];
  gameMaster: GameInterface[];
}

const useMasterData = () => {
  const [categoryMaster, setCategoryMaster] = useState<CategoryInterface[]>([]);
  const [gameMaster, setGameMaster] = useState<GameInterface[]>([]);
  const [searchCategoryMaster, setSearchCategoryMaster] = useState<CategoryInterface[]>([]);
  const [searchGameMaster, setSearchGameMaster] = useState<GameInterface[]>([]);
  const gameSelector = (state: any) => state.gameList;
  const gameState = useSelector(gameSelector);
  const categorySelector = (state: any) => state.categoryList;
  const categoryState = useSelector(categorySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    if (categoryState.data.length > 0) {
      const category = categoryState.data.slice();
      category.unshift({
        id: -1,
        name: '選択しない',
      });
      setSearchCategoryMaster(category);

      setCategoryMaster(categoryState.data);
    }
  }, [categoryState.data]);

  useEffect(() => {
    if (gameState.data.length > 0) {
      const game = gameState.data.slice();
      game.unshift({
        id: -1,
        title: '選択しない',
      });
      setSearchGameMaster(game);
      setGameMaster(gameState.data);
    }
  }, [gameState.data, gameMaster.length]);

  return {
    gameMaster,
    categoryMaster,
    searchCategoryMaster,
    searchGameMaster,
  };
};

export default useMasterData;
