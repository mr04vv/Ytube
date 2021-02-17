
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import React from 'react';
import { CategoryName, CloseButton, Container, ContentContainer, CustomModal, LoadingContainer, ModalTitleContainer, SearchIcon } from './style';


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
    <CloseButton onClick={() => setIsOpen(false)}>
      <Close />
    </CloseButton>
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
              <CategoryName onClick={() => { setItem(item); setIsOpen(false); }}>{item.name}</CategoryName>))
            :
            (items as Game[]).map((item: Game) => (
              <CategoryName onClick={() => { setItem(item); setIsOpen(false); }}>{item.title}</CategoryName>
            ))}
        </>
        }
      </ContentContainer>
    </Container>
  </CustomModal>
);
