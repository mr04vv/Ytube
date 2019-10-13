import styled from 'styled-components';

const Info = styled.p`
  margin: 4px;
  width: 80%;
  text-align: center;
`;

const FooterContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 20px auto 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2;
`;

const Container = styled.div`
  margin: 80px auto 80px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Explain = styled.p`
  width: 80%;
  margin: 20px auto;
  text-align: center;
  font-weight: bold;
`;

const Title = styled.p`
  margin: 30px 0 0;
  font-size: 20px;
`;

const SNSLink = styled.a`
  margin: 2px 0;
`;

const Text = styled.div`
  margin: 10px;
  font-size: 18px;
`;

const Attention = styled.p`
  margin-top: 20px;
  font-size: 10px;
  color: #a5a5a5;
`;

const Share = styled.div`
  margin: 0px;
  font-size: 18px;
`;

export {
  Title, Container, Explain, Info, FooterContainer, SNSLink, Attention, Share, Text,
};
