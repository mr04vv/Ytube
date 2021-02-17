import { TextField } from '@material-ui/core';
import * as React from 'react';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { Check, CheckContainer, Container, CustomTextField, FormContainer, ItemTitle, NextIcon, SelectItem, SelectItemContainer, TextFieldContainer, YouTubePlayer } from './style';


export const CreatePost = () => {
  window.scrollTo(0, 0);
  const w = useWindowDimensions();

  return (
    <>
      <Container>
        <YouTubePlayer
          controls
          width="100%"
          height={w.windowDimensions.width > 1700 ? `${(1700) * 0.5625}px` : `${(w.windowDimensions.width) * 0.5625}px`}
          url="https://www.youtube.com/watch?v=Y-ve15GAFM0&list=RDCMUCxnmd646pQOOvgVZ3ZQlz4w&start_radio=1"
        />

        <FormContainer>
          <TextFieldContainer>
            <CustomTextField
              label="動画URL*"
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
              fullWidth
              placeholder="3:12"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="終了時間*"
              fullWidth
              placeholder="3:35"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <CustomTextField
              label="タイトル*"
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
            <Check color="primary" />
          </CheckContainer>

          <SelectItemContainer>
            <ItemTitle>カテゴリ*</ItemTitle>
            <SelectItem>
              選択してください
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>
          <SelectItemContainer>
            <ItemTitle>ゲーム*</ItemTitle>
            <SelectItem>
              選択してください
              <NextIcon />
            </SelectItem>
          </SelectItemContainer>

        </FormContainer>

      </Container>
    </>
  );
};
