import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import usePostModal from 'hooks/Post/usePostModal';
import PostList from 'components/PostList';
import useFetchPost from 'hooks/Post/useFetchPost';
import useMyInfo from 'hooks/User/useMyInfo';
import { CustomFab, Container } from './styles';
import PostModal from './PostModal';

const Home = () => {
  const modalOpen = usePostModal();
  const post = useFetchPost();
  const info = useMyInfo();

  return (
    <>
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
        hasController
      />
      {info.loginStatus === 'success' && (
        <Container>
          <CustomFab onClick={() => modalOpen.setIsOpen(true)}>
            <AddIcon />
          </CustomFab>
          <PostModal isOpen={modalOpen.isOpen} closeModal={() => modalOpen.setIsOpen(false)} />
        </Container>
      )}
    </>
  );
};

export default Home;
