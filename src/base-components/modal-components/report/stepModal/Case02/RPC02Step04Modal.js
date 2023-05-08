import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";

import RPC02Step03Modal from "./RPC02Step03Modal";

const RPC02Step04ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC02Step04ModalBody = styled.div`
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
  }
`


const InfoList = styled.ul`
  background-color: #fff;
  li {
    height: 34px;
    padding: 0 30px;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    input[type="checkbox"] {
      width: 15px;
      height: 15px;
      margin: 0;
      background: url('../icons/report-checkbox-icon.png') no-repeat 50% center / cover;
      &:checked {
        background: url('../icons/report-checkbox-icon-checked.png') no-repeat 50% center / cover;
      }
    }
    label {
      cursor: pointer;
      font-weight: 500;
      font-size: 12px;
      color: #1c1b1f;
      margin-left: 10px;
    }
    &.textarea-li {
      height: auto;
      padding-top: 14px;
      padding-bottom: 55px;
      dl {
        width: 100%;
        dt {
          margin-bottom: 8px;
        }
        dd {
          width: 100%;
          textarea {
            resize: none;
            width: 100%;
            height: 80px;
            border: 1px solid #d9d9d9;
            font-size: 12px;
            font-weight: 400;
            color: #1c1b1f;
            padding: 4px;
            &:focus {
              outline: none;
              border-color: #1c1b1f;
            }
          }
        }
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


const RPC02Step04Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 출고요청서(신사업) 케이스의 네번째 *******/
  return <RPC02Step04ModalWrap>
    <RPModalTop title="출고요청서" />
    <RPStepDeps
      dep="dep4"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="결제조건"
      dep4title="신규사업"
    />
    {/* 거래처 현황 */}
    <RPC02Step04ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">청구현황 및 수금현황</h6>
        </div>
        <InfoList>
          <li>
            <input name="v01" id="v01" type="checkbox" />
            <label htmlFor="v01">결제방법</label>
          </li>
          <li>
            <input name="v02" id="v02" type="checkbox" />
            <label htmlFor="v02">개월</label>
          </li>
          <li>
            <input name="v03" id="v03" type="checkbox" />
            <label htmlFor="v03">메일</label>
          </li>
          <li>
            <input name="v04" id="v04" type="checkbox" />
            <label htmlFor="v04">담당자</label>
          </li>
          <li>
            <input name="v05" id="v05" type="checkbox" />
            <label htmlFor="v05">연락처</label>
          </li>
          <li className="textarea-li">
            <dl>
              <dt>특기사항</dt>
              <dd>
                <textarea />
              </dd>
            </dl>
          </li>
        </InfoList>

      </CustomerStatusWrap>

      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC02Step03Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        // FIX: 서류 상신 api
      }}>서류상신</button>
      </ModalBtm>
    </RPC02Step04ModalBody>
  </RPC02Step04ModalWrap>
}

export default RPC02Step04Modal;