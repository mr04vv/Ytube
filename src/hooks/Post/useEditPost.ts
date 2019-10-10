/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteById } from 'reduxes/modules/posts/delete';
import { fetchPosts } from 'reduxes/modules/posts/fetchPost';

const useEditPost = () => {
  const [isOpenNumber, setIsOpenNumber] = useState<number>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, num: number) => {
    setIsOpenNumber(num);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpenNumber(0);
    setAnchorEl(null);
  };

  const del = async (id: number, page: string, per: string) => {
    setIsLoading(true);
    await dispatch<any>(deleteById(id)).catch((err: any) => {
      throw err;
    });
    setIsOpenNumber(0);

    await dispatch(fetchPosts(page, per));
    setIsLoading(false);
  };

  return {
    isOpenNumber,
    setIsOpenNumber,
    handleClick,
    handleClose,
    anchorEl,
    del,
    isLoading,
  };
};

export default useEditPost;
