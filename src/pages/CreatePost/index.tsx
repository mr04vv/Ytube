import { TextField } from '@material-ui/core';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import * as React from 'react';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { convertPlayTime } from 'utilities/convertPlayTime';
import { useEnhancer } from './enhancer';
import { HelpModal } from './HelpModal';
import { SelectModal } from './SelectModal';
import { Check, CheckContainer, Container, CustomTextField, FormContainer, Help, ItemTitle, NextIcon, SelectItem, SelectItemContainer, TextFieldContainer, TimeSetButton, YouTubePlayer } from './style';


export const CreatePost = () => {
  const w = useWindowDimensions();
  const enhancer = useEnhancer();

  return (
    <>
      <Container>
        <HelpModal
          isOpen={enhancer.openHelp}
          setIsOpen={enhancer.setOpenHelp}
        />
        <SelectModal
          search={enhancer.categoryFilter}
          loading={enhancer.loadingMeta}
          items={enhancer.filteredCategories}
          setItem={(c: Category) => { }}
          itemType="category"
          isOpen={enhancer.openCategories}
          setIsOpen={enhancer.setOpenCategories}
        />
        <SelectModal
          search={enhancer.gameFilter}
          loading={enhancer.loadingMeta}
          items={enhancer.filteredGames}
          setItem={(g: Game) => { }}
          itemType="game"
          isOpen={enhancer.openGames}
          setIsOpen={enhancer.setOpenGames}
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
            <SelectItem onClick={() => enhancer.setOpenCategories(true)}>
              選択してください
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>
          <SelectItemContainer>
            <ItemTitle>ゲーム*</ItemTitle>
            <SelectItem onClick={() => enhancer.setOpenGames(true)}>
              選択してください
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>
        </FormContainer>
      </Container>
    </>
  );
};
