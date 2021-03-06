import React from 'react';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import { CategoryName, Container, ContentContainer, CustomModal, LoadingContainer, ModalTitleContainer, SearchIcon } from './style';

type ItemType = 'game' | 'category';

interface Props {
  items: Category[] | Game[]
  setItem: (item: any) => void
  setIsOpen: (v: boolean) => void
  isOpen: boolean
  itemType: ItemType
  loading: boolean
  search: (w: string) => void
}

export const SelectModal: React.FC<Props> = ({ items, setItem, setIsOpen, isOpen, itemType, loading, search }) => (
  <CustomModal
    ariaHideApp={false}
    onRequestClose={() => setIsOpen(false)}
    isOpen={isOpen}
    style={{
      overlay: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(165, 165, 165, 0.2)',
        overflow: 'auto',
      },
    }}
  >
    <Container>
      <ModalTitleContainer>
        {itemType === 'category' ? 'カテゴリ' : 'ゲーム'}
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </ModalTitleContainer>
      <ContentContainer>
        {loading ? <LoadingContainer><CircularProgress /></LoadingContainer> :
        <>
          {itemType === 'category' ?
            (items as Category[]).map((item: Category) => (
              <CategoryName key={`category_${item.id}`} onClick={() => { setItem(item); setIsOpen(false); }}>{item.name}</CategoryName>))
            :
            (items as Game[]).map((item: Game) => (
              <CategoryName key={`game_${item.id}`} onClick={() => { setItem(item); setIsOpen(false); }}>{item.title}</CategoryName>
            ))}
        </>}
      </ContentContainer>
    </Container>
  </CustomModal>
);
