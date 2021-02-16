/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteById } from 'reduxes/modules/posts/delete';
import { getPosts } from 'reduxes/modules/posts/fetchPost';

export interface UseEditPostInterface {
  isOpenNumber: number | undefined;
  setIsOpenNumber: (v: number) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, num: number) => void;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  del: (id: number, page: number, per: number) => void;
  isLoading: boolean;
}

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

  const del = async (id: number, page: number, per: number) => {
    setIsLoading(true);
    await dispatch<any>(deleteById(id)).catch((err: any) => {
      throw err;
    });
    setIsOpenNumber(0);

    await dispatch(getPosts(page, per));
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
