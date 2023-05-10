import React from "react";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import InventoryRequestListModal from "./InventoryRequestListModal";

const SimpleInputModalWrap = styled.div`
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
      flex-wrap: wrap;
      padding: 10px 20px;
      background-color: #F6F6F6;
      dl {
        &:first-child {
          width: 100%;
          margin-bottom: 8px;
          i {
            display: inline-block;
            margin-left: 6px;
          }
          dd {
            display: flex;
            align-items: center;
          }
        }
        &:not(:first-child) {
          margin-right: 10px;
        }
        display: flex;
        align-items: center;
        font-family: var(--font-mont);
        dt {
          font-weight: 700;
          font-size: 12px;
          color: #1F319D;
          margin-right: 6px;
        }
        dd {
          font-weight: 500;
          font-size: 12px;
          color: #1c1b1f;
        }
      }
    }
  }
  .list-title {
    background-color: #1F319D;
    padding: 10px 0;
    text-align: center;
    font-family: var(--font-mont);
    font-weight: 600;
    font-size: 12px;
    coloR: #fff;
  }

  .listcard-wrap {
    &.mb80 {
      margin-bottom: 80px;
    }
    li {
      &.listcard-top {
        dl {
          dt {
            padding: 10px 0;
            background-color: rgba(157, 162, 174, .5);
            font-weight: 500;
            font-size: 12px;
            color: #1c1b1f;
          }
        }
      }
      &.active {
        dt {
          background-color: #FEF1EC;
        }
        dd {
          background-color: #FFEAE2;
        }
      }
      dl {
        dt {
          display: flex;
          align-items: center;
          padding: 8px 0;
          background-color: #f6f6f6;
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
              width: calc(50% - 60px);
            }
            &.name {
              width: calc(50% - 60px);
            }
            &.part {
              width: 60px;
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

  .select-wrap {
    position: absolute;
    width: calc(100% - 40px);
    bottom: 68px;
    background-color: #9DA2AE;
    padding: 8px 13px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    .guide-msg {
      span {
        font-family: var(--font-mont);
        font-weight: 500;
        font-size: 14px;
      }
      font-weight: 400;
      font-size: 14px;
    }
    .btn-wrap {
      button {
        border: 1px solid #555555;
        background-color: #fff;
        border-radius: 5px;
        font-weight: 400;
        font-size: 12px;
        padding: 5px 8px;
        margin-right: 8px;
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

const SimpleInputModal = ({ item }) => {
  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };


  return <SimpleInputModalWrap>
    <div className="list-top">
      <h6 className="title">
        간편입력
      </h6>
      <div className="dl-list">
        <dl>
          <dt>입고요청일</dt>
          <dd>
            2023-02-08
            <i><img src="../icons/small-calendar-icon.png" alt="검색 아이콘" /></i>
          </dd>
        </dl>
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
    <div className="list-title">품목리스트</div>

    <ul className="listcard-wrap">
        <li className="listcard-top">
          <dl>
            <dt>
              <div className="code">품목코드</div>
              <div className="part">파트</div>
              <div className="name">품명</div>
              <div className="state">재고</div>
            </dt>
          </dl>
        </li>
        {/* S: loop */}
        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="part">감속기</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="state">1.0</div>
            </dt>
            <dd>
            규격 : 2T*Φ610(하단)*Φ205(상단)*410(H)    사용모델 R10D-06
            </dd>
          </dl>
        </li>
        {/* E: loop */}
    </ul>


    <div className="list-title">요청리스트</div>


    <ul className="listcard-wrap mb80">
        <li className="listcard-top">
          <dl>
            <dt>
              <div className="code">품목코드</div>
              <div className="part">파트</div>
              <div className="name">품명</div>
              <div className="state">재고</div>
            </dt>
          </dl>
        </li>
        {/* S: loop */}
        <li>
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="part">감속기</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="state">1.0</div>
            </dt>
            <dd>
            규격 : 2T*Φ610(하단)*Φ205(상단)*410(H)    사용모델 R10D-06
            </dd>
          </dl>
        </li>
        {/* E: loop */}
        <li className="active">
          <dl>
            <dt>
              <div className="code">TNUGM03002</div>
              <div className="part">감속기</div>
              <div className="name">G/M(대금감속기)</div>
              <div className="state">1.0</div>
            </dt>
            <dd>
            규격 : 2T*Φ610(하단)*Φ205(상단)*410(H)    사용모델 R10D-06
            </dd>
          </dl>
        </li>
    </ul>

    <div className="select-wrap">
      <p className="guide-msg">
        <span>1</span>
        개 선택
      </p>
      <div className="btn-wrap">
        <button>선택취소</button>
        <i><img src="../icons/icon-select-close.png" alt="닫기 아이콘" /></i>
      </div>
    </div>

    <div className="modal-btm">
      <button className="primary-btn" onClick={() => {
        closeModal()
      }}>입력완료</button>
      <button className="del-btn" onClick={() => {
        openModal({ ...modalData, content: <InventoryRequestListModal item={item} />})
      }}>닫기</button>
    </div>
  </SimpleInputModalWrap>
}

export default SimpleInputModal;