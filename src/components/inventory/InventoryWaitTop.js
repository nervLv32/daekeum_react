import React from "react";
import styled from "styled-components";

const InventoryWaitTopWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #e4e9ff;
  border-radius: 10px;
  padding: 10px 0;
  margin-bottom: 8px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1f319d;
    font-weight: 500;
    font-size: 12px;
    &:not(:last-child) {
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 10px;
        background-color: #9DA2AE;
        position: absolute;
        top: 50%;
        right: 0;
        transform : translateY(-50%);
      }
    }
  }
  .table-top-sendday,
  .table-top-reqday {
    width: 85px;
  }
  .table-top-code {
    width: calc(100% - 170px - 60px);
  }
  .table-top-count {
    width: 45px;
  }
`

const InventoryWaitTop = () => {
  return <InventoryWaitTopWrap>
    <div className="table-top-sendday">발송일</div>
    <div className="table-top-reqday">요청일</div>
    <div className="table-top-code">품목코드</div>
    <div className="table-top-count">수량</div>
  </InventoryWaitTopWrap>
}

export default InventoryWaitTop;