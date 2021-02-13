// /* eslint-disable no-console */
import { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Post } from 'entity/entity/post';
import { SortType, SortTypeRelation, SortTypes } from 'entity/union/sortType';
import { searchPostList } from 'api/posts/searchPostList';
import { SearchParam, SearchParams } from 'constants/searchParams';

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
  const PER = 20;
  const [postLength, setPostLength] = useState<number>(0);
  const [searchParam, setSearchParam] = useState<SearchParam>({
    order: SortTypes.NEWEST,
    page: 1,
    per: PER,
    game: [],
    category: [],
    word: ''
  });

  const setSortType = (s: SortType) => {
    const param = searchParam;
    param.order = s;
    setSearchParam({ ...param });
  };

  const setPage = (p: number) => {
    const param = searchParam;
    param.page = p;
    setSearchParam({ ...param });
  };

  const getParams = () => {
    const order = params.get(SearchParams.ORDER);
    if (order != null) {
      const orderNum: SortType = +order as SortType;
      searchParam.order = orderNum;
      setSortType(SortTypeRelation[orderNum]);
    }

    // const order = params.get(SearchParams.ORDER);
    // if (order != null) {
    //   const orderNum: SortType = +order as SortType;
    //   searchParam.order = orderNum;
    //   setSortType(SortTypeRelation[orderNum]);
    // }
  };

  useEffect(() => {
    getParams();

    (async () => {
      setIsLoading(true);
      try {
        await search();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      (async () => {
        setIsSorting(true);
        try {
          await search();
        } finally {
          setIsSorting(false);
        }
      })();
    }
  }, [location.search]);

  useEffect(() => {
    if (posts.length > 0) {
      let searchCondition = `order=${searchParam.order}`;
      // if (selectedCategory.length !== 0) searchCondition += `&category=${selectedCategory.toString()}`;
      // if (selectedGame.length !== 0) searchCondition += `&game=${selectedGame.toString()}`;
      searchCondition += `&word=${searchParam.word}`;

      history.push({
        pathname: 'search',
        search: `?${searchCondition}`,
      });
    }
  }, [searchParam.order]);

  const search = async () => {
    setPosts([]);
    try {
      const res = await searchPostList(1, searchParam.per, searchParam.game, searchParam.category, searchParam.order, searchParam.word);
      setPosts(res.posts);
      setPostLength(res.posts.length);
      setPage(2);
    } catch (e) {
      console.debug(e);
    }
  };


  const checkLastPage = (postList: Post[]) => {
    if (postList.length < PER) {
      setIsLastPage(true);
    }
  };

  const loadMore = async () => {
    setIsMoreLoading(true);
    try {
      const res = await searchPostList(searchParam.page, PER, [], [], searchParam.order, '');
      setPosts([...posts, ...res.posts]);
      setPostLength(l => l + res.posts.length);
      setIsLoading(false);
      setPage(searchParam.page + 1);
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
    searchParam,
    setSortType,
    search,
    isSorting
  };
};
