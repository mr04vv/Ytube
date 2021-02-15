import { Category } from 'entity/entity/category';
import { Post } from 'entity/entity/post';
import React from 'react';
import { calculatePostDate } from 'utilities/calcuatePostDate';
import { convertPlayTime } from 'utilities/convertPlayTime';
import { CategoryGameContainer, ThumbnailImageContainer, GameTitle, CategoryName, Container, Title, TimeContainer, ThumbnailImage, Time, MetaContainer, PlayCountAndDate, LikeContainer, LikeIcon, PostInfoContainer } from './style';

interface Props {
  post: Post
}

export const SmallSizePostListItem = ({ post }: Props) => {
  const playTime = convertPlayTime(post.endTime - post.startTime);
  return (
    <Container>
      <ThumbnailImageContainer>
        <ThumbnailImage src={post.thumbnailUrl} />
        <TimeContainer><Time>{playTime}</Time></TimeContainer>
      </ThumbnailImageContainer>
      <PostInfoContainer>
        <div>
          <CategoryGameContainer>
            <GameTitle>{post.game?.title}</GameTitle>
            {post.categories?.map((category: Category) => <CategoryName>{category.name}</CategoryName>)}

          </CategoryGameContainer>
          <Title>{post.title}</Title>
        </div>
        <MetaContainer>
          <PlayCountAndDate>
            { post.playCount}
            回再生・
            {calculatePostDate(post.createdAt)}
          </PlayCountAndDate>
          <LikeContainer>
            <LikeIcon />
            {post.likeCount}
          </LikeContainer>
        </MetaContainer>
      </PostInfoContainer>
    </Container>);
};
