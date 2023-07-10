import React from "react";
import styled from "styled-components";

const InventoryTableTopWrap = styled.div`
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
  .table-top-part {
    width: 70px;
  }
  .table-top-code {
    width: calc(45% - 60px);
  }
  .table-top-name {
    width: calc(55% - 60px);
  }
  .table-top-count {
    width: 50px;
  }
`

const InventoryTableTop = () => {
  return <InventoryTableTopWrap>
    <div className="table-top-part">파트</div>
    <div className="table-top-code">품목코드</div>
    <div className="table-top-name">품명</div>
    <div className="table-top-count">수량</div>
  </InventoryTableTopWrap>
}

export default InventoryTableTop;