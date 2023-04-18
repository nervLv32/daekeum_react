import React from "react";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";

const InventoryRequestModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  .list-top {
    .title {
      padding: 15px 0;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      font-weight: 700;
      font-size: 16px;
      color: #1c1b1f;
    }
    .info-wrap {
      
    }
  }
`

const InventoryRequestModal = () => {
  const { closeModal } = useModal();

  return <InventoryRequestModalWrap>
    <div className="list-top">
      <div className="title">간편입력</div>
      <div className="info-wrap">
        <dl>
          <dt>입고요청일</dt>
          <dd>
            2023-02-08
            <i>
              <img src="../icons/icon-modal-calender.png" alt="calender icon" />
            </i>
          </dd>
        </dl>
        <div className="info-dl">
          <dl>
            <dt>발송공장</dt>
            <dd>11. 수도권</dd>
          </dl>
          <dl>
            <dt>요청자</dt>
            <dd>정명길</dd>
          </dl>
        </div>
      </div>
    </div>
  </InventoryRequestModalWrap>
}

export default InventoryRequestModal;