import React from "react";
import styled from "styled-components";
import OrderStateBtn from "../../components/atom/OrderStateBtn";

const ReceiptModalWrap = styled.div`
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
          margin-right: 4px;
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
        &:first-child {
          dt {
            width: 70px;
            text-align-last: justify;
          }
        }
        &:nth-child(2) {
          margin-left: 15px;
        }
        dt {
          letter-spacing: 0.03em;
          color: #1f319d;
          font-weight: 600;
          font-size: 12px;
        }
        dd {
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
          margin-left: 10px;
          &.oneLine {
            width: calc(100% - 80px);
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
    > button {
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .primary-btn {
      height: 34px;
      padding: 0 22px;
      font-size: 14px;
      font-weight: 700;
      background : linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      border-radius: 10px;
      color: #fff;
    }
    .modify-btn {
      height: 34px;
      padding: 0 20px;
      font-size: 14px;
      font-weight: 700;
      background : #5A55CA;
      border-radius: 10px;
      color: #fff;
    }
    .call-btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #EA583F;
      border-radius: 10px;
    }
    .del-btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #9DA2AE;
      border-radius: 10px;
    }
  }
`

const ReceiptModal = ({ item }) => {
  console.log(item)
  return (
    <ReceiptModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>NO.</dt>
            <dd>{item.no}</dd>
          </dl>
          <dl>
            <dt>Date.</dt>
            <dd>{item.date}</dd>
          </dl>
        </div>
        <div className="state-wrap">
          <OrderStateBtn state={item.state} />
        </div>
      </div>
      <ul className="modal-body">
        <li>
          <dl>
            <dt>업 체 명</dt>
            <dd>{item.company}</dd>
          </dl>
          <dl>
            <dt>지역</dt>
            <dd>{item.regionFirst}-{item.regionSecond}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>현 장 명</dt>
            <dd className="oneLine">{item.site}</dd>
          </dl>
        </li>
        {
          item.manager && (
            <li>
              <dl>
                <dt>현 장 담 당 자</dt>
                <dd>{item.manager}</dd>
              </dl>
              <dl>
                <dt>현 장 연 락 처</dt>
                <dd>{item.managerPhone}</dd>
              </dl>
            </li>
          )
        }
        <li>
          <dl>
            <dt>현 장 주 소</dt>
            <dd className="oneLine">{item.siteAddress}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>접 수 내 용</dt>
            <dd className="oneLine">{item.detail}</dd>
          </dl>
        </li>
      </ul>
      <div className="modal-btm">
        <button className="primary-btn">접수상태변경</button>
        <button className="modify-btn">수정</button>
        <button className="call-btn">
          <img src="../icons/modal-call-icon.png" alt="call icon" />
        </button>
        <button className="del-btn">
          <img src="../icons/modal-del-icon.png" alt="del icon" />
        </button>
      </div>
    </ReceiptModalWrap>
  )
}

export default ReceiptModal;