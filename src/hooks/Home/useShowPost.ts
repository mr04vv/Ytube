/* eslint-disable no-console */
import React, {
  useState, useEffect,
} from 'react';

const useShowPost = () => {
  const [refs] = useState<any[]>([React.useRef(null)].fill(React.useRef(null), 0, 9));


  return {
    // posts,
  };
};

export default useShowPost;
