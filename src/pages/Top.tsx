import * as React from 'react';
import ReactPlayer from 'react-player';

const Top = () => (
  <div>
    わいわいの好きなシーンを共有しよう！
    <div>
      <ReactPlayer
        width="100%"
        url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s"
        youtubeConfig={{ playerVars: { end: 992 } }}
      />
      <ReactPlayer
        width="100%"
        url="https://www.youtube.com/watch?v=haJOSvjughw&t=805s"
        youtubeConfig={{ playerVars: { end: 820 } }}
      />
      <ReactPlayer width="100%" url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" />
      <ReactPlayer width="100%" url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" />
      <ReactPlayer width="100%" url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" />

      {/* <ReactPlayer url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" /> */}
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" /> */}
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" /> */}
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" /> */}
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=b8M2TwcHqfs&t=986s" /> */}
    </div>
  </div>
);

export default Top;
