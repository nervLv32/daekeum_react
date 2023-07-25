import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import {DateFormat} from '../../util/dateFormat'

const InventoryWaitModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  .modal-top {
    border-radius: 20px 20px 0 0;
    background: #E4E9FF;
    padding: 13px 20px 13px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dl-wrap {
      display: flex;
      align-items: center;
      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);
        &:first-child {
          margin-right: 18px;
        }
        dt {
          color: #1f319d;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          margin-right: 12px;
        }
        dd {
          color: #1c1b1f;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
  .modal-body {
    padding: 25px 30px;
    background-color: #fff;
    li {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        border-bottom : 1px solid #eff2ff;
        padding-bottom: 13px;
        margin-bottom: 13px;
      }
      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);
        &:nth-child(2) {
          margin-left: 15px;
        }
        dt {
          letter-spacing: -0.03em;
          color: #1f319d;
          font-weight: 600;
          font-size: 12px;
          width: 63px;
          text-align-last: justify;
        }
        dd {
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
          margin-left: 10px;
          &.oneLine {
            width: calc(100% - 63px);
            line-height: 17px;
          }
        }
      }
    }
  }
  .modal-btm {
    padding: 17px 30px;
    background-color: #f7f7f7;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .primary-btn-wrap {
      position: relative;
      .btn-state-wrap {
        position: absolute;
        left: 0;
        bottom: calc(100% + 5px);
        width: 100%;
        padding: 14px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: red;
        background-color: #fff;
        border: 2px solid #1f319d;
        border-radius: 10px;
        box-shadow : 3px 3px 15px rgba(28, 27, 31, 0.2);
        li {
          &:not(:last-child) {
            margin-bottom: 5px;
          }
          button {
            padding: 7px 16px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &.ready {
              background-color: #5A55CA;
              i {
                background : url('../icons/receipt-ready-icon.png') no-repeat 50% center / cover;
              }
            }
            &.add {
              background-color: #EA583F;
              i {
                background : url('../icons/receipt-add-icon.png') no-repeat 50% center / cover;
              }
            }
            &.done {
              background-color: #0CA35A;
              i {
                background : url('../icons/receipt-done-icon.png') no-repeat 50% center / cover;
              }
            }
            i {
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-right: 4px;
            }
            span {
              color: #FFFFFF;
              font-size: 12px;
              font-weight: 700;
            }
          }
        }
      }
    }
    & > *:not(:last-child) {
        margin-right: 10px;
      }
    > button {
      cursor: pointer;
    }
    .primary-btn {
      height: 34px;
      padding: 0 30px;
      font-size: 14px;
      font-weight: 700;
      background : linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      border-radius: 10px;
      color: #fff;
    }
    .del-btn {
      padding: 0 15px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1F319D;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      color: #555;
    }
  }
`

const InventoryWaitModal = ({ item }) => {
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };
  return (
    <InventoryWaitModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>품목코드</dt>
            <dd>{item.품목코드}</dd>
          </dl>
          <dl>
            <dt>수량</dt>
            <dd>{item.수량}</dd>
          </dl>
        </div>
      </div>
      <ul className="modal-body">
        <li>
          <dl>
            <dt>발 송 일</dt>
            <dd>{item.발송일 ? DateFormat(new Date(item.발송일)).substr(0,10) : ''}</dd>
          </dl>
          <dl>
            <dt>요 청 일</dt>
            <dd>{item.입고요청일 ? DateFormat(new Date(item.입고요청일)).substr(0,10) : ''}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>파 트</dt>
            <dd>{item.파트}</dd>
          </dl>
          <dl>
            <dt>품 명</dt>
            <dd>{item.품명}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>규 격</dt>
            <dd className="oneLine">{item.규격}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>사 용 모 델</dt>
            <dd>{item.사용모델}</dd>
          </dl>
          <dl>
            <dt>발 송 부 서</dt>
            <dd>{item.발송부서명}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>발 송 자</dt>
            <dd className="oneLine">{item.발송자}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>비 고</dt>
            <dd className="oneLine">{item.비고}</dd>
          </dl>
        </li>
      </ul>
      <div className="modal-btm">
      <button className="primary-btn" onClick={() => {
          closeModal();
      }}>입고하기</button>
        <button className="del-btn" onClick={closeModal}>닫기</button>
      </div>
    </InventoryWaitModalWrap>
  )
}

export default InventoryWaitModal;
