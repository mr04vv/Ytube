import * as React from 'react';
import styled from 'styled-components';
import { TwitterShareButton, TwitterIcon } from 'react-share';

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
          更新情報
        </Title>
        <Explain>
          2019.10.12
        </Explain>
        <Info>
          いいね機能追加
        </Info>
        <Info>
          いいね数表示機能追加
        </Info>
        <Info>
          いいねした投稿の閲覧機能追加
        </Info>
        <Explain>
          2019.10.11
        </Explain>
        <Info>
          匿名投稿機能追加
        </Info>
        <Info>
          ログイン時のメニューにアイコン表示
        </Info>
        <Info>
          投稿削除機能追加
        </Info>
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
      <FooterContainer>
        <Title>
          わいわいさんリンク
        </Title>
        <SNSLink target="_brank" href="https://www.youtube.com/channel/UCSkLRGGIGKOtinamhcy_42g">[YouTube]YY-CHANNEL [YCH]</SNSLink>
        <SNSLink target="_brank" href="https://twitter.com/ABCDYY">[Twitter]わいわい(31)</SNSLink>
        <SNSLink target="_brank" href="https://www.instagram.com/waiwai_31yearsold/?hl=ja">[Instagram]わいわい(31)</SNSLink>
        <Title>
          運営より
        </Title>
        {/* <Text>
          本サイトの運営には月1,000円ほどかかっています(2019/10/8現在)。本サイトを今後も継続していく為、皆様のご支援をよろしくおねがいします。
        </Text> */}
        {/* <SNSLink target="_brank" href="https://www.amazon.co.jp/hz/wishlist/ls/J7CJ3KNEL2PF">サイトを支援する</SNSLink> */}
        <SNSLink target="_brank" href="https://twitter.com/YTube_official">作者Twitterリンク</SNSLink>
        {/* <SNSLink target="_brank" href="https://twitter.com/akkun_jiro">作者Twitterリンク２</SNSLink> */}
        <SNSLink target="_brank" href="https://mooriii.com/">作者ホームページ</SNSLink>
        <SNSLink target="_brank" href="https://github.com/mr04vv/Ytube">ソースコード</SNSLink>
        <Text>その他ご要望等がある場合TwiiterのDMにて受け付けております。ご気軽にお申し付けください。</Text>
        <Share>ツイッターでこのサイトを共有する</Share>
        <Share>↓↓↓↓↓↓</Share>
        <TwitterShareButton
          url="https://ytube-938fd.firebaseapp.com/home"
          title="YtubeでYYさんの好きなシーンを共有しよう！"
        >
          <TwitterIcon
            size={32}
            round
          />
        </TwitterShareButton>
        <Attention>
          Created by
          {' '}
          <a target="_brank" href="https://mooriii.com/">Takuto Mori</a>
        </Attention>
        <Attention>
          当サイトでは、アクセス解析のためにGoogleアナリティクスを使用しています。 このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。 このトラフィックデータは匿名で収集されており、個人を特定するものではありません。 この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。 なおこの規約に関しまして、詳細は
          <a target="_brank" href="https://marketingplatform.google.com/about/analytics/terms/jp/">Googleアナリティクス利用規約</a>
          にてご確認ください。
        </Attention>
      </FooterContainer>
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

const FooterContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 20px auto 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2;
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

const SNSLink = styled.a`
  margin: 2px 0;
`;

const Text = styled.div`
  margin: 10px;
  font-size: 18px;
`;

const Attention = styled.p`
  margin-top: 20px;
  font-size: 10px;
  color: #a5a5a5;
`;

const Share = styled.div`
  margin: 0px;
  font-size: 18px;
`;

const PromptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: red;
  font-weight: bold;
`;

const Info = styled.p`
  margin: 4px;
  width: 80%;
  text-align: center;
`;
