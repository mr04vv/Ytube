import * as React from 'react';
import styled from 'styled-components';

const spHelp = require('images/helpSP.jpg');
const urlHelp = require('images/url.jpg');
const setHelp = require('images/setting.jpg');
const content = require('images/content.jpg');

const Help = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Container>
        <Title>
          使い方
        </Title>
        <PromptContainer>
          <div>投稿機能の利用にはログインが必要です</div>
        </PromptContainer>
        <Explain>
          中央下部の＋ボタンを押します
        </Explain>
        <ImageContainer width="80%" src={spHelp} alt="" />

        <Explain>
          投稿したい動画のURLを貼り付けます
        </Explain>
        <ImageContainer width="80%" src={urlHelp} alt="" />

        <ExplainContent>
          動画を再生し、お好みの場所で開始時間と終了時間をセットし右上の次へボタンを押します
        </ExplainContent>
        <ImageContainer width="80%" src={setHelp} alt="" />

        <ExplainContent>
          1. タイトルを入力します
          <br />
          2. 内容を入力します
          <br />
          3. ゲームとカテゴリを選択します
          <br />
          4. ゲーム、カテゴリは自由に追加できます
          <br />
          5. 右上の投稿ボタンを押して投稿
        </ExplainContent>
        <ImageContainer width="80%" src={content} alt="" />
      </Container>
    </>
  );
};

export default Help;

const Container = styled.div`
  margin: 80px auto 80px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const ImageContainer = styled.img`
  margin-top: 10px;
`;

const Explain = styled.p`
  width: 80%;
  margin: 20px auto;
  text-align: center;
  font-weight: bold;
`;

const ExplainContent = styled.p`
  line-height: 1.8;
  width: 80%;
  margin: 30px auto;
  font-weight: bold;
`;

const Title = styled.p`
  margin: 30px 0 0;
  font-size: 20px;
`;

const PromptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: red;
  font-weight: bold;
`;
