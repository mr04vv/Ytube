import styled from 'styled-components';
import React from 'react';
import { Accordion, AccordionProps, AccordionSummary } from '@material-ui/core';
import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT } from 'constants/colors';

export const Container = styled.div`
  margin: 80px 16px;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    margin-top: 170px;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    padding-top: 20px;
  }
`;

export const CustomExpantionPanel = styled(Accordion as React.FC<AccordionProps>)`
  &.MuiPaper-elevation1 {
    box-shadow: unset;
  }
  &.MuiExpansionPanel-root {
    position: unset;
  }
  text-align: 'right';
`;

interface Props {
  width: number;
  splitSize: number;
  }

export const PostListItemContainer = styled.div<Props>`
  width: calc(${(props) => props.width}px / ${(props) => props.splitSize} + 25px);
  min-width: calc(${(props) => props.width}px / 5);
  margin: 18px 0;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const SmallPostListItemContainer = styled.div`
  min-width: 230px;
  margin: 2px 0;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const CustomExpansionPanelSummary = styled(AccordionSummary)`
  .MuiExpansionPanelSummary-expandIcon {
    order: -1;
    margin-right: 2px;
  }
  color: ${COLOR_MAIN_TEXT};
  font-size: 14px;
`;

export const Divider = styled.div`
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
  margin: 4px 14px 0 14px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
`;

export const NotFoundContainer = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
  flex-direction: column;
`;
