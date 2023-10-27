import React, { useState } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import {receiptAtom} from "../../../recoil/receipt";
import {useRecoilState} from "recoil";
import fetchService from "../../../util/fetchService";
import ConfirmAlert from '../ConfirmAlert'
import {useModal} from '../../../hooks/useModal'
import NewRegisModal from '../../../components/global/NewRegisModal'
import moment from 'moment'
import DStep01Modal from '../Diary/DStep01Modal'

const ReceiptListModalWrap = styled.div`
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
            width: 63px;
            text-align-last: justify;
          }
        }
        &:nth-child(2) {
          margin-left: 15px;
        }
        dt {
          letter-spacing: -0.03em;
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
            width: calc(100% - 63px);
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
    .primary-btn-wrap {
      position: relative;
      .btn-state-wrap {
        position: absolute;
        left: 0;
        bottom: calc(100% + 5px);
        width: 100%;
        padding: 14px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: red;
        background-color: #fff;
        border: 2px solid #1f319d;
        border-radius: 10px;
        box-shadow : 3px 3px 15px rgba(28, 27, 31, 0.2);
        li {
          &:not(:last-child) {
            margin-bottom: 5px;
          }
          button {
            padding: 7px 16px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
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
              font-size: 12px;
              font-weight: 700;
            }
          }
        }
      }
    }
    & > *:not(:last-child) {
        margin-right: 10px;
      }
    > button {
      cursor: pointer;
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
const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999999999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
`

const ReceiptListModal = ({ item }) => {
  const modalData = {
    title: 'ConfirmAlert',
    callback: () => alert('Modal Callback()'),
  }

  const {openModal, closeModal} = useModal()
  const [changeStateWrap, setChangeStateWrap] = useState(false);
  const [receipt, setReceipt] = useRecoilState(receiptAtom);
  const [alertState, setAlertState] = useState({
    state: false,
    type: '',
  })

  const changeState = () => setChangeStateWrap(prev => !prev);

  const updateState = (value) => {
    fetchService('/receipt/updateStatus', 'post', {일련번호: item.no, 처리상태: value})
      .then(() => {
        const tempReceipt = [...receipt]
        const copy = {...receipt.filter(it => it.no === item.no)[0]}
        const idx = receipt.indexOf(receipt.filter(it => it.no === item.no)[0])
        copy.state = value
        tempReceipt[idx] = copy
        setReceipt(tempReceipt)
        setChangeStateWrap(false)
        closeModal()
        alert(value + ' 상태로 변경 되었습니다.')
      })
  }

  const alertSubmit = () => {
    switch (alertState.type){
      case '수정' :
        openModal({
          ...modalData,
          content: <NewRegisModal item={item} editable={true}/>
        })
        break
      case '전화' :
        fetchService('/receipt/detail', 'post', {일련번호: item.no})
          .then(res => {
            if(res.data[0].연락처){
              window.location.href = `tel:${res.data[0].연락처}`
            }else{
              alert('전화번호가 없습니다.')
            }
          })
        break
      case '삭제' :
        fetchService('/receipt/delete', 'post', {일련번호 : item.no})
          .then((res) => {
            console.log(res)
            window.location.reload()
          })
        break
      default :
        break
    }
    alertCancel()
  }
  const alertCancel = () => {
    setAlertState({
      state: false,
      type: ''
    })
  }
  const updateAlert = (type) => {
    setAlertState({
      state: true,
      type: type
    })
  }

  return (
    <ReceiptListModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>NO.</dt>
            <dd>{item.no}</dd>
          </dl>
          <dl>
            <dt>Date.</dt>
            <dd>{moment(item.date).format('YYYY-MM-DD')}</dd>
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
            <dd>{item.regionSecond}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>현 장 명</dt>
            <dd className="oneLine">{item.regionFirst}</dd>
          </dl>
        </li>
        {
          item.manager && (
            <li>
              <dl>
                <dt>현 장 담 당 자</dt>
                <dd>{item.현장담당자}</dd>
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
        <div className="primary-btn-wrap">
          <button className="primary-btn" onClick={changeState}>접수상태변경</button>
          {
            changeStateWrap && (<ul className="btn-state-wrap">
              <li>
                <button className="ready" onClick={() => updateState('접수대기')}>
                  <i></i>
                  <span>접수대기</span>
                </button>
              </li>
              <li>
                <button className="add"  onClick={() => openModal({ ...modalData, content: <NewRegisModal item={{no: item.no}} confirm={true}/> })
                }>
                  <i></i>
                  <span>접수완료</span>
                </button>
              </li>
              <li>
                <button className="done" onClick={() => openModal({ ...modalData, content: <DStep01Modal no={item.no}/> })}>
                  <i></i>
                  <span>처리완료</span>
                </button>
              </li>
              <li>
                <button className="cancel" onClick={() => updateState('접수취소')} >
                  <i></i>
                  <span>접수취소</span>
                </button>
              </li>
            </ul>)
          }
        </div>
        <button className="modify-btn" onClick={() => updateAlert('수정')}>수정</button>
        <button className="call-btn" onClick={() => updateAlert('전화')}>
          <img src="../icons/modal-call-icon.png" alt="call icon" />
        </button>
        <button className="del-btn" onClick={() => updateAlert('삭제')}>
          <img src="../icons/modal-del-icon.png" alt="del icon" />
        </button>
      </div>
      {
        alertState.state && <AlertOverlay onClick={() => {
          alertCancel()
        }}>
          <ConfirmAlert
            client={item.company}
            site={item.regionFirst}
            text={alertState.type}
            submit={alertSubmit}
            cancel={alertCancel}/>
        </AlertOverlay>
      }
    </ReceiptListModalWrap>
  )
}

export default ReceiptListModal;
