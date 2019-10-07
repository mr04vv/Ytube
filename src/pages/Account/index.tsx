import React from 'react';
import AccountCircle from '@material-ui/icons/PermIdentityTwoTone';
import useMyInfo from 'hooks/User/useMyInfo';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import useFetchPost from 'hooks/Post/useFetchPost';
import PostList from 'components/PostList';
import {
  Container, CustomAvater, ProfileContainer, UserInfoContainer, UserName,
} from './styles';

const Account = () => {
  const info = useMyInfo();
  const post = useFetchPost();
  window.scrollTo(0, 0);

  return (
    <>
      <Container>
        {info.isLoading ? <div>loading</div> : (
          <ProfileContainer>
            <CustomAvater aria-label="recipe" src={info.userInfo!.imageUrl}>
              <AccountCircle fontSize="large" />
            </CustomAvater>
            <UserInfoContainer>
              <UserName>
                {info.userInfo!.name}
              </UserName>
              <CustomButton size="small" variant="contained" color="primary" onClick={() => info.logout()}>ログアウト</CustomButton>
            </UserInfoContainer>
          </ProfileContainer>
        )}
      </Container>
      <PostList
        posts={post.posts}
        isLoading={post.isLoading}
        hasNext={post.hasNext}
        hasPrev={post.hasPrev}
        page={post.page}
        next={post.next}
        prev={post.prev}
      />
    </>
  );
};

export default Account;

const CustomButton = styled(Button)`
  text-transform: unset;
  background-color: #ffe62b;
  border-radius: 0;
  color: black;
  width: 120px;
  box-shadow: unset;
  :hover {
    background-color: #ffe62b;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;
