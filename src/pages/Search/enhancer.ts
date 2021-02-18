/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Post } from 'entity/entity/post';
import { SortType, SortTypes } from 'entity/union/sortType';
import { searchPostList } from 'api/posts/searchPostList';
import { SearchParam, SearchParams } from 'constants/searchParams';
import { COUNT_PER_PAGE } from 'constants/countPerPage';
import { INITIAL_SEARCH_PARAM } from 'constants/initialSearchParam';

export interface OrderInterface {
  id: number;
  name: string;
}

export const useEnhancer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const { history, location } = useReactRouter();
  const params = new URLSearchParams(location.search);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [postLength, setPostLength] = useState<number>(0);
  const [sortType, setSortType] = useState<SortType>(SortTypes.NEWEST);
  const [page, setPage] = useState<number>(1);
  const [searchWord, setWord] = useState<string>('');
  const [searchCategoryIds, setSearchCategoryIds] = useState<number[]>([]);
  const [searchGameIds, setSearchGameIds] = useState<number[]>([]);

  const getParams = (): SearchParam => {
    const param: SearchParam = { ...INITIAL_SEARCH_PARAM };
    const order = params.get(SearchParams.ORDER);
    if (order != null) {
      const orderNum: SortType = +order as SortType;
      setSortType(orderNum);
      param.order = orderNum;
    }

    const word = params.get(SearchParams.WORD);
    if (word != null) {
      setWord(word);
      param.word = word;
    }

    const category = params.get(SearchParams.CATEGORY);
    if (category != null) {
      setSearchCategoryIds([Number(category)]);
      param.category = [Number(category)];
    }

    const game = params.get(SearchParams.GAME);
    if (game != null) {
      setSearchGameIds([Number(game)]);
      param.game = [Number(game)];
    }

    // const order = params.get(SearchParams.ORDER);
    // if (order != null) {
    //   const orderNum: SortType = +order as SortType;
    //   searchParam.order = orderNum;
    //   setSortType(SortTypeRelation[orderNum]);
    // }
    return param;
  };

  const pushPostDetailPage = (postId: number) => {
    history.push({
      pathname: `/post/${postId}`,
    });
  };

  useEffect(() => {
    (async () => {
      const param = getParams();
      setIsSorting(true);
      try {
        await search(param);
      } finally {
        setIsLoading(false);
        setIsSorting(false);
        (async () => {

        })();
      }
    })();
  }, [location.search]);

  useEffect(() => {
    if (posts.length > 0) {
      let searchCondition = `order=${sortType}`;
      if (searchCategoryIds.length !== 0) searchCondition += `&category=${searchCategoryIds[0]}`;
      if (searchGameIds.length !== 0) searchCondition += `&game=${searchGameIds[0]}`;
      searchCondition += `&word=${searchWord}`;

      history.push({
        pathname: 'search',
        search: `?${searchCondition}`,
      });
    }
  }, [sortType]);

  const search = async (param: SearchParam) => {
    setPosts([]);
    try {
      const res = await searchPostList(1, param.per, param.game, param.category, param.order, param.word);
      setIsLastPage(false);
      setPosts(res.posts);
      setPostLength(res.posts.length);
      checkLastPage(res.posts);
      setPage(2);
    } catch (e) {
      console.debug(e);
    }
  };


  const checkLastPage = (postList: Post[]) => {
    if (postList.length < COUNT_PER_PAGE) {
      setIsLastPage(true);
    }
  };

  const loadMore = async () => {
    setIsMoreLoading(true);
    try {
      const param = getParams();
      const res = await searchPostList(page, COUNT_PER_PAGE, param.game, param.category, param.order, param.word);
      setPosts([...posts, ...res.posts]);
      setPostLength(l => l + res.posts.length);
      setIsLoading(false);
      setPage(page + 1);
      checkLastPage(res.posts);
      setIsMoreLoading(false);
    } catch (e) {
      console.debug(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    loadMore,
    isLastPage,
    isMoreLoading,
    postLength,
    setSortType,
    search,
    isSorting,
    sortType,
    pushPostDetailPage
  };
};
