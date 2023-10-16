import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";

import RPC03Step03Modal from "./RPC03Step03Modal";

import { useRecoilState, useRecoilValue } from 'recoil'
import { exportDocumentBody } from '../../../../../recoil/reportAtom'
import fetchService from "../../../../../util/fetchService";


const RPC03Step04ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC03Step04ModalBody = styled.div`
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

const InfoList = styled.ul`
  background-color: #fff;
  margin-bottom: 60px;
  li {
    height: 34px;
    padding: 0 30px;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    dl {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      dt {
        font-weight: 500;
        font-size: 12px;
        color: #1c1b1f;
      }
      .radio-wrap{
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      input[type="radio"] {
        width: 16px;
        height: 16px;
        margin: 0;
        background: url('../icons/report-radio-default.png') no-repeat 50% center / cover;
        cursor: pointer;
        &:checked {
          background: url('../icons/report-radio-checked.png') no-repeat 50% center / cover;
        }
      }
      label {
        margin-left: 5px;
        font-size: 12px;
        font-weight: 500;
        font-family: var(--font-mont);
        cursor: pointer;
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


const RPC03Step04Modal = () => {

  const { openModal, closeModal } = useModal();
  const [body, setBody] = useRecoilState(exportDocumentBody);

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  const updateValue = (key, value) => {
    setBody({
      ...body,
      축중기체크사항: {
        ...body.축중기체크사항,
        [key]: value
      }
    })
  }

  const validateInRequest = () => {
    fetchService('/approval/approvalSuliReq', 'post', body).then((res) => {
      window.alert(res.msg)
      if(res.msg === '동시 사용자가 있을수 있어서 종료합니다.'){
        window.location.reload();
        closeModal();
      }
    });
  }

  console.log(body)

  /******* 입고요청서 케이스의 네번째 *******/
  return <RPC03Step04ModalWrap>
    <RPModalTop title="입고요청서" />
    <RPStepDeps
      dep="dep4"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="결제조건"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC03Step04ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">청구현황 및 수금현황</h6>
        </div>
        <InfoList>
         <li>
          <dl>
            <dt>인디게이터</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.인디게이터 === 1}
                  onChange={(e) => updateValue('인디게이터', Number(e.target.value))}
                  name="indicator"
                  id="iy"
                />
                <label htmlFor="iy">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.인디게이터 === 0}
                  onChange={(e) => updateValue('인디게이터', Number(e.target.value))}
                  name="indicator"
                  id="in"
                />
                <label htmlFor="in">N</label>
              </div>
            </dd>
          </dl>
         </li>
         <li>
          <dl>
            <dt>계량판패드 #1</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.계량판패드1 === 1}
                  onChange={(e) => updateValue('계량판패드1', Number(e.target.value))}
                  name="g01"
                  id="gy"
                />
                <label htmlFor="gy">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.계량판패드1 === 0}
                  onChange={(e) => updateValue('계량판패드1', Number(e.target.value))}
                  name="g01"
                  id="gn"
                />
                <label htmlFor="gn">N</label>
              </div>
            </dd>
          </dl>
         </li>
         <li>
          <dl>
            <dt>계량판패드 #2</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.계량판패드2 === 1}
                  onChange={(e) => updateValue('계량판패드2', Number(e.target.value))}
                  name="g02"
                  id="g2y"
                />
                <label htmlFor="g2y">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.계량판패드2 === 0}
                  onChange={(e) => updateValue('계량판패드2', Number(e.target.value))}
                  name="g02"
                  id="g2n"
                />
                <label htmlFor="g2n">N</label>
              </div>
            </dd>
          </dl>
         </li>
         <li>
          <dl>
            <dt>렘프 4EA</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.램프4EA === 1}
                  onChange={(e) => updateValue('램프4EA', Number(e.target.value))}
                  name="lamp"
                  id="ly"
                />
                <label htmlFor="ly">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.램프4EA === 0}
                  onChange={(e) => updateValue('램프4EA', Number(e.target.value))}
                  name="lamp"
                  id="ln"
                />
                <label htmlFor="ln">N</label>
              </div>
            </dd>
          </dl>
         </li>
         <li>
          <dl>
            <dt>케이블 2EA</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.케이블2EA === 1}
                  onChange={(e) => updateValue('케이블2EA', Number(e.target.value))}
                  name="cable"
                  id="cy"
                />
                <label htmlFor="cy">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.케이블2EA === 0}
                  onChange={(e) => updateValue('케이블2EA', Number(e.target.value))}
                  name="cable"
                  id="cn"
                />
                <label htmlFor="cn">N</label>
              </div>
            </dd>
          </dl>
         </li>
         <li>
          <dl>
            <dt>충전어댑터</dt>
            <dd className="radio-wrap">
              <div className="y-wrap">
                <input
                  type="radio"
                  value={1}
                  checked={body.축중기체크사항.충전어댑터 === 1}
                  onChange={(e) => updateValue('충전어댑터', Number(e.target.value))}
                  name="charger"
                  id="chy"
                />
                <label htmlFor="chy">Y</label>
              </div>
              <div className="n-wrwap">
                <input
                  type="radio"
                  value={0}
                  checked={body.축중기체크사항.충전어댑터 === 0}
                  onChange={(e) => updateValue('충전어댑터', Number(e.target.value))}
                  name="charger"
                  id="chn"
                />
                <label htmlFor="chn">N</label>
              </div>
            </dd>
          </dl>
         </li>
        </InfoList>
      </CustomerStatusWrap>

      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step03Modal /> })
      }}>이전3</button>
        <button className="primary-btn" onClick={() => {
          validateInRequest()
        // FIX 서류 상신 API
      }}>서류상신3</button>
      </ModalBtm>
    </RPC03Step04ModalBody>
  </RPC03Step04ModalWrap>
}

export default RPC03Step04Modal;