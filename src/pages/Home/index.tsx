import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import usePostModal from 'hooks/Post/usePostModal';
import { CustomFab, Container } from './styles';
import PostModal from './PostModal';

const Home = () => {
  const modalOpen = usePostModal();
  return (
    <Container>
      <CustomFab onClick={() => modalOpen.setIsOpen(true)}>
        <AddIcon />
      </CustomFab>
      <PostModal isOpen={modalOpen.isOpen} closeModal={() => modalOpen.setIsOpen(false)} />
    </Container>
  );
};

export default Home;
