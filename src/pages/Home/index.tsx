import * as React from 'react';

import { PostListItem } from 'components/PostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { TuneOutlined } from '@material-ui/icons';
import {
  Container,
  CustomExpansionPanelSummary,
  CustomExpantionPanel,

  Devider,

  OrderContainer,

  OrderItem,

  PostContainer,

  PostListItemContainer,
  SmallPostListItemContainer,
} from './styles';

const Home = () => {
  // const modalOpen = usePostModal();
  // const master = useMasterData();
  // const post = useFetchPost(master.categoryMaster, master.gameMaster);
  // const info = useMyInfo();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const window = useWindowDimensions();
  console.debug(window.splitSize);

  const posts = { posts: [{ id: 2171, title: 'なむあみだぁぶつ', videoUrl: 'https://youtu.be/Tx3ApbqHfeE', detail: '個人的に1番おもろいと思ってる雑談。', endTime: 1425, startTime: 1291, createdAt: '2020-08-15T09:51:57.000+09:00', isAnonymous: false, likeCount: 146, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/Tx3ApbqHfeE/hqdefault.jpg', playCount: 1402, dynamicLink: 'https://yycollection.page.link/23QMFNA88TSUageS8', user: { id: 2791, name: 'るなるな', imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gju4cwzHIH7kCopoNy2BfViyK4axoKjzizcOLZlcw=s96-c' }, game: { id: 69, title: '生放送' }, categories: [{ id: 5, name: '雑談' }] }, { id: 2042, title: '突然の来客', videoUrl: 'https://www.youtube.com/watch?v=H2TGcLygTcM\u0026feature=share', detail: '小さい会話の中にも面白さが詰まっています', endTime: 358, startTime: 260, createdAt: '2020-08-13T12:52:39.000+09:00', isAnonymous: false, likeCount: 138, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/H2TGcLygTcM/hqdefault.jpg', playCount: 1844, dynamicLink: 'https://yycollection.page.link/dXQLSfyuWpuCKf5m7', user: { id: 1451, name: 'タカ@ガヤ民 ぷいきゅあ研修生', imageUrl: 'https://pbs.twimg.com/profile_images/1257222256230494214/9vyoRWh3.jpg' }, game: { id: 38, title: 'LOST EGG' }, categories: [{ id: 32, name: 'びっくり' }, { id: 2, name: 'コント' }] }, { id: 2056, title: '「バスビバーﾝスビバスビバン」', videoUrl: 'https://youtu.be/3mR9Lg3fK90', detail: '', endTime: 157, startTime: 132, createdAt: '2020-08-13T17:21:32.000+09:00', isAnonymous: false, likeCount: 128, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/3mR9Lg3fK90/hqdefault.jpg', playCount: 1197, dynamicLink: 'https://yycollection.page.link/oXwL8Wy7Wt9vdSPdA', user: { id: 1791, name: 'らっきょ。', imageUrl: 'https://pbs.twimg.com/profile_images/1307322353135706112/6bTxVWhZ.jpg' }, game: { id: 48, title: "Five Nights at Freddy's" }, categories: [{ id: 1, name: '発作' }] }, { id: 2128, title: '君はロックを聞かない', videoUrl: 'https://www.youtube.com/watch?v=Envk9KpadDE\u0026feature=share', detail: '', endTime: 1561, startTime: 1530, createdAt: '2020-08-14T13:45:44.000+09:00', isAnonymous: false, likeCount: 114, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/Envk9KpadDE/hqdefault.jpg', playCount: 916, dynamicLink: 'https://yycollection.page.link/VKBbZhtq2iAKdhdP7', user: { id: 2581, name: 'にぼし', imageUrl: 'https://pbs.twimg.com/profile_images/1263440823200309250/zRyn7UTl.jpg' }, game: { id: 86, title: 'BIOHAZARD RE:2' }, categories: [{ id: 6, name: '歌' }] }, { id: 2114, title: 'ヤメロヨォ！！！(クソデカボイス)', videoUrl: 'https://youtu.be/NvPDzuDA-u0', detail: '音量注意', endTime: 2651, startTime: 2607, createdAt: '2020-08-14T06:30:38.000+09:00', isAnonymous: false, likeCount: 96, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/NvPDzuDA-u0/hqdefault.jpg', playCount: 1318, dynamicLink: 'https://yycollection.page.link/3mRv24PUTM4UStHJ8', user: { id: 2231, name: '王白石', imageUrl: 'https://pbs.twimg.com/profile_images/1201254396522184704/dUMKeOkm.jpg' }, game: { id: 591, title: 'FALL GUYS ULTIMATE KNOCKOUT' }, categories: [{ id: 61, name: 'がんばり' }, { id: 161, name: 'ツボ' }, { id: 10, name: '生放送' }, { id: 36, name: '鼓膜破裂' }, { id: 20, name: '怒り' }] }, { id: 5421, title: 'アンダーザシー ', videoUrl: 'https://www.youtube.com/watch?v=_w5wq68eec8\u0026feature=share', detail: '生放送の方よりこっちの方が好きです', endTime: 1782, startTime: 1646, createdAt: '2020-09-06T23:39:21.000+09:00', isAnonymous: false, likeCount: 95, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/_w5wq68eec8/hqdefault.jpg', playCount: 945, dynamicLink: 'https://yycollection.page.link/TtQW6172Xaod1nMC7', user: { id: 16491, name: 'pickles', imageUrl: 'https://lh6.googleusercontent.com/-0i78bJvenwQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmUKaJwUXIN3odxDhmuaY5hIQtzRw/s96-c/photo.jpg' }, game: { id: 4, title: 'Two Point Hospital' }, categories: [{ id: 601, name: 'おもしろ' }, { id: 281, name: '楽しそうなわいわい' }, { id: 5, name: '雑談' }, { id: 421, name: '笑い' }, { id: 6, name: '歌' }] }, { id: 6371, title: '記憶に新しい、過去1笑ったシーン', videoUrl: 'https://www.youtube.com/watch?v=SjNj8B8p4Hc\u0026feature=share', detail: 'これ、堪えられる人いるの？笑笑', endTime: 1110, startTime: 1005, createdAt: '2020-09-07T04:37:07.000+09:00', isAnonymous: false, likeCount: 94, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/SjNj8B8p4Hc/hqdefault.jpg', playCount: 1215, dynamicLink: 'https://yycollection.page.link/WvGHPywyF5Ua7Qjf8', user: { id: 19611, name: 'ジョンソンボデーケア', imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png' }, game: { id: 1071, title: 'The Last of Us Part II' }, categories: [{ id: 15, name: 'ツッコミ' }, { id: 161, name: 'ツボ' }, { id: 21, name: '実況' }, { id: 11, name: '爆笑' }, { id: 421, name: '笑い' }] }, { id: 407, title: 'いえあ　だっくしーずん　ならぱぁんでぇす', videoUrl: 'https://youtu.be/FLvuJ-wk_t0', detail: 'ビブラート効いてるね', endTime: 1586, startTime: 1569, createdAt: '2020-01-18T09:23:00.000+09:00', isAnonymous: false, likeCount: 93, alreadyLiked: null, thumbnailUrl: 'https://i.ytimg.com/vi/FLvuJ-wk_t0/hqdefault.jpg', playCount: 4129, dynamicLink: 'https://yycollection.page.link/djRGNCR56fXeaQtJA', user: { id: 116, name: 'Rちゃん', imageUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mAsYXsB87_RF2TGEh5oLvvnGqi7qKkkUDpsy0zqFDc' }, game: { id: 53, title: 'Duck Season' }, categories: [] }] };
  const dummyLength = (window.splitSize - 1) - (posts.posts.length % (window.splitSize - 1));
  return (
    <Container>
      <CustomExpantionPanel expanded={isExpanded}>
        <CustomExpansionPanelSummary
          onClick={() => { setIsExpanded(!isExpanded); }}
          expandIcon={<TuneOutlined />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          並べ替え
        </CustomExpansionPanelSummary>
        <OrderContainer>
          <OrderItem selected>投稿が新しい順</OrderItem>
          <OrderItem selected={false}>いいねが多い順</OrderItem>
          <OrderItem selected={false}>投稿が古い順</OrderItem>
          <OrderItem selected={false}>再生回数が多い順</OrderItem>

        </OrderContainer>
      </CustomExpantionPanel>
      <Devider />
      <PostContainer>
        {window.windowDimensions.width > 480 ?
          <>
            {posts.posts.map(post =>
              <PostListItemContainer width={window.windowDimensions.width} splitSize={window.splitSize}>
                <PostListItem post={post as any} />
              </PostListItemContainer>)}
            {[...Array(dummyLength)].map(() => <PostListItemContainer width={window.windowDimensions.width} splitSize={window.splitSize} />)}
          </>
          :
          posts.posts.map(post =>
            <SmallPostListItemContainer>
              <SmallSizePostListItem post={post as any} />
            </SmallPostListItemContainer>)}
      </PostContainer>
    </Container>
  /* <SearchContainer>
        <FormControl
          fullWidth
          style={{
            minWidth: '100%',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <SearchTextField
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.keyCode === 13) {
                post.doSearch({});
                setIsExpanded(false);
              }
            }}
            label="フリーワード検索"
            onChange={(e: any) => post.setSearchWord(e.target.value)}
            value={post.searchWord}
          />
          <SearchButton
            onClick={() => {
              post.doSearch({});
              setIsExpanded(false);
            }}
          >
            <SearchOutlined />
          </SearchButton>
        </FormControl>
        <CustomExpantionPanel expanded={isExpanded}>
          <ExpansionPanelSummary
            onClick={() => setIsExpanded(!isExpanded)}
            expandIcon={<TuneOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ marginLeft: 'auto', marginRight: '0px', fontSize: '14px' }}>
              条件を絞って検索
            </Typography>
          </ExpansionPanelSummary>
          <CustomSearchContainer>
            <FormControl fullWidth style={{ width: '100%' }}>
              <InputLabel>ゲームタイトル</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchGameTitle}
                onChange={(e: any) => {
                  post.setSearchGames(e.target.value);
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {master.searchGameMaster.map((game: GameInterface) => (
                  <MenuItem key={game.title} value={game.title}>
                    <ListItemText primary={game.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ width: '100%', marginTop: '10px' }}>
              <InputLabel>カテゴリ</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchCategoryName}
                onChange={(e: any) => {
                  post.setSearchCategories(e.target.value);
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {master.searchCategoryMaster.map((category: CategoryInterface) => (
                  <MenuItem key={category.name} value={category.name}>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ width: '100%', margin: '10px auto' }}>
              <InputLabel>並び替え</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchOrder}
                onChange={(e: any) => {
                  post.setSearchOrder(parseInt(e.target.value, 10));
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {post.orderMaster.map((order: OrderInterface) => (
                  <MenuItem key={order.name} value={order.id}>
                    <ListItemText primary={order.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomSearchButton
              onClick={() => {
                post.doSearch({});
                setIsExpanded(false);
              }}
            >
              検索
            </CustomSearchButton>
          </CustomSearchContainer>
        </CustomExpantionPanel>
        {info.isLoading && <CircularProgress style={{ margin: '30vh auto', display: 'block' }} />}
      </SearchContainer>
      <PostList
        path="home"
        posts={post.posts}
        isLoading={post.isLoading}
        hasNext={post.hasNext}
        hasPrev={post.hasPrev}
        page={post.page}
        next={post.next}
        prev={post.prev}
        per={post.per}
        master={master}
        hasController
        place="home"
      />
      {info.loginStatus === 'success' && (
        <Container>
          <CustomFab onClick={() => modalOpen.setIsOpen(true)}>
            <AddIcon />
          </CustomFab>
          <PostModal
            isOpen={modalOpen.isOpen}
            closeModal={() => modalOpen.setIsOpen(false)}
            master={master}
            page={post.page}
            per={post.per}
          />
        </Container>
      )} */
  );
};

export default Home;
