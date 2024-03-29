import React from "react";
import styled from "styled-components";
import { getOrderState } from "../../util/utils";
import OrderStateBtn from "../atom/OrderStateBtn";
import ReceiptCheckModal from "./ReceiptCheckModal";
import { useModal } from "../../hooks/useModal";
import DStep01Modal from "../../base-components/modal-components/Diary/DStep01Modal";
import moment from "moment";
import {useRecoilState} from "recoil";
import journalAtom from "../../recoil/journalAtom";
import ReceiptConfirm from './ReceiptConfirm'
import NewRegisModal from '../global/NewRegisModal'

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
      button {
        padding: 4px 8px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        &.cancel {
          background-color: #555555;
          i {
            background : url('../icons/receipt-cancel-icon.png') no-repeat 50% center / cover;
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
          font-size: 10px;
          font-weight: 700;
        }
      }
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
  item,
  onClick,
  receptionist,
  자사담당,
  센터
}) => {

  // 업체정보 Recoil
  const [journal, setJournal] = useRecoilState(journalAtom);

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
          <dd>
            {date.substring(0, 10)}
          </dd>
        </dl>
      </div>
      {
        state && (
          <div
            className="state-wrap"
            onClick={() => {
              if(state === '접수완료') {
                // openModal({ ...modalData, content: <DStep01Modal item={{no: no}} /> })
                openModal({ ...modalData, content: <ReceiptConfirm item={{no: no}} /> }) // 여기타고 가자
              } else if(state === '접수대기'){
                openModal({ ...modalData, content: <NewRegisModal item={{no: no}} confirm={true}/> })
              } else if(state === '처리완료') {
                // openModal({ ...modalData, content: <ReceiptConfirm item={{no: no}} /> }) // 여기타고 가자
              }
              setJournal({
                ...journal,
                accountCode: no
              })
            }}
          >
            <button
              type="button"
              className={
                state === "접수대기" ? "ready" : 
                state === "접수완료" ? "add" : 
                state === "처리완료" ? "done" :
                state === "접수취소" ? "cancel" : ""}
            >
              <i></i>
              <span>{state}</span>
            </button>
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
          <dd>{regionSecond}</dd>
        </dl>
        <i className="view-more" onClick={onClick}>
          <img src="../icons/receipt-viewmore-icon.png" alt="view-more btn" />
        </i>
      </div>
      <div className="body-wrap">
        <dl>
          <dt>현장명</dt>
          <dd>{regionFirst}</dd>
        </dl>
      </div>
      {state === '접수대기' && (
        <div>
          <dl>
            <dt>접수자</dt>
            <dd>{receptionist}</dd>
            <dt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;담당센터</dt>
            <dd>{센터}</dd>
          </dl>
        </div>
      )}
      {state === '접수완료' && (
        <div>
          <dl>
            <dt>방문예정담당자</dt>
            <dd>{manager}</dd>
            <dt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;담당센터</dt>
            <dd>{센터}</dd>
          </dl>
        </div>
      )}
            {state === '처리완료' && (
        <div>
          <dl>
            <dt>처리자</dt>
            <dd>{자사담당}</dd>
            <dt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;담당센터</dt>
            <dd>{센터}</dd>
          </dl>
        </div>
      )}
    </div>
  </ReceiptCardComponent>
}

export default ReceiptCard;
