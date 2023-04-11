import React from "react";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";

const InventoryRequestListModalWrap = styled.div`
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
    .dl-list {
      display: flex;
      align-items: center;
      background-color: #F6F6F6;
      padding: 14px 30px;
      dl {
        width: 33.333%;
        font-family: var(--font-mont);
        &:first-child {
          text-align: left;
        }
        &:nth-child(2) {
          border-left: 1px solid #9DA2AE;
          border-right: 1px solid #9DA2AE;
          text-align: center;
        }
        &:last-child {
          text-align: right;
        }
        dt {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #1f319d;
        }
        dd {
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #1c1b1f;
        }
      }
    }
  }
  .list-body {
    padding: 20px;
    ul {
      li {
        &:not(:last-child) {
          margin-bottom: 6px;
        }
        &.listcard-top {
          dl {
            dt {
              padding: 10px 0;
              background-color: #E4E9FF;
              border-radius: 10px;
              font-weight: 500;
              font-size: 12px;
              color: #1f319d;
            }
          }
        }
        dl {
          dt {
            display: flex;
            align-items: center;
            padding: 8px 0;
            background-color: #f6f6f6;
            border-radius: 10px 10px 0 0;
            font-family: var(--font-mont);
            font-weight: 500;
            font-size: 12px;
            color: #1c1b1f;
            > div {
              text-align: center;
              &:not(:last-child) {
                position: relative;
                &::after {
                  content: '';
                  display: block;
                  width: 1px;
                  height: 9px;
                  background-color: #9DA2AE;
                  position: absolute;
                  top: 50%;
                  right: 0;
                  transform: translateY(-50%);
                }
              }
              &.code {
                width: calc(50% - 50px);
              }
              &.name {
                width: calc(50% - 50px);
              }
              &.count {
                width: 40px;
              }
              &.state {
                width: 60px;
              }
            }
          }
          dd {
            padding: 9px;
            background-color: #ebecef;
            border-radius: 0 0 10px 10px;
            text-align: center;
            font-family: var(--font-mont);
            font-weight: 500;
            font-size: 11px;
            color: #1c1b1f;
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
    & > *:not(:last-child) {
        margin-right: 10px;
      }
    > button {
      cursor: pointer;
      width: calc(50% - 5px);
    }
    .primary-btn {
      height: 34px;
      padding: 0 30px;
      font-size: 14px;
      font-weight: 700;
      background : linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      border-radius: 10px;
      color: #fff;
    }
    .del-btn {
      padding: 0 15px;
      height: 34px;
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

const InventoryRequestListModal = ({ item }) => {
  const { closeModal } = useModal();

  return <InventoryRequestListModalWrap>
    <div className="list-top">
      <div className="title">품목리스트 및 상태</div>
      <div className="dl-list">
        <dl>
          <dt>요청지</dt>
          <dd>{item.site}</dd>
        </dl>
        <dl>
          <dt>상태변경시간</dt>
          <dd>{item.date}</dd>
        </dl>
        <dl>
          <dt>상태변경자</dt>
          <dd>{item.stateManager}</dd>
        </dl>
      </div>
    </div>
    <div className="list-body">
      <ul>
        <li className="listcard-top">
          <dl>
            <dt>
              <div className="code">품목코드</div>
              <div className="name">품명</div>
              <div className="count">수량</div>
              <div className="state">상태</div>
            </dt>
          </dl>
        </li>
        {/* S: loop */}
        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="count">1.0</div>
              <div className="state">구매요청</div>
            </dt>
            <dd>
            규격  2T*Φ610(하단)*Φ205(상단)*410(H)
            </dd>
          </dl>
        </li>
        {/* E: loop */}

        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="count">1.0</div>
              <div className="state">구매요청</div>
            </dt>
            <dd>
            규격  2T*Φ610(하단)*Φ205(상단)*410(H)
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="count">1.0</div>
              <div className="state">구매요청</div>
            </dt>
            <dd>
            규격  2T*Φ610(하단)*Φ205(상단)*410(H)
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="count">1.0</div>
              <div className="state">구매요청</div>
            </dt>
            <dd>
            규격  2T*Φ610(하단)*Φ205(상단)*410(H)
            </dd>
          </dl>
        </li>

      </ul>
    </div>
    <div className="modal-btm">
      <button className="primary-btn">입력완료</button>
      <button className="del-btn">닫기</button>
    </div>
  </InventoryRequestListModalWrap>
}

export default InventoryRequestListModal;