import React, { useState } from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep03Modal from './DStep03Modal'
import DStep05Modal from './DStep05Modal'
import ProductInfo from "../../../components/diary/ProductInfo";

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
    .product-list-wrap {
      padding: 3rem;
      .add-ons {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1.5rem;
        padding-left: 1.3rem;
        .all-check {
          display: flex;
          align-items: center;
          input[type="checkbox"] {
            width: 1.5rem;
            height: 1.5rem;
            background: #FFFFFF;
            border: 0.1rem solid #9DA2AE;
            border-radius: 0.3rem;
            box-sizing: border-box;
            margin: 0;
            position: relative;
            z-index: 9;
            cursor: pointer;
            &::after {
              content: '';
              display: block;
              width: 1.3rem;
              height: 1.3rem;
              background: url('../../icons/icon-check-off.png') no-repeat center / cover;
              position: absolute;
              left: 0;
              top: 0;
              z-index: -1;
              border-radius: 0.3rem;
            }
            &:checked {
              &::after {
                background: url('../../icons/icon-check-on.png') no-repeat center / cover #1F319D;
              }
            }
          }
          span {
            display: inline-block;
            font-size: 1.1rem;
            font-weight: 500;
            color: #555;
            margin-left: 0.9rem;
          }
        }
        .btn-wrap {
          display: flex;
          button {
            width: 6rem;
            height: 2.1rem;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            &:not(:first-child) {
              margin-left: 0.3rem;
            }
            &.btn-outline-gray {
              background: #fff;
              border: 0.1rem solid #9DA2AE;
              color: #1c1b1f;
            }
            &.btn-blue {
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
              border: 0.1rem solid #9DA2AE;
              color: #fff;
            }
          }
        }
      }
      .list-wrap {
        ul {
          li {
            &:not(:last-child) {
              margin-bottom: 2rem;
            }
          }
        }
      }
    }
    .total-price-info {
      padding: 2rem 3rem;
      border-top: 0.1rem solid rgba(157, 162, 174, 0.3);
      dl {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.1rem;
        font-weight: 500;
        color: #555;
        &:not(:last-child) {
          margin-bottom: 0.8rem;
        }
        &:first-child {
          margin-bottom: 1.6rem;
          dt {
            font-size: 1.1rem;
            font-weight: 500;
            color: #1c1b1f;
          }
          dd {
            font-size: 1.2rem;
            font-weight: 500;
            color: #1c1b1f;
            strong {
              font-size: 1.8rem;
              font-weight: 600;
              color: #ea583f;
            }
          }
        }
      }
    }
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
        <div className="product-list-wrap">
          <div className="add-ons">
            <label className="all-check">
              <input type="checkbox" />
              <span>전체선택</span>
            </label>
            <div className="btn-wrap">
              <button type="button" className="btn-outline-gray">선택삭제</button>
              <button type="button" className="btn-blue">품목추가</button>
            </div>
          </div>
          <div className="list-wrap">
            <ul>
              <li>
                <ProductInfo />
              </li>
              <li>
                <ProductInfo />
              </li>
              <li>
                <ProductInfo />
              </li>
            </ul>
          </div>
        </div>
        <div className="total-price-info">
          <dl>
            <dt>합계</dt>
            <dd><strong>45,000</strong> 원(VAT별도)</dd>
          </dl>
          <dl>
            <dt>계산서발행일</dt>
            <dd>2023-03-13</dd>
          </dl>
          <dl>
            <dt>결제예정일</dt>
            <dd>2023-03-13</dd>
          </dl>
          <dl>
            <dt>결제방식</dt>
            <dd>현금결제</dd>
          </dl>
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