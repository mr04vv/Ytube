import * as React from 'react';
import ReactPlayer from 'react-player';
import { CardHeader, Avatar, IconButton, CardContent, Typography, CardActions } from '@material-ui/core';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

const Top = () => {
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];
  const [isPlaying, setIsPlaying] = React.useState<boolean[]>([false, false, false]);
  const loop = (r: any, second: number) => {
    r.player.seekTo(second, 'seconds');
  };
  return (
    <Container>
      <div>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title="あっくん@ガヤ民"
          subheader="2019/10/03 10:02"
        />
        <ReactPlayer
          width="100%"
          height={window.innerWidth < 420 ? '300px' : '500px'}
          ref={refs[0]}
          controls
          onEnded={() => loop(refs[0].current, 986)}
          url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=300s"
          youtubeConfig={{
            playerVars: {
              start: 986,
              end: 992,
            },
          }}
          onPlay={() => setIsPlaying([true, false, false])}
          playing={isPlaying[0]}
        />
        <CustomCardContent>
          <Typography gutterBottom component="h4">
            太陽めーっけ
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            太陽みーっけ♪太陽めーっけ♪
          </Typography>
        </CustomCardContent>
        <CardActionContainer>
          <CustomCardAction>
            <CustomIconButton aria-label="add to favorites">
              <FavoriteIcon width="3px" fontSize="small" />
            </CustomIconButton>
            <CustomIconButton aria-label="add to favorites">
              <PlaylistAdd />
            </CustomIconButton>
          </CustomCardAction>
        </CardActionContainer>
        <Hr />
      </div>
      <div>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title="あっくん@ガヤ民"
          subheader="2019/10/03 10:02"
        />
        <ReactPlayer
          width="100%"
          height={window.innerWidth < 420 ? '300px' : '500px'}
          controls
          onPlay={() => setIsPlaying([false, true, false])}
          playing={isPlaying[1]}
          ref={refs[1]}
          onEnded={() => loop(refs[1].current, 1133)}
          url="https://www.youtube.com/watch?v=2RXTJoGYCWI"
          youtubeConfig={{ playerVars: { start: 1133, end: 1150 } }}
        />
        <CustomCardContent>
          <Typography gutterBottom component="h4">
            ﾄﾞｩｰﾄﾞｩﾙﾄﾞｩﾄﾞｩｯﾄﾞｩ♪
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ゎ・ゎ・ゎ・ゎ♪
          </Typography>
        </CustomCardContent>
        <CardActionContainer>
          <CustomCardAction>
            <CustomIconButton aria-label="add to favorites">
              <FavoriteIcon width="3px" fontSize="small" />
            </CustomIconButton>
            <CustomIconButton aria-label="add to favorites">
              <PlaylistAdd />
            </CustomIconButton>
          </CustomCardAction>
        </CardActionContainer>
        <Hr />
      </div>
      <div>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title="あっくん@ガヤ民"
          subheader="2019/10/03 10:02"
        />
        <ReactPlayer
          width="100%"
          height={window.innerWidth < 420 ? '300px' : '500px'}
          controls
          playing={isPlaying[2]}
          onPlay={() => setIsPlaying([false, false, true])}
          ref={refs[2]}
          onEnded={() => loop(refs[2].current, 1028)}
          url="https://www.youtube.com/watch?v=LjzlxjgO70o"
          youtubeConfig={{ playerVars: { start: 1028, end: 1051 } }}
        />
        <CustomCardContent>
          <Typography gutterBottom component="h4">
            詰んだ逃走犯
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            逃げる気まったくないｗｗ
          </Typography>
        </CustomCardContent>
        <CardActionContainer>
          <CustomCardAction>
            <CustomIconButton aria-label="add to favorites">
              <FavoriteIcon width="3px" fontSize="small" />
            </CustomIconButton>
            <CustomIconButton aria-label="add to favorites">
              <PlaylistAdd />
            </CustomIconButton>
          </CustomCardAction>
        </CardActionContainer>
        <Hr />
      </div>
    </Container>
  );
};

export default Top;

const Hr = styled.hr`
  border-width: 1px;
  border-color: #a5a5a5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto 100px;
  max-width: 800px;
`;

const CardActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomCardAction = styled(CardActions as React.SFC)`
  display: flex;
  justify-content: space-around;
  width: 400px;
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
`;

const CustomCardContent = styled(CardContent as React.SFC)`
  padding-bottom: 0;
`;
