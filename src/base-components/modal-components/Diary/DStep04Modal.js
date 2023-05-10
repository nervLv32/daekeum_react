import React, { useState } from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep03Modal from './DStep03Modal'
import DStep05Modal from './DStep05Modal'

const ModalWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 70vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 1rem -0.4rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 2rem 2rem 0px 0px;
  .title {
    padding: 1.5rem 0;
    text-align: center;
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1c1b1f;
    }
  }
  .step-list {
    background-color: #f7f7f7;
    padding: 1.5rem 3rem;
    ul {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 0.1rem;
        background-color: #9da2ae;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      li {
        position: relative;
        z-index: 9;
        &::before {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          right: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          left: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          display: block;
          width: 1.8rem;
          height: 1.8rem;
          line-height: 1.8rem;
          border-radius: 50%;
          background: #9da2ae;
          text-align: center;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          &.on {
            box-sizing: content-box;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
            border: 0.2rem solid #A9B5FF;
          }
        }
      }
    }
  }
  .modal-body {
    padding: 3rem 3rem 2.5rem;
    
  }
`

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1.7rem 3rem;
  background: #F7F7F7;
  border-radius: 2rem 2rem 0px 0px;
  button {
    width: calc(50% - 0.5rem);
    height: 3.4rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    &.btn-outline-gray {
      color: #1F319D;
      background: #FFFFFF;
      border: 0.1rem solid #9DA2AE;
    }
    &.btn-blue {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      color: #f7f7f7;
    } 
  }
`

const DStep04Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'DStep04Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  return (
    <ModalWrap>
      <div className="title">
        <h3>일지작성</h3>
      </div>
      <div className="step-list">
        <ul>
          <li>
            <span>1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span className="on">4</span>
          </li>
        </ul>
      </div>
      <div className="modal-body">
        <div className="">
          <label className="all-check">
            <input type="checkbox" />
            <span>전체선택</span>
          </label>
          <div className="btn-wrap">
            <button type="button" className="btn-outline-gray">선택삭제</button>
            <button type="button" className="btn-blue">품목추가</button>
          </div>
        </div>
        <div className="info-wrap">
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
      <BtnWrap>
        <button 
          type="button" 
          className="btn-outline-gray"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep03Modal /> })
          }}
        >이전</button>
        <button 
          type="button" 
          className="btn-blue"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep05Modal /> })
          }}
        >다음</button>
      </BtnWrap>
    </ModalWrap>
  )
}

export default DStep04Modal;