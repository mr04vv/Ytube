import * as React from 'react';
import PostList from 'components/PostList';
import Helmet from 'react-helmet';
import useMasterData from 'hooks/Post/useMasterData';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { Category } from 'entity/entity/category';
import { calculatePostDate } from 'utilities/calcuatePostDate';
import { SMALL_POST_LIST_CONTAINER_MAX_WIDTH } from 'constants/maxWidth';
import useFetchPost from './enhancer';
import { CategoryGameContainer, CategoryName, Container, Detail, DetailContainer, Devider, GameTitle, LikeContainer, LikeIcon, MainContentContainer, MetaContainer, OpenAppButton, OpenAppButtonContainer, PlayCountAndDate, PostInfoContainer, RandomPostContainer, RandomPostListContainer, ShareAndLikeContainer, ShareContainer, ShareIcon, Title, YouTubePlayer, } from './style';


const Post = () => {
  // const postList = useFetchPost();
  // const post = postList.posts[0];
  const window = useWindowDimensions();

  // const master = useMasterData();
  const [ref] = useState<React.MutableRefObject<null> >(
    React.useRef(null)
  );
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const posts = { posts: [{ id: 2046, title: 'フィル、うごめきます。', videoUrl: 'https://www.youtube.com/watch?v=e8i1gnsvqJE\u0026feature=share', detail: '飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!\n飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!', endTime: 107, startTime: 90, createdAt: '2020-08-13T14:29:57.000+09:00', isAnonymous: true, likeCount: 218, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/e8i1gnsvqJE/hqdefault.jpg', playCount: 2248, dynamicLink: 'https://yycollection.page.link/8CgCsPyDQ8iT66uq9', user: { id: 117, name: 'меї', imageUrl: 'https://pbs.twimg.com/profile_images/1276718040764149760/IdNJk0hb.jpg' }, game: { id: 1, title: 'Patrol Duty' }, categories: [{ id: 1, name: '発作' }] }, { id: 2171, title: 'なむあみだぁぶつ', videoUrl: 'https://youtu.be/Tx3ApbqHfeE', detail: '個人的に1番おもろいと思ってる雑談。', endTime: 1425, startTime: 1291, createdAt: '2020-08-15T09:51:57.000+09:00', isAnonymous: false, likeCount: 146, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/Tx3ApbqHfeE/hqdefault.jpg', playCount: 1402, dynamicLink: 'https://yycollection.page.link/23QMFNA88TSUageS8', user: { id: 2791, name: 'るなるな', imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gju4cwzHIH7kCopoNy2BfViyK4axoKjzizcOLZlcw=s96-c' }, game: { id: 69, title: '生放送' }, categories: [{ id: 5, name: '雑談' }] }, { id: 2042, title: '突然の来客', videoUrl: 'https://www.youtube.com/watch?v=H2TGcLygTcM\u0026feature=share', detail: '小さい会話の中にも面白さが詰まっています', endTime: 358, startTime: 260, createdAt: '2020-08-13T12:52:39.000+09:00', isAnonymous: false, likeCount: 138, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/H2TGcLygTcM/hqdefault.jpg', playCount: 1844, dynamicLink: 'https://yycollection.page.link/dXQLSfyuWpuCKf5m7', user: { id: 1451, name: 'タカ@ガヤ民 ぷいきゅあ研修生', imageUrl: 'https://pbs.twimg.com/profile_images/1257222256230494214/9vyoRWh3.jpg' }, game: { id: 38, title: 'LOST EGG' }, categories: [{ id: 32, name: 'びっくり' }, { id: 2, name: 'コント' }] }, { id: 2056, title: '「バスビバーﾝスビバスビバン」', videoUrl: 'https://youtu.be/3mR9Lg3fK90', detail: '', endTime: 157, startTime: 132, createdAt: '2020-08-13T17:21:32.000+09:00', isAnonymous: false, likeCount: 128, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/3mR9Lg3fK90/hqdefault.jpg', playCount: 1197, dynamicLink: 'https://yycollection.page.link/oXwL8Wy7Wt9vdSPdA', user: { id: 1791, name: 'らっきょ。', imageUrl: 'https://pbs.twimg.com/profile_images/1307322353135706112/6bTxVWhZ.jpg' }, game: { id: 48, title: "Five Nights at Freddy's" }, categories: [{ id: 1, name: '発作' }] }, { id: 2128, title: '君はロックを聞かない', videoUrl: 'https://www.youtube.com/watch?v=Envk9KpadDE\u0026feature=share', detail: '', endTime: 1561, startTime: 1530, createdAt: '2020-08-14T13:45:44.000+09:00', isAnonymous: false, likeCount: 114, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/Envk9KpadDE/hqdefault.jpg', playCount: 916, dynamicLink: 'https://yycollection.page.link/VKBbZhtq2iAKdhdP7', user: { id: 2581, name: 'にぼし', imageUrl: 'https://pbs.twimg.com/profile_images/1263440823200309250/zRyn7UTl.jpg' }, game: { id: 86, title: 'BIOHAZARD RE:2' }, categories: [{ id: 6, name: '歌' }] }, { id: 2114, title: 'ヤメロヨォ！！！(クソデカボイス)', videoUrl: 'https://youtu.be/NvPDzuDA-u0', detail: '音量注意', endTime: 2651, startTime: 2607, createdAt: '2020-08-14T06:30:38.000+09:00', isAnonymous: false, likeCount: 96, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/NvPDzuDA-u0/hqdefault.jpg', playCount: 1318, dynamicLink: 'https://yycollection.page.link/3mRv24PUTM4UStHJ8', user: { id: 2231, name: '王白石', imageUrl: 'https://pbs.twimg.com/profile_images/1201254396522184704/dUMKeOkm.jpg' }, game: { id: 591, title: 'FALL GUYS ULTIMATE KNOCKOUT' }, categories: [{ id: 61, name: 'がんばり' }, { id: 161, name: 'ツボ' }, { id: 10, name: '生放送' }, { id: 36, name: '鼓膜破裂' }, { id: 20, name: '怒り' }] }, { id: 5421, title: 'アンダーザシー ', videoUrl: 'https://www.youtube.com/watch?v=_w5wq68eec8\u0026feature=share', detail: '生放送の方よりこっちの方が好きです', endTime: 1782, startTime: 1646, createdAt: '2020-09-06T23:39:21.000+09:00', isAnonymous: false, likeCount: 95, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/_w5wq68eec8/hqdefault.jpg', playCount: 945, dynamicLink: 'https://yycollection.page.link/TtQW6172Xaod1nMC7', user: { id: 16491, name: 'pickles', imageUrl: 'https://lh6.googleusercontent.com/-0i78bJvenwQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmUKaJwUXIN3odxDhmuaY5hIQtzRw/s96-c/photo.jpg' }, game: { id: 4, title: 'Two Point Hospital' }, categories: [{ id: 601, name: 'おもしろ' }, { id: 281, name: '楽しそうなわいわい' }, { id: 5, name: '雑談' }, { id: 421, name: '笑い' }, { id: 6, name: '歌' }] }, { id: 6371, title: '記憶に新しい、過去1笑ったシーン', videoUrl: 'https://www.youtube.com/watch?v=SjNj8B8p4Hc\u0026feature=share', detail: 'これ、堪えられる人いるの？笑笑', endTime: 1110, startTime: 1005, createdAt: '2020-09-07T04:37:07.000+09:00', isAnonymous: false, likeCount: 94, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/SjNj8B8p4Hc/hqdefault.jpg', playCount: 1215, dynamicLink: 'https://yycollection.page.link/WvGHPywyF5Ua7Qjf8', user: { id: 19611, name: 'ジョンソンボデーケア', imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png' }, game: { id: 1071, title: 'The Last of Us Part II' }, categories: [{ id: 15, name: 'ツッコミ' }, { id: 161, name: 'ツボ' }, { id: 21, name: '実況' }, { id: 11, name: '爆笑' }, { id: 421, name: '笑い' }] }, { id: 407, title: 'いえあ　だっくしーずん　ならぱぁんでぇす', videoUrl: 'https://youtu.be/FLvuJ-wk_t0', detail: 'ビブラート効いてるね', endTime: 1586, startTime: 1569, createdAt: '2020-01-18T09:23:00.000+09:00', isAnonymous: false, likeCount: 93, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/FLvuJ-wk_t0/hqdefault.jpg', playCount: 4129, dynamicLink: 'https://yycollection.page.link/djRGNCR56fXeaQtJA', user: { id: 116, name: 'Rちゃん', imageUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mAsYXsB87_RF2TGEh5oLvvnGqi7qKkkUDpsy0zqFDc' }, game: { id: 53, title: 'Duck Season' }, categories: [] }, { id: 6931, title: 'ちょ、なにしてんのって、なにしてんのって自分ら！', videoUrl: 'https://www.youtube.com/watch?v=ukWTmkD3gt0\u0026feature=share', detail: 'おいたんが焦る瞬間。\n初めて見たら笑い止まらなくなる', endTime: 604, startTime: 544, createdAt: '2020-09-07T12:26:32.000+09:00', isAnonymous: false, likeCount: 86, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/ukWTmkD3gt0/hqdefault.jpg', playCount: 746, dynamicLink: 'https://yycollection.page.link/Xbf9kDDzZQb8a3x5A', user: { id: 21381, name: 'たれぱんだ', imageUrl: 'https://lh4.googleusercontent.com/-GiDJTUgm7Nc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckK6UtsDtA504yuvwaEGrq1ZdrbUg/s96-c/photo.jpg' }, game: { id: 731, title: 'Knoddskogen' }, categories: [{ id: 15, name: 'ツッコミ' }] }] };

  const post = { id: 2046, title: 'フィル、うごめきます。', videoUrl: 'https://www.youtube.com/watch?v=e8i1gnsvqJE\u0026feature=share', detail: '飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!\n飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!飲み会で盛り上がるゲームの話題でほうれん草ゲームをするわいわいさん。ﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯﾎｳﾚﾝｿｯ!', endTime: 107, startTime: 90, createdAt: '2020-08-13T14:29:57.000+09:00', isAnonymous: true, likeCount: 218, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/e8i1gnsvqJE/hqdefault.jpg', playCount: 2248, dynamicLink: 'https://yycollection.page.link/8CgCsPyDQ8iT66uq9', user: { id: 117, name: 'меї', imageUrl: 'https://pbs.twimg.com/profile_images/1276718040764149760/IdNJk0hb.jpg' }, game: { id: 1, title: 'Patrol Duty' }, categories: [{ id: 1, name: '発作' }] };
  const loop = (r: any, second: number) => {
    r.player.seekTo(second, 'seconds');
  };
  return (
    <>
      {post && (
        <Helmet
          title="わいコレ | わいわいの動画共有SNS"
          meta={[
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: post.title },
            { name: 'twitter:description', content: post.detail },
            { name: 'twitter:image', content: post.thumbnailUrl },
            { property: 'og:title', content: post.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `https://yy-tube.com/post/${post.id}` },
            { property: 'og:image', content: post.thumbnailUrl },
            { property: 'og:description', content: post.detail },
          ]}
        />
      )}
      <Container width={window.windowDimensions.width}>
        <MainContentContainer width={`${window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH - 56}px`}>
          <YouTubePlayer
            ref={ref}
            controls
            width="100%"
            height={window.windowDimensions.width > 1700 ? `${(1700 - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px` : `${(window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px`}
            onStart={async () => {
            }}
            onEnded={async () => {
              loop(ref.current, post.startTime);
            }}
            url={post.videoUrl}
            youtubeConfig={{
              playerVars: {
                start: post.startTime,
                end: post.endTime,
              },
            }}
            playing
          />
          <CategoryGameContainer>
            <GameTitle>{post.game.title}</GameTitle>
            {post.categories.map((category: Category) => <CategoryName>{category.name}</CategoryName>)}

          </CategoryGameContainer>
          <Title>{post.title}</Title>
          <DetailContainer>
            <Detail>{post.detail}</Detail>
          </DetailContainer>
          <MetaContainer>
            <PlayCountAndDate>
              { post.playCount}
              回再生・
              {calculatePostDate(post.createdAt)}
            </PlayCountAndDate>
            <ShareAndLikeContainer>
              <LikeContainer>
                <LikeIcon />
                {post.likeCount}
              </LikeContainer>
              <ShareContainer>
                <ShareIcon />
                共有
              </ShareContainer>
            </ShareAndLikeContainer>
          </MetaContainer>
          <Devider />
          <OpenAppButtonContainer>
            <OpenAppButton>
              アプリで開く
            </OpenAppButton>
          </OpenAppButtonContainer>
        </MainContentContainer>
        <RandomPostListContainer>
          {
            posts.posts.map(p =>
              <RandomPostContainer>
                <SmallSizePostListItem post={p as any} />
              </RandomPostContainer>)}
        </RandomPostListContainer>
      </Container>
    </>
  );
};

export default Post;
