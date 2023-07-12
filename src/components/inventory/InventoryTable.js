import React from "react";
import styled from "styled-components";

const InventoryTableWrap = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .table-body-top {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    padding: 10px 0;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1c1b1f;
      font-weight: 400;
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
    .table-part {
      width: 70px;
    }
    .table-code {
      width: calc(45% - 60px);
    }
    .table-name {
      width: calc(55% - 60px);
      padding: 0 10px;
      text-align: center;
      line-height: 1.2;
      word-break: keep-all;
    }
    .table-count {
      width: 50px;
    }
  }
  .table-body-btm {
    padding: 10px;
    border-radius: 0 0 10px 10px;
    background-color: #ebecef;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    font-family: var(--font-mont);
    color: #1c1b1f;
  }
`

const InventoryTable = ({ list }) => {
  return (
    <InventoryTableWrap>
      <div className="table-body-top">
        <div className="table-part">{list.part}</div>
        <div className="table-code">{list.code}</div>
        <div className="table-name">{list.name}</div>
        <div className="table-count">{list.count}</div>
      </div>
      <div className="table-body-btm">
        <div>규격 {list.standard}</div>
      </div>
    </InventoryTableWrap>
  )
}
export default InventoryTable;