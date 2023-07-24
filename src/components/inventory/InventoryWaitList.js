import React from "react";
import styled from "styled-components";
import {DateFormat} from '../../util/dateFormat'

const InventoryWaitListWrap = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &.active {
    .table-body-top {
      background-color: #FEF1EC;
    }
    .table-body-btm {
      background-color: #FFEAE2;
    }
  }
  .table-body-top {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    padding: 10px 0;
    position: relative;
    .view-more {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      img {
        width: 3px;
        height: 9px;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1c1b1f;
      font-weight: 400;
      font-size: 12px;
      font-family: var(--font-mont);
      &:not(:last-of-type) {
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
    .table-sendday,
    .table-reqday {
      width: 85px;
    }
    .table-code {
      width: calc(100% - 170px - 60px);
    }
    .table-count {
      width: 45px;
    }
  }
  .table-body-btm {
    padding: 10px;
    border-radius: 0 0 10px 10px;
    background-color: #ebecef;
    font-size: 12px;
    font-weight: 400;
    font-family: var(--font-mont);
    color: #1c1b1f;
    display: flex;
    flex-wrap: wrap;
    dl {
      display: flex;
      align-items: center;
      color: #1C1B1F;
      font-weight: 400;
      font-size: 11px;
      &:last-child {
        margin-top: 4px;
        width: 100%;
      }
    }
  }
`

const InventoryWaitList = ({ list, onClick }) => {
  return (
    <InventoryWaitListWrap className={list.no == 3 ? 'active' : ''}>
      <div className="table-body-top">
        <div className="table-sendday">{DateFormat(new Date(list.발송일)).substr(0,10)}</div>
        <div className="table-reqday">{DateFormat(new Date(list.입고요청일)).substr(0,10)}</div>
        <div className="table-code">{list.품목코드}</div>
        <div className="table-count">{list.수량}</div>
        <i className="view-more" onClick={onClick}>
          <img src="../icons/receipt-viewmore-icon.png" alt="view-more btn" />
        </i>
      </div>
      <div className="table-body-btm">
          <dl>
            <dt>파트</dt>
            <dd>{list.파트} </dd>
          </dl>
          <dl>
            <dt>품명</dt>
            <dd>{list.품명} </dd>
          </dl>
          <dl>
            <dt>규격</dt>
            <dd>{list.규격} </dd>
          </dl>
      </div>
    </InventoryWaitListWrap>
  )
}
export default InventoryWaitList;
