import React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import {
  Container, Title, Explain, Info, SNSLink, Share, FooterContainer, Attention, Text,
} from './styles';


const Information = () => (
  <>
    <Container>
      <Title>
        更新情報
      </Title>
      <Explain>
        2019.10.13
      </Explain>
      <Info>
        検索機能追加
      </Info>
      <Info>
        タイトルの上限を30文字に変更
      </Info>
      <Info>
        時折匿名で投稿できない不具合を修正
      </Info>
      <Explain>
        2019.10.12
      </Explain>
      <Info>
        テーマカラー変更
      </Info>
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
      <Text>
        本サイトの運営には月1,000円ほどかかっています(2019/10/8現在)。本サイトを今後も継続していく為、皆様のご支援をよろしくおねがいします。
      </Text>
      <SNSLink target="_brank" href="https://www.amazon.co.jp/hz/wishlist/ls/J7CJ3KNEL2PF?type=wishlist&filter=unpurchased&sort=price-asc">サイトを支援する</SNSLink>
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

export default Information;
