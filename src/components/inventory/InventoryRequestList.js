import React from "react";
import styled from "styled-components";
import OrderStateBtn from "../atom/OrderStateBtn";

const InventoryRequestListComponent = styled.li`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  dl {
    display: flex;
    align-items: center;
    font-family: var(--font-mont);
    dt {
      color: #1f319d;
      font-weight: 500;
      font-size: 12px;
      line-height: 14.5px;
      margin-right: 4px;
    }
    dd {
      color: #1c1b1f;
      font-weight: 400;
      font-size: 12px;
      line-height: 14.5px;
    }
  }
  .list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: #E4E9FF;
    border-radius: 10px 10px 0 0;
    .dl-wrap {
      display: flex;
      align-items: center;
      dl {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
  .list-body {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #F6F6F6;
    position: relative;
    border-radius: 0 0 10px 10px;
    dl {
      &:first-child {
        margin-right: 35px;
      }
    }
    .view-more {
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
  }
`

const InventoryRequestList = ({
  no,
  date,
  state,
  materialManager,
  writer,
  site,
  stateManager,
  onClick
}) => {
  return <InventoryRequestListComponent>
    <div className="list-top">
      <div className="dl-wrap">
        <dl className="number">
          <dt>NO.</dt>
          <dd>{no}</dd>
        </dl>
        <dl className="date">
          <dt>Date.</dt>
          <dd>{date}</dd>
        </dl>
      </div>
      <div className="state-wrap">
        <OrderStateBtn state={state} />
      </div>
    </div>
    <div className="list-body">
      <dl>
        <dt>자제요청자</dt>
        <dd>{materialManager}</dd>
      </dl>
      <dl>
        <dt>작성자</dt>
        <dd>{writer}</dd>
      </dl>
      <i className="view-more" onClick={onClick}>
          <img src="../icons/receipt-viewmore-icon.png" alt="view-more btn" />
        </i>
    </div>
  </InventoryRequestListComponent >
}

export default InventoryRequestList;