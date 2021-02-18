import { LoginModal } from 'components/LoginModal';
import SimpleSnackBar from 'components/SimpleSnackBar';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import * as React from 'react';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { useEnhancer } from './enhancer';
import { HelpModal } from './HelpModal';
import { SelectModal } from './SelectModal';
import { CategoryName, Check, CheckContainer, Container, CustomTextField, FormContainer, Help, ItemTitle, NextIcon, PostButton, SelectItem, SelectItemContainer, TextFieldContainer, TimeSetButton, YouTubePlayer } from './style';


export const EditPost = () => {
  const w = useWindowDimensions();
  const enhancer = useEnhancer();

  return (
    <>
      <LoginModal isOpen={enhancer.isOpenLoginModal} setIsOpen={enhancer.setIsOpenLoginModal} />
      <SimpleSnackBar isShow={!!enhancer.error} onClose={() => enhancer.setError('')} message={enhancer.error} type="error" />
      <Container>
        <HelpModal
          isOpen={enhancer.openHelp}
          setIsOpen={enhancer.setOpenHelp}
        />
        <SelectModal
          unset={enhancer.unsetSelectedCategories}
          search={enhancer.categoryFilter}
          loading={enhancer.loadingMeta}
          items={enhancer.filteredCategories}
          setItem={(c: Category) => enhancer.setSelectedCategories(c)}
          itemType="category"
          isOpen={enhancer.openCategories}
          setIsOpen={enhancer.setOpenCategories}
          selectedItems={enhancer.selectedCategories}
          setAddName={enhancer.setAddCategoryName}
          addName={enhancer.addCategoryName}
          create={enhancer.addCategory}
        />
        <SelectModal
          unset={() => { }}
          search={enhancer.gameFilter}
          loading={enhancer.loadingMeta}
          items={enhancer.filteredGames}
          setItem={(g: Game) => enhancer.setSelectedGames(g)}
          itemType="game"
          isOpen={enhancer.openGames}
          setIsOpen={enhancer.setOpenGames}
          selectedItems={enhancer.selectedGames}
          setAddName={enhancer.setAddGameName}
          addName={enhancer.addGameName}
          create={enhancer.addGame}
        />
        <YouTubePlayer
          ref={enhancer.ref}
          controls
          width="100%"
          height={w.windowDimensions.width > 1700 ? `${(1700) * 0.5625}px` : `${(w.windowDimensions.width) * 0.5625}px`}
          url={enhancer.url}
        />
        <FormContainer>
          <Help onClick={() => enhancer.setOpenHelp(true)} />
          <TextFieldContainer>
            <CustomTextField
              label="動画URL*"
              onChange={enhancer.setUrl}
              value={enhancer.url}
              fullWidth
              placeholder="https://youtu.be/hogehoge"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="開始時間*"
              onChange={enhancer.setStartTime}
              value={enhancer.startTime}
              placeholder="3:12"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TimeSetButton onClick={() => enhancer.setStart()}>現在の再生時間をセット</TimeSetButton>
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="終了時間*"
              onChange={enhancer.setEndTime}
              value={enhancer.endTime}
              placeholder="3:35"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TimeSetButton onClick={() => enhancer.setEnd()}>現在の再生時間をセット</TimeSetButton>
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="タイトル*"
              onChange={enhancer.setTitle}
              value={enhancer.title}
              fullWidth
              placeholder="ルージュラの鳴き声"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="コメントやキーワード"
              onChange={enhancer.setComment}
              value={enhancer.comment}
              rowsMax={4}
              rows={4}
              multiline
              fullWidth
              placeholder={'検索に引っかかりやすいようにシーン内の発言やキーワードをコメントとして残そう！\n(例)楽しそうに踊ってるおいたんすこ。 #バスビ #バンスビ'}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldContainer>
          <CheckContainer>
            <ItemTitle>匿名で投稿する*</ItemTitle>
            <Check color="primary" value={enhancer.isAnonymous} onChange={(_, checked) => enhancer.setIsAnonymous(checked)} />
          </CheckContainer>
          <SelectItemContainer>
            <ItemTitle>カテゴリ*</ItemTitle>
            <SelectItem onClick={enhancer.openSelectCategory}>
              {enhancer.selectedCategories.length === 0 ?
                '選択してください' :
                (enhancer.selectedCategories).map((item: Category) => (
                  <CategoryName>{item.name}</CategoryName>))
              }
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>
          <SelectItemContainer>
            <ItemTitle>ゲーム*</ItemTitle>
            <SelectItem onClick={enhancer.openSelectGame}>
              {enhancer.selectedGames.length === 0 ?
                '選択してください' :
                <CategoryName>{ enhancer.selectedGames[0].title}</CategoryName>
              }
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>
        </FormContainer>
        <PostButton disabled={!enhancer.canPost || enhancer.isLoading} onClick={enhancer.post}>編集</PostButton>
      </Container>
    </>
  );
};
