/* eslint-disable no-console */
import {
  useState,
} from 'react';


const usePost = () => {
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('0');
  const [url, setUrl] = useState<string>('');
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentError, setCommentError] = useState<string>('');
  const [game, setGame] = useState<any>(10);

  const setStart = (r: any) => {
    if (r.player) {
      setStartTime(r.player.getCurrentTime());
    }
  };

  const setEnd = (r: any) => {
    if (r.player) {
      setEndTime(r.player.getCurrentTime());
    }
  };

  const next = () => {
    setTabIndex(1);
  };

  const post = () => {

  };


  return {
    startTime,
    endTime,
    url,
    setUrl,
    setStart,
    setEnd,
    tabIndex,
    setTabIndex,
    next,
    error,
    setError,
    title,
    comment,
    setTitle: (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    titleError,
    setComment: (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    },
    commentError,
    game,
    setGame,
  };
};

export default usePost;
