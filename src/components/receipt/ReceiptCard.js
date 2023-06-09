import React from "react";
import styled from "styled-components";
import { getOrderState } from "../../util/utils";
import OrderStateBtn from "../atom/OrderStateBtn";
import ReceiptCheckModal from "./ReceiptCheckModal";
import { useModal } from "../../hooks/useModal";
import DStep01Modal from "../../base-components/modal-components/Diary/DStep01Modal";
import moment from "moment";

const ReceiptCardComponent = styled.li`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  dl {
    display: flex;
    align-items: center;
    font-family: var(--font-mont);
    dt {
      color: #1f319d;
      font-weight: 600;
      font-size: 12px;
      line-height: 14.5px;
      margin-right: 4px;
    }
    dd {
      color: #1c1b1f;
      font-weight: 600;
      font-size: 12px;
      line-height: 14.5px;
    }
  }
  .receipt-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    background-color: #E4E9FF;
    border-radius: 10px 10px 0 0;
    .dl-wrap {
      display: flex;
      align-items: center;
      dl {
      &:first-child {
        margin-right: 13px;  
      }
      dt {
        margin-right: 2px;
      }
      }
    }
    .state-wrap {
      
    }
  }
  .receipt-body {
    border-radius: 0 0 10px 10px;
    background-color: #F7F7F7;
    padding: 14px 10px;
    > div {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
    .top-wrap {
      padding-right: 20px;
      display: flex;
      align-items: center;
      position: relative;
      dl {
        &:first-child {
          margin-right: 6px;
        }
      }
      .view-more {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
    }
  }
`

const ReceiptCard = ({
  no,
  date,
  state,
  company,
  regionFirst,
  regionSecond,
  site,
  manager,
  className,
  onClick
}) => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };
  return <ReceiptCardComponent className={className}>
    <div className="receipt-top">
      <div className="dl-wrap">
        <dl className="number">
          <dt>NO.</dt>
          <dd>{no}</dd>
        </dl>
        <dl className="date">
          <dt>Date.</dt>
          <dd>{moment(date).format('YYYY-MM-DD')}</dd>
        </dl>
      </div>
      {
        state && (
          <div 
            className="state-wrap"
            onClick={() => {
              if(state == '접수완료') {
                openModal({ ...modalData, content: <ReceiptCheckModal /> })
              } else {
                openModal({ ...modalData, content: <DStep01Modal accountCode={no} /> })
              }
            }}
          >
            <OrderStateBtn state={state} />
          </div>
        )
      }
    </div>
    <div className="receipt-body">
      <div className="top-wrap">
        <dl>
          <dt>업체명</dt>
          <dd>{company}</dd>
        </dl>
        <dl>
          <dt>지역</dt>
          <dd>{regionFirst}-{regionSecond}</dd>
        </dl>
        <i className="view-more" onClick={onClick}>
          <img src="../icons/receipt-viewmore-icon.png" alt="view-more btn" />
        </i>
      </div>
      <div className="body-wrap">
        <dl>
          <dt>현장명</dt>
          <dd>{site}</dd>
        </dl>
      </div>
      {manager && (
        <div>
          <dl>
            <dt>방문예정담당자</dt>
            <dd>{manager}</dd>
          </dl>
        </div>
      )}
    </div>
  </ReceiptCardComponent>
}

export default ReceiptCard;
