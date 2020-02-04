import * as React from 'react';
import styled from 'styled-components';

const spHelp = require('images/helpSP.jpg');
const urlHelp = require('images/url.jpg');
const content = require('images/content.jpg');

const Help = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Container>
        <Title>使い方</Title>
        <PromptContainer>
          <div>投稿機能の利用にはログインが必要です</div>
        </PromptContainer>
        <ExplainContainer>
          <Explain>①中央下部の＋ボタンを押す</Explain>
          <ImageContainer src={spHelp} alt="" />
        </ExplainContainer>
        <ExplainContainer>
          <Explain>
            ②投稿する動画のURLを貼り付ける
            <br />
            ③シーンの開始時間をセット
            <br />
            ④シーンの終了時間をセット
          </Explain>
          <ImageContainer src={urlHelp} alt="" />
        </ExplainContainer>
        <ExplainContainer>
          <Explain>
            ⑤タイトルを入力する
            <br />
            ⑥詳細やコメントを入力する
            <br />
            ⑦ゲームとカテゴリを選択する
            <br />
            ⑧ゲーム、カテゴリは自由に追加可能
            <br />
            ⑨右上の投稿ボタンを押して投稿
          </Explain>
          <ImageContainer src={content} alt="" />
        </ExplainContainer>
      </Container>
    </>
  );
};

export default Help;

const Container = styled.div`
  margin: 80px auto 80px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.img`
  width: 50%;
  margin-top: 10px;
  height: 100%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Explain = styled.p`
  display: flex;
  align-items: center;
  width: 40%;
  margin: 20px auto;
  text-align: left;
  line-height: 2;
  font-size: 18px;
  @media (min-width: 1261px) {
    padding-left: 180px;
  }
  @media (max-width: 1024px) {
    width: 96%;
    line-height: 1.2;
  }
`;

const ExplainContainer = styled.div`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

const Title = styled.p`
  margin: 30px 0 0;
  font-size: 26px;
`;

const PromptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: red;
  font-size: 18px;
`;
