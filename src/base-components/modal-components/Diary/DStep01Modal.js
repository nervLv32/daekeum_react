import React, { useState } from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";

const ModalWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 70vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 10px -4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
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
    padding: 15px 30px;
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
        height: 1px;
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
          width: 8px;
          height: 3px;
          background-color: #f7f7f7;
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          width: 8px;
          height: 3px;
          background-color: #f7f7f7;
          position: absolute;
          left: -8px;
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
            border: 2px solid #A9B5FF;
          }
        }
      }
    }
  }
  .modal-body {
    padding: 30px 30px 25px;
    dl {
      width: 100%;
      height: auto;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      dt {
        font-size: 1.1rem;
        font-weight: 500;
        color: #1c1b1f;
        margin-bottom: 0.4rem;
      }
      dd {
        width: 100%;
        height: auto;
        input {
          width: 100%;
          height: 3.3rem;
          background: #fff;
          border: 1px solid #8885CB;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: 500;
          color: #1c1b1f;
          padding: 0 1.5rem;
        }
      }
    }
  }
`

const DStep01Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'DStep01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 출고요청서(세륜, 축중) 케이스의 첫번째 *******/
  return (
    <ModalWrap>
      <div className="title">
        <h3>일지작성</h3>
      </div>
      <div className="step-list">
        <ul>
          <li>
            <span className="on">1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span>4</span>
          </li>
        </ul>
      </div>
      <div className="modal-body">
        <dl>
          <dt className="essential">일지번호</dt>
          <dd>
            <input type="text" />
          </dd>
        </dl>
        <dl>
          <dt className="essential">장비정보</dt>
          <dd>
            <label>
              <input type="text" />
              <button type="button">
                <i></i>
                <span>장비검색</span>
              </button>
            </label>
          </dd>
        </dl>
      </div>
    </ModalWrap>
  )
}

export default DStep01Modal;