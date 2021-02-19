import React from 'react';
import Help1 from 'assets/help.png';
import Help2 from 'assets/help2.png';
import Help3 from 'assets/help3.png';
import Help4 from 'assets/help4.png';
import { Container, CustomModal, Explain, HelpImage, HelpSmallImage, Title } from './style';

interface Props {
  setIsOpen: (v: boolean) => void
  isOpen: boolean

}

export const HelpModal: React.FC<Props> = ({ setIsOpen, isOpen }) => (
  <CustomModal
    ariaHideApp={false}
    onRequestClose={() => setIsOpen(false)}
    isOpen={isOpen}
    style={{
      overlay: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(165, 165, 165, 0.2)',
        overflow: 'auto',
      },
    }}
  >

    <Container>
      <Title>投稿のしかた</Title>
      <Explain>YouTube動画のURLをコピーします</Explain>
      <HelpImage src={Help1} />
      <Explain>
        わいコレ投稿画面にコピーしたURLを貼り付けて、シーンの開始時間、終了時間、タイトル、コメントやキーワード(任意)を
        入力します。匿名で投稿したい場合は”匿名で投稿する”にチェックをします。
      </Explain>
      <HelpSmallImage src={Help2} />
      <Explain>
        投稿するシーンに該当する、カテゴリとゲームタイトルを選択します。
      </Explain>
      <HelpSmallImage src={Help3} />
      <Explain>
        カテゴリやゲームがない場合は選択画面から追加できます。
      </Explain>
      <HelpSmallImage src={Help4} />
    </Container>
  </CustomModal>
);
