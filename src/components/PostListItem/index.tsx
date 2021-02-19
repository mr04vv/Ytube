import React from 'react';
import { Category } from 'entity/entity/category';
import { Post } from 'entity/entity/post';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { calculatePostDate } from 'utilities/calcuatePostDate';
import { convertPlayTime } from 'utilities/convertPlayTime';
import { useEnhancer } from './enhancer';
import { CategoryGameContainer, ThumbnailImageContainer, GameTitle, CategoryName, Container, Title, TimeContainer, ThumbnailImage, Time, MetaContainer, PlayCountAndDate, LikeContainer, LikeIcon, PlaceHolder } from './style';

interface Props {
  post: Post
}

export const PostListItem = ({ post }: Props) => {
  const playTime = convertPlayTime(post.endTime - post.startTime);
  const enhancer = useEnhancer();
  const window = useWindowDimensions();
  return (
    <Container>
      <ThumbnailImageContainer>
        <ThumbnailImage src={post.thumbnailUrl} onLoad={() => enhancer.setLoaded(true)} loaded={enhancer.loaded} />
        <PlaceHolder loaded={enhancer.loaded} width={window.windowDimensions.width} splitSize={window.splitSize} />
        <TimeContainer><Time>{playTime}</Time></TimeContainer>
      </ThumbnailImageContainer>
      <CategoryGameContainer>
        <GameTitle>{post.game?.title}</GameTitle>
        {post.categories?.map((category: Category) => <CategoryName key={`category_name_${category.id}`}>{category.name}</CategoryName>)}
      </CategoryGameContainer>
      <Title>{post.title}</Title>
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
    </Container>);
};
