import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const Container = styled.div`
  margin: 80px auto 0;
  max-width: 500px;
`;

const ProfileContainer = styled.div`
  align-items: center;
  margin: 0 auto;
  max-width: 250px;
  display: flex;
  justify-content: space-around;
`;
const CustomAvater = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

const UserInfoContainer = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserName = styled.p`
  margin: 0;
  font-size: 15px;
  width: 'fit-content';
`;

export {
  Container, CustomAvater, ProfileContainer, UserInfoContainer, UserName,
};
