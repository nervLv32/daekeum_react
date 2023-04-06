import React, { useState } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";

const RegisEquipListModalWrap = styled.div`
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
      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);
        width: 50%;
        dt {
          letter-spacing: -0.03em;
          color: #1f319d;
          font-weight: 600;
          font-size: 12px;
          width: 50px;
          text-align-last: justify;
        }
        dd {
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
          margin-left: 10px;
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
      width: 145px;
      height: 34px;
    }
    .primary-btn {
      font-size: 14px;
      font-weight: 700;
      background : linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      border-radius: 10px;
      color: #fff;
    }
    .del-btn {
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

const RegisEquipListModal = ({ item }) => {
  const { closeModal } = useModal();
  return (
    <RegisEquipListModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>DKNO</dt>
            <dd>{item.dkno}</dd>
          </dl>
        </div>
      </div>
      <ul className="modal-body">
        <li>
          <dl>
            <dt>M C N O</dt>
            <dd>{item.mcno}</dd>
          </dl>
          <dl>
            <dt>모 델</dt>
            <dd>{item.model}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>설 치 구 분</dt>
            <dd>{item.installCate}</dd>
          </dl>
          <dl>
            <dt>입 출 고</dt>
            <dd>{item.warehousingCate}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>전 압</dt>
            <dd>{item.bolt}</dd>
          </dl>
          <dl>
            <dt>방 향</dt>
            <dd>{item.direction}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>센 터 명</dt>
            <dd>{item.center}</dd>
          </dl>
          <dl>
            <dt>담 당 자</dt>
            <dd>{item.manager}</dd>
          </dl>
        </li>
      </ul>
      <div className="modal-btm">
        <button className="primary-btn">장비조회</button>
        <button className="del-btn" onClick={closeModal}>닫기</button>
      </div>
    </RegisEquipListModalWrap>
  )
}

export default RegisEquipListModal;