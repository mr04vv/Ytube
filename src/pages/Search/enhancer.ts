// /* eslint-disable no-console */
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

    // const order = params.get(SearchParams.ORDER);
    // if (order != null) {
    //   const orderNum: SortType = +order as SortType;
    //   searchParam.order = orderNum;
    //   setSortType(SortTypeRelation[orderNum]);
    // }
    return param;
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
      }
    })();
  }, [location.search]);

  useEffect(() => {
    if (posts.length > 0) {
      let searchCondition = `order=${sortType}`;
      // if (selectedCategory.length !== 0) searchCondition += `&category=${selectedCategory.toString()}`;
      // if (selectedGame.length !== 0) searchCondition += `&game=${selectedGame.toString()}`;
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
      const res = await searchPostList(page, COUNT_PER_PAGE, [], [], param.order, param.word);
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
    sortType
  };
};
