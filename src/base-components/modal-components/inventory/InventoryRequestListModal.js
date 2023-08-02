import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import SimpleInputModal from "./SimpleInputModal";
import fetchService from '../../../util/fetchService'
import {DateFormat} from '../../../util/dateFormat'
import InventoryRequestModal from './InventoryRequestModal'
import ConfirmAlert from '../ConfirmAlert'

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
    max-height: 500px;
    overflow-y: scroll;
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
  const { openModal, closeModal } = useModal();
  const [detail, setDetail] = useState([])
  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };

  const deleteItem = () => {
    fetchService('/inventory/materialRequestDelete', 'post', {요청일련번호 : item.요청일련번호})
      .then(() => {
        window.location.reload()
      })
  }

  useEffect(() => {
    fetchService('/inventory/materialRequestDetail', 'post', {요청일련번호 : item.요청일련번호})
      .then((res) => {
        console.log("res::::", res)
        setDetail(res.data)
      })
  }, [])

  return <InventoryRequestListModalWrap>
    <div className="list-top">
      <div className="title">품목리스트 및 상태</div>
      <div className="dl-list">
        <dl>
          <dt>요청지</dt>
          <dd>{detail[0]?.수신부서명 || ''}</dd>
        </dl>
        <dl>
          <dt>상태변경시간</dt>
          <dd>{detail[0]?.상태변경시각 ? DateFormat(new Date(detail[0]?.상태변경시각)).substr(0, 10) : ''}</dd>
        </dl>
        <dl>
          <dt>상태변경자</dt>
          <dd>{detail[0]?.상태변경자 || ''}</dd>
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
        {
          detail.map((it, key) => {
            return <li key={key}>
              <dl>
                <dt>
                  <div className="code">{it.품목코드}</div>
                  <div className="name">{it.품명}</div>
                  <div className="count">{it.수량}{it.단위}</div>
                  <div className="state">{it.상태}</div>
                </dt>
                <dd>
                  {it.비고}
                </dd>
              </dl>
            </li>
          })
        }

      </ul>
    </div>
    <div className="modal-btm">
      <button className="primary-btn" onClick={() => {
        openModal({ ...modalData, content: <InventoryRequestModal item={item} /> })
      }}>요청</button>
      <button className="del-btn" onClick={() => {
        openModal({ ...modalData, content: <ConfirmAlert client={item.요청일련번호 + '요청을'} text={'삭제'} submit={deleteItem} cancel={closeModal} /> })
      }}>삭제</button>
      <button className="del-btn" onClick={closeModal}>닫기</button>
    </div>
  </InventoryRequestListModalWrap>
}

export default InventoryRequestListModal;
