/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'reduxes/modules/posts/fetchPost';
import { PostInterface } from 'interfaces/posts/PostInterface';
import useReactRouter from 'use-react-router';
import { fetchMyPosts } from 'reduxes/modules/posts/fetchMyPost';
import { fetchLikedPost } from 'reduxes/modules/posts/fetchLikedPost';
import { searchPosts } from 'reduxes/modules/posts/searchPost';
import { GameInterface } from 'interfaces/GameInterface';
import { CategoryInterface } from 'interfaces/CategoryInterface';

export interface OrderInterface {
  id: number;
  name: string;
}
export interface DoSearchParam {
  game?: string;
  category?: string;
  order?: string;
  word?: string;
}

const useFetchPost = (categoryMaster?: CategoryInterface[], gameMaster?: GameInterface[]) => {
  const [posts, setPosts] = useState<PostInterface[] | undefined>(undefined);
  const [per] = useState<string>('10');
  const postSelector = (state: any) => state.fetchPost;
  const myPostSelector = (state: any) => state.fetchPostMe;
  const likedPostSelector = (state: any) => state.likedPost;
  const searchPostSelector = (state: any) => state.search;
  const postState = useSelector(postSelector);
  const myPostState = useSelector(myPostSelector);
  const likedPostState = useSelector(likedPostSelector);
  const searchPostState = useSelector(searchPostSelector);
  const { history, location } = useReactRouter();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [myPosts, setMyPosts] = useState<PostInterface[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostInterface[]>([]);
  const [searchPost, setSearchPost] = useState<PostInterface[]>([]);
  const [searchOrder, setSearchOrder] = useState<number>(2);
  const [searchGame, setSearchGame] = useState<number[]>([]);
  const [searchGameTitle, setSearchGameTitle] = useState<string[]>([]);
  const [searchCategoryName, setSearchCategoryName] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState<number[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const initPage = params.get('page') || '1';
  const [page, setPage] = useState<string>(initPage);
  const currentGame = params.get('game');
  const currentCategory = params.get('category');
  const currentOrder = params.get('order');
  const currentWord = params.get('word');
  const [orderMaster] = useState<OrderInterface[]>([
    {
      id: 2,
      name: 'いいねが多い',
    },
    {
      id: 0,
      name: '投稿が新しい',
    },
    {
      id: 1,
      name: '投稿が古い',
    },
    {
      id: 3,
      name: '再生回数が多い',
    },
  ]);
  useEffect(() => {
    setPage(initPage);
  }, [initPage]);

  useEffect(() => {
    if (location.pathname === '/home') {
      dispatch(fetchPosts(page, per));
    } else if (location.pathname === '/accounts') {
      dispatch(fetchMyPosts(page, per));
    } else if (location.pathname === '/accounts/likes') {
      dispatch(fetchLikedPost(page, per));
    }
  }, [page, dispatch, per, location.pathname]);

  useEffect(() => {
    if (gameMaster && gameMaster.length !== 0 && categoryMaster && categoryMaster.length !== 0) {
      let currentOrderId = 2;
      let currentCategoryIds: number[] = [];
      let currentGameIds: number[] = [];
      let currentWords: string = '';
      if (currentOrder !== null) {
        currentOrderId = parseInt(currentOrder, 10);
        setSearchOrder(currentOrderId);
      }
      if (currentGame !== null) {
        currentGameIds = currentGame.split(',').map(Number);
        setSearchGame(currentGameIds);
        setSearchGameTitle(
          gameMaster.filter((g: GameInterface) => currentGameIds.includes(g.id)).map((g: GameInterface) => g.title)
        );
      } else {
        setSearchGame([]);
        setSearchGameTitle(['選択しない']);
      }
      if (currentCategory !== null) {
        currentCategoryIds = currentCategory.split(',').map(Number);
        setSearchCategory(currentCategory.split(',').map(Number));
        setSearchCategoryName(
          categoryMaster
            .filter((c: CategoryInterface) => currentCategoryIds.includes(c.id))
            .map((c: CategoryInterface) => c.name)
        );
      } else {
        setSearchCategory([]);
        setSearchCategoryName(['選択しない']);
      }
      if (currentWord !== null) {
        currentWords = currentWord;
        setSearchWord(currentWord);
      }
      dispatch(searchPosts(page, per, currentGameIds, currentCategoryIds, currentOrderId, currentWords));
    }
  }, [
    page,
    dispatch,
    per,
    location.pathname,
    gameMaster,
    categoryMaster,
    currentCategory,
    currentGame,
    currentOrder,
    currentWord,
  ]);

  useEffect(() => {
    if (postState.data) {
      setPosts(postState.data.posts);
      setIsLoading(false);
      if (postState.data.meta) {
        setHasNext(!!postState.data.meta.nextPage);
        setHasPrev(!!postState.data.meta.prevPage);
      }
    }
  }, [postState]);

  useEffect(() => {
    if (myPostState.data) {
      setMyPosts(myPostState.data.posts);
      setIsLoading(false);
      if (myPostState.data.meta) {
        setHasNext(!!myPostState.data.meta.nextPage);
        setHasPrev(!!myPostState.data.meta.prevPage);
      }
    }
  }, [myPostState]);

  useEffect(() => {
    if (searchPostState.data) {
      setSearchPost(searchPostState.data.posts);
      setIsLoading(false);
      if (searchPostState.data.meta) {
        setHasNext(!!searchPostState.data.meta.nextPage);
        setHasPrev(!!searchPostState.data.meta.prevPage);
      }
    }
  }, [searchPostState]);

  useEffect(() => {
    if (likedPostState.data) {
      if (likedPostState.data.meta) {
        const likes = likedPostState.data.likes.map((p: any) => {
          console.debug(p);
          if (p.post.alreadyLiked === null) {
            p.post.alreadyLiked = true;
          }
          return p.post;
        });
        setLikedPosts(likes);
        setIsLoading(false);
        setHasNext(!!likedPostState.data.meta.nextPage);
        setHasPrev(!!likedPostState.data.meta.prevPage);
      }
    }
  }, [likedPostState]);

  const getGameNumber = (v: string) => {
    if (gameMaster) {
      if (v !== '選択しない') {
        const list = gameMaster.filter((c: GameInterface) => v.includes(c.title));
        const idList = list.map((l: GameInterface) => l.id);
        return idList;
      }
    }
    return [];
  };

  const getCategoryNumber = (v: string) => {
    if (categoryMaster) {
      if (v !== '選択しない') {
        const list = categoryMaster.filter((c: CategoryInterface) => v.includes(c.name));
        const idList = list.map((l: CategoryInterface) => l.id);
        return idList;
      }
    }
    return [];
  };

  const doSearch = ({ game, category, order, word }: DoSearchParam) => {
    const selectedGame: number[] = game ? getGameNumber(game) : searchGame;
    const selectedCategory: number[] = category ? getCategoryNumber(category) : searchCategory;
    const selectedOrder: number = order ? parseInt(order, 10) : searchOrder;
    const text: string = word || searchWord;
    setIsLoading(true);
    dispatch(searchPosts(page, per, selectedGame, selectedCategory, selectedOrder, text));
    let searchCondition = `order=${selectedOrder}`;
    if (selectedCategory.length !== 0) searchCondition += `&category=${selectedCategory.toString()}`;
    if (selectedGame.length !== 0) searchCondition += `&game=${selectedGame.toString()}`;
    searchCondition += `&word=${text}`;

    // console.debug(location.pathname);
    if (location.pathname === '/home') {
      history.push({
        pathname: 'search',
        search: `?${searchCondition}`,
      });
    } else {
      history.push({
        search: `?${searchCondition}`,
      });
    }
  };

  return {
    posts,
    isLoading,
    hasNext,
    hasPrev,
    page,
    myPosts,
    per,
    likedPosts,
    searchPost,
    setPosts: (v: PostInterface[]) => setPosts(v),
    next: () => {
      setIsLoading(true);
      setPage((parseInt(page, 10) + 1).toString());
      window.scrollTo(0, 0);
      let condition = `?page=${parseInt(page, 10) + 1}`;
      if (searchOrder) condition += `&order=${searchOrder}`;
      if (searchCategory.length !== 0) condition += `&category=${searchCategory.toString()}`;
      if (searchGame.length !== 0) condition += `&game=${searchGame.toString()}`;
      history.push({
        pathname: location.pathname,
        search: condition,
      });
    },
    prev: () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      setPage((parseInt(page, 10) - 1).toString());
      let condition = `?page=${parseInt(page, 10) - 1}`;
      if (searchOrder) condition += `&order=${searchOrder}`;
      if (searchCategory.length !== 0) condition += `&category=${searchCategory.toString()}`;
      if (searchGame.length !== 0) condition += `&game=${searchGame.toString()}`;
      history.push({
        pathname: location.pathname,
        search: condition,
      });
    },
    setSearchGames: (v: string) => {
      if (gameMaster) {
        if (v !== '選択しない') {
          const list = gameMaster.filter((c: GameInterface) => v.includes(c.title));
          const idList = list.map((l: GameInterface) => l.id);
          setSearchGame(idList);
          setSearchGameTitle([v]);
        } else {
          setSearchGame([]);
          setSearchGameTitle([v]);
        }
      }
    },
    setSearchCategories: (v: string) => {
      if (categoryMaster) {
        if (v !== '選択しない') {
          const list = categoryMaster.filter((c: CategoryInterface) => v.includes(c.name));
          const idList = list.map((l: CategoryInterface) => l.id);
          setSearchCategory(idList);
          setSearchCategoryName([v]);
        } else {
          setSearchCategory([]);
          setSearchCategoryName([v]);
        }
      }
    },
    setSearchWord: (v: string) => setSearchWord(v),
    searchGame,
    searchGameTitle,
    searchCategory,
    searchCategoryName,
    searchOrder,
    setSearchOrder,
    orderMaster,
    doSearch,
    searchWord,
  };
};

export default useFetchPost;
