import React from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TwContainer, TwitterButton, TwitterFollowA } from './style';

// eslint-disable-next-line import/prefer-default-export
export const Twemb = () => (
  <TwContainer>
    <TwitterButton>
      <TwitterFollowA
        target="_blank"
        href="https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3300%2Fhome&ref_src=twsrc%5Etfw&region=follow_link&screen_name=ytube_newpost&tw_p=followbutton"
        data-show-count="false"
      >
        <FontAwesomeIcon size="lg" icon={faTwitter} color="white" />
        {'\t'}
        わいコレ公式アカウントをフォロー
      </TwitterFollowA>
    </TwitterButton>
  </TwContainer>
);
