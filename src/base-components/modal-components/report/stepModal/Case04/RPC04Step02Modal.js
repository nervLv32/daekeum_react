import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";
import RPC04Step01Modal from "./RPC04Step01Modal";
import RPC04Step03Modal from "./RPC04Step03Modal";
import {useRecoilState} from 'recoil'
import {firstExportDocument} from '../../../../../recoil/reportAtom'
import ContList from '../../../../../components/contList'

const RPC04Step02ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`
const RPC04Step02ModalBody = styled.div`
  overflow-y: scroll;
  padding-bottom: 70px;
`
const CustomerStatusWrap = styled.div`
  background-color: #ebecef;
  .title-wrap {
    height: 40px;
    padding: 8px 30px;
    background-color: #fff;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-text {
      font-size: 14px;
      font-weight: 700;
      color: #1c1b1f;
    }
    .list-tab {
      display: flex;
      align-items: center;
      li {
        &:not(:last-child) {
          margin-right: 5px;
        }
        &.active {
          background-color: #0129ff;
        }
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: rgba(0,0,0, 0.2);
        text-align: center;
        line-height: 20px;
        color: #f6f6f6;
        font-family: var(--font-mont);
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`
const ModalBtm = styled.div`
  padding: 17px 30px;
  background-color: #f7f7f7;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
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
    color: #1c1b1f;
    background-color: #fff;
  }
`

const RPC04Step02Modal = () => {

  const { openModal, closeModal } = useModal();
  const [firstDoc, setFirstDoc] = useRecoilState(firstExportDocument)
  const [selectId, setSelectId] = useState(0)

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  const editEquip = (item) => {
    const copy = [...firstDoc.equip]
    copy[selectId] = item
    setFirstDoc({
      ...firstDoc,
      equip: [...copy]
    })
  }
  /******* 수리기입고요청서 케이스의 두번째 *******/
  return <RPC04Step02ModalWrap>
    <RPModalTop title="수리기입고요청서" />
    <RPStepDeps
      dep="dep2"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="청구·수금현황"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC04Step02ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">계약사항</h6>
          <ul className="list-tab">
            {
              firstDoc.equip.map((_, key) => <li className={key === selectId ? 'active' : ''}
                                                 key={key} onClick={() => setSelectId(key)}>{key + 1}</li>)
            }
          </ul>
        </div>
        <ContList item={firstDoc.equip[selectId]} editEquip={editEquip}/>
      </CustomerStatusWrap>

      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC04Step01Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC04Step03Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC04Step02ModalBody>
  </RPC04Step02ModalWrap>
}

export default RPC04Step02Modal;
