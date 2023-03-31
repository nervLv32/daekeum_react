import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import modalState from "../../recoil/modalState";



const modalStringList = {
  // 모달 타입  만들기
};

const modalComponentList = [
  {
    title: "공지사항",
    component: null,
  },
  {
    title: "도움말",
    component: null,
  },
  {
    title: "개발히스토리",
    component: null,
  },
  {
    title: "시스템스펙",
    component: null,
  },
];

const ModalWrapStyled = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  animation: popup 0.3s linear;
`;

const CloseModalStyled = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  right: 24px;
  top: 12px;
  position: absolute;
  z-index: 1;
`;

const ModalCardStyled = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.1);
`;

const ModalDetailsStyled = styled.div`
  height: calc(100% - 48px);
  position: relative;
  /* top: 32px; */
  overflow: auto;
  padding: 16px;
`;

const TitModalStyled = styled.div`
  height: 48px;
  padding-left: 16px;
  /* background-color: var(--color-point); */
  background-color: #555;
`;

const GlobalModalComponent = () => {

  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const { isOpen } = modalDataState
  const { closeModal } = useModal();

  if (!isOpen) return <></>;

  const getModalTitle = () => {
    console.log(1)
  }

  const getModalComponent = () => {
    console.log(2);
  }
  return (
    <ModalWrapStyled onClick={closeModal}>
      <ModalCardStyled>
        <TitModalStyled>
        {getModalTitle()}
        </TitModalStyled>
        <CloseModalStyled onClick={closeModal}>
          x마크
        </CloseModalStyled>
        <ModalDetailsStyled>{getModalComponent()}</ModalDetailsStyled>
      </ModalCardStyled>
    </ModalWrapStyled>
  );
};

export default GlobalModalComponent;
