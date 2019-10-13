/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
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

const useFetchPost = (categoryMaster?: CategoryInterface[], gameMaster?: GameInterface[]) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
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
  const [searchOrder, setSearchOrder] = useState<number>(0);
  const [searchGame, setSearchGame] = useState<number[]>([]);
  const [searchGameTitle, setSearchGameTitle] = useState<string[]>([]);
  const [searchCategoryName, setSearchCategoryName] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const initPage = params.get('page') || '1';
  const [page, setPage] = useState<string>(initPage);
  const currentGame = params.get('game');
  const currentCategory = params.get('category');
  const currentOrder = params.get('order');
  const [orderMaster] = useState<OrderInterface[]>([
    {
      id: 0,
      name: '投稿が新しい',
    },
    {
      id: 1,
      name: '投稿が古い',
    },
    {
      id: 2,
      name: 'いいねが多い',
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
    if (location.pathname === '/search') {
      if (gameMaster && gameMaster.length !== 0 && categoryMaster && categoryMaster.length !== 0) {
        let currentOrderId = 0;
        let currentCategoryIds: number[] = [];
        let currentGameIds: number[] = [];
        if (currentOrder !== null) {
          currentOrderId = parseInt(currentOrder, 10);
          setSearchOrder(currentOrderId);
        }
        if (currentGame !== null) {
          currentGameIds = currentGame.split(',').map(Number);
          setSearchGame(currentGameIds);
          setSearchGameTitle(gameMaster.filter((g: GameInterface) => currentGameIds.includes(g.id)).map((g: GameInterface) => g.title));
        }
        if (currentCategory !== null) {
          currentCategoryIds = currentCategory.split(',').map(Number);
          setSearchCategory(currentCategory.split(',').map(Number));
          setSearchCategoryName(categoryMaster.filter((c: CategoryInterface) => currentCategoryIds.includes(c.id)).map((c: CategoryInterface) => c.name));
        }
        dispatch(searchPosts(page, per, currentGameIds, currentCategoryIds, currentOrderId));
      }
    }
  }, [page, dispatch, per, location.pathname, gameMaster, categoryMaster, currentCategory, currentGame, currentOrder]);

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

  const doSearch = () => {
    dispatch(searchPosts(page, per, searchGame, searchCategory, searchOrder));
    let searchCondition = `order=${searchOrder}`;
    if (searchCategory.length !== 0) searchCondition += `&category=${searchCategory.toString()}`;
    if (searchGame.length !== 0) searchCondition += `&game=${searchGame.toString()}`;

    history.push({
      search: `?${searchCondition}`,
    });
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
    setSearchGames: (v: string[]) => {
      if (gameMaster) {
        const list = gameMaster.filter((c: GameInterface) => v.includes(c.title));
        const idList = list.map((l: GameInterface) => l.id);
        setSearchGame(idList);
        setSearchGameTitle(v);
      }
    },
    setSearchCategories: (v: string[]) => {
      if (categoryMaster) {
        const list = categoryMaster.filter((c: CategoryInterface) => v.includes(c.name));
        const idList = list.map((l: CategoryInterface) => l.id);
        setSearchCategory(idList);
        setSearchCategoryName(v);
      }
    },
    searchGame,
    searchGameTitle,
    searchCategory,
    searchCategoryName,
    searchOrder,
    setSearchOrder,
    orderMaster,
    doSearch,
  };
};

export default useFetchPost;
