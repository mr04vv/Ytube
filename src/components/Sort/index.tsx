import { SortType, SortTypes } from 'entity/union/sortType';
import React from 'react';
import { OrderContainer, OrderItem } from './style';

interface Props {
  sortType: SortType;
  onClick: (s: SortType) => void;
}

const Sort = ({ sortType, onClick }:Props) => (

  <OrderContainer>
    <OrderItem selected={sortType === SortTypes.NEWEST} onClick={() => onClick(SortTypes.NEWEST)}>投稿が新しい順</OrderItem>
    <OrderItem selected={sortType === SortTypes.LIKE_COUNT} onClick={() => onClick(SortTypes.LIKE_COUNT)}>いいねが多い順</OrderItem>
    <OrderItem selected={sortType === SortTypes.OLDEST} onClick={() => onClick(SortTypes.OLDEST)}>投稿が古い順</OrderItem>
    <OrderItem selected={sortType === SortTypes.PLAY_COUNT} onClick={() => onClick(SortTypes.PLAY_COUNT)}>再生回数が多い順</OrderItem>
  </OrderContainer>
);

export default Sort;
