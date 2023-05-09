import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";
import RPCase0402Modal from "../../documentModal/Case04/RPCase0402Modal"
import RPC04Step02Modal from "./RPC04Step02Modal";



const RPC04Step01ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC04Step01ModalBody = styled.div`
  overflow-y: scroll;
  padding-bottom: 70px;
`

const CustomerStatusWrap = styled.div`
  padding-bottom: 10px;
  background-color: #ebecef;
  .title-wrap {
    height: 40px;
    padding: 8px 30px;
    background-color: #fff;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    .title-text {
      font-size: 14px;
      font-weight: 700;
      color: #1c1b1f;
    }
  }
`

const CustomerInfoWrap = styled.div`
  .title-wrap {
    height: 40px;
    padding: 0 30px;
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
    button {
      width: 60px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      border: 1px solid #9da2ae;
      border-radius: 5px;
      color: #555;
      font-weight: 400;
      font-size: 12px;
      &:first-child {
        margin-right: 4px;
      }
      &.active {
        color: #1f319d;
        background-color: #EFF2FF;
      }
    }
  }
`

const InfoList = styled.ul`
  background-color: #fff;
  li {
    height: 30px;
    padding: 0 30px;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    dl {
      display: flex;
      align-items: center;
      color: #1c1b1f;
      font-size: 12px;
      dt {
        min-width: 70px;
        font-weight: 500;
      }
      dd {
        font-weight: 400;
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

const RPC04Step01Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 수리기입고요청서 케이스의 첫번째 *******/
  return <RPC04Step01ModalWrap>
    <RPModalTop title="수리기입고요청서" />
    <RPStepDeps
      dep="dep1"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="청구·수금현황"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC04Step01ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">거래처 현황</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>거래처명</dt>
              <dd>(주)대금지오웰</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>현장명</dt>
              <dd>호남고속도로 첨단방면 연결로 개설공사 2구간</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>고객분류</dt>
              <dd>고객분류</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>지역분류</dt>
              <dd>인천-미추홀구</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>미수총계</dt>
              <dd>1,400,000</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>현장미수</dt>
              <dd>1,400,000</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>최종거래일</dt>
              <dd>2023-02-08</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>접점</dt>
              <dd>등급</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>등급</dt>
              <dd>A</dd>
            </dl>
          </li>
        </InfoList>
      </CustomerStatusWrap>

      <CustomerInfoWrap>
        <div className="title-wrap">
          <h6 className="title-text">거래처 현황</h6>
          <div className="btn-wrap">
            <button className="active">본사</button>
            <button>현장</button>
          </div>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>전화번호</dt>
              <dd>031-1234-5679</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>담당자</dt>
              <dd>정명길</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>직위</dt>
              <dd>담당자</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>휴대전화</dt>
              <dd>010-1234-5679</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>주소</dt>
              <dd>경기도 고양시 덕양구 덕은동 427-1번지</dd>
            </dl>
          </li>
        </InfoList>
      </CustomerInfoWrap>
      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0402Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC04Step02Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC04Step01ModalBody>
  </RPC04Step01ModalWrap>
}

export default RPC04Step01Modal;