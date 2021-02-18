
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import SimpleSnackBar from 'components/SimpleSnackBar';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import React, { useState } from 'react';
import { AddButton, CategoryName, CloseButton, CloseIcon, Container, ContentContainer, CustomModal, CustomTextField, HelpText, LoadingContainer, ModalTitleContainer, NextButton, SearchIcon, SelectedContainer, SelectedTitle, TextFieldContainer } from './style';


type ItemType = 'game' | 'category';

interface Props {
  items: Category[] | Game[]
  setItem: (item: any) => void
  setIsOpen: (v: boolean) => void
  isOpen: boolean
  itemType: ItemType
  loading: boolean
  search: (w: string) => void
  selectedItems: Category[] | Game[],
  unset: Function;
  setAddName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addName: string;
  create: () => Promise<boolean>;
}

export const SelectModal: React.FC<Props> = ({ items, setItem, setIsOpen, isOpen, itemType, loading, search, selectedItems, unset, setAddName, addName, create }) => {
  const [error, setError] = useState<string>('');
  return (
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
      <SimpleSnackBar isShow={!!error} onClose={() => setError('')} message={error} type="error" />
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
        {itemType === 'category' &&
          <>
            <SelectedTitle>選択済み</SelectedTitle>
            <SelectedContainer>
              <>
                {selectedItems.length === 0 && '選択されていません'}
                {itemType === 'category' ?
                  (selectedItems as Category[]).map((item: Category) => (
                    <CategoryName onClick={() => unset(item)}>
                      {item.name}
                      <CloseIcon />
                    </CategoryName>))
                  :
                  (selectedItems as Game[]).map((item: Game) => (
                    <CategoryName onClick={() => {
                      setItem(item);
                      setIsOpen(false);
                    }}
                    >
                      {item.title}

                    </CategoryName>
                  ))}
              </>
              <NextButton onClick={() => setIsOpen(false)}>カテゴリを確定</NextButton>
            </SelectedContainer>
          </>
        }
        <ContentContainer>
          {loading ? <LoadingContainer><CircularProgress /></LoadingContainer> :
          <>
            {itemType === 'category' ?
              (items as Category[]).map((item: Category) => (
                <CategoryName onClick={() => { setItem(item); }}>{item.name}</CategoryName>))
              :
              (items as Game[]).map((item: Game) => (
                <CategoryName onClick={() => { setItem(item); setIsOpen(false); }}>{item.title}</CategoryName>
              ))}
          </>
          }
        </ContentContainer>
        <HelpText>*選択したいものが見つからない場合は下のフォームから追加できます</HelpText>
        <TextFieldContainer>
          <CustomTextField
            value={addName}
            label={itemType === 'category' ? 'カテゴリ名' : 'ゲームタイトル'}
            onChange={setAddName}
            placeholder={itemType === 'category' ? 'バグ' : 'あつまれどうぶつの森'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <AddButton
            disabled={!addName || loading}
            onClick={async () => {
              const created = await create();
              if (!created) {
                setError('追加に失敗しました');
                setTimeout(() => {
                  setError('');
                }, [2000]);
              }
            }}
          >
            追加
          </AddButton>
        </TextFieldContainer>
      </Container>
    </CustomModal>
  );
};
