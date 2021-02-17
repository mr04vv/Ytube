
import { CircularProgress } from '@material-ui/core';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import React from 'react';
import { CategoryName, Container, ContentContainer, CustomModal, LoadingContainer, ModalTitleContainer } from './style';


type ItemType = 'game' | 'category';

interface Props {
  items: Category[] | Game[]
  setItem: (item: any) => void
  setIsOpen: (v: boolean) => void
  isOpen: boolean
  itemType: ItemType
  loading: boolean
}

export const SelectModal: React.FC<Props> = ({ items, setItem, setIsOpen, isOpen, itemType, loading }) => (
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
    <Container>
      <ModalTitleContainer>
        {itemType === 'category' ? 'カテゴリ' : 'ゲーム'}
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
