import styled from 'styled-components'
import {BlueCircleBag, BlueCircleClock, RightArrow} from '../../assets/icon/Svg'
import DStep01Modal from '../../base-components/modal-components/Diary/DStep01Modal'
import React from 'react'
import {useModal} from '../../hooks/useModal'
import SaleAddNewModal from '../../base-components/modal-components/sale/SaleAddNewModal'

const ModalBody = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  border: 2px solid #0129FF;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
`
const Content = styled.div`
  padding: 20px 30px;
  >div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    >svg {
    }
    p{
      align-self: center;
      display: inline-block;
      margin-left: 1rem;
      margin-right: 3rem;
      font-size: 13pt;
    }
  }
  hr {
    clear: both;
    margin: 1.5rem 0;
  }
`
const Button = styled.button`
  width: 100%;
  height: 40px;
  background: var(--sky, #EFF2FF);

`

const ReceiptConfirm = () => {
  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };

  return<ModalBody>
    <Content>
      <div onClick={() => {
        openModal({ ...modalData, content: <DStep01Modal /> })
      }}>
        <BlueCircleClock />
        <p>사후등록</p>
        <RightArrow />
      </div>
      <hr/>
      <div onClick={() => {
        openModal({ ...modalData, content: <SaleAddNewModal item={''} /> })
      }}>
        <BlueCircleBag />
        <p>영업등록</p>
        <RightArrow />
      </div>
    </Content>
    <Button onClick={closeModal}>닫기</Button>
  </ModalBody>
}

export default ReceiptConfirm