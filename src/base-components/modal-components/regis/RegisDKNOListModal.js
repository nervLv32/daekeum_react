import React, { useState } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";

const RegisDKNOListModalWrap = styled.div`
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
          width: 50px;
          text-align-last: justify;
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
      &.three-item {
        dl {
          &:nth-child(n+2) {
            margin-left: 25px;
          }
        }
      }
      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);
        &:nth-child(n+2) {
          margin-left: 15px;
        }
        dt {
          letter-spacing: -0.03em;
          color: #1f319d;
          font-weight: 600;
          font-size: 12px;
          &.justify {
            width: 50px;
            text-align-last: justify;
          }
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
    & > *:not(:last-child) {
        margin-right: 10px;
      }
    > button {
      cursor: pointer;
    }
    .del-btn {
      padding: 0 15px;
      width:100%;
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

const RegisDKNOListModal = ({ item }) => {

  const { closeModal } = useModal();
  return (
    <RegisDKNOListModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>DKNO</dt>
            <dd>{item.installCate}</dd>
          </dl>
        </div>
      </div>
      <ul className="modal-body">
        <li>
          <dl>
            <dt className="justify">구 분</dt>
            <dd>{item.구분}</dd>
          </dl>
          <dl>
            <dt>위 치</dt>
            <dd>{item.위치}</dd>
          </dl>
          <dl>
            <dt>모델명</dt>
            <dd>{item.모델명}</dd>
          </dl>
        </li>
        <li className="three-item">
          <dl>
            <dt>거래처명</dt>
            <dd>{item.거래처명}</dd>
          </dl>
          <dl>
            <dt>현장명</dt>
            <dd>{item.현장명}</dd>
          </dl>
        </li>
        <li className="three-item">
          <dl>
            <dt className="justify">품  명</dt>
            <dd>{item.품명}</dd>
          </dl>
          <dl>
            <dt className="justify">규  격</dt>
            <dd>{item.규격}</dd>
          </dl>
          <dl>
            <dt className="justify">수  량</dt>
            <dd>{item.수량}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt className="justify">단 가</dt>
            <dd>{item.단가}</dd>
          </dl>
          <dl>
            <dt className="justify">금 액</dt>
            <dd>{item.금액}</dd>
          </dl>
          <dl>
            <dt className="justify">유 무 상<br/>구 분</dt>
            <dd>{item.유무상구분}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>비 고</dt>
            <dd>{item.비고}</dd>
          </dl>
        </li>
      </ul>
      <div className="modal-btm">
        <button className="del-btn" onClick={closeModal}>닫기</button>
      </div>
    </RegisDKNOListModalWrap>
  )
}

export default RegisDKNOListModal;
