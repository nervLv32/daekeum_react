import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";

const ReceiptCheckModalWrap = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
  .modal-top {
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    padding: 15px 20px 15px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom :1px solid #e9e9e9;
    .title {
      font-weight: 700;
      font-size: 16px;
      color: #1c1b1f;
    }
  }
  .modal-body {
    padding: 25px 30px;
    padding-bottom: 70px;
    background-color: #fff;
  }
`

const InputList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &.required {
      input {
        background-color: #EFF2FF;
      }
    }
    width: 100%;
    p {
      font-weight: 500;
      font-size: 11px;
      color: #1c1b1f;
      margin-bottom: 4px;
      display : inline-block;
      &.red-point {
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background-color: #FB0606;
          position: absolute;
          top: 0;
          right: -8px;
          border-radius: 50%;
        }
      }
    }
    input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #8885CB;
      background-color: #fff;
      padding: 10px 15px;
      height: 35px;
      border-radius: 10px;
      font-family: var(--font-mont);
      color: #1c1b1f;
      &::placeholder {
        color: #9DA2AE;
      }
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #8885CB;
      background-color: #fff;
      padding: 10px 15px;
      height: 120px;
      resize: none;
      border-radius: 10px;
      font-family: var(--font-mont);
      color: #1c1b1f;
      &::placeholder {
        color: #9DA2AE;
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

const ReceiptCheckModal = () => {
  /* ****** 5_1 접수확인등록 모달 ****** */
  const { closeModal } = useModal();
  return (
    <ReceiptCheckModalWrap>
      <div className="modal-top">
        <h6 className="title">접수확인등록</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="required">
            <p>접수번호</p>
            <input type="text"  defaultValue="41385"/>
          </li>
          <li className="required">
            <p>접수일</p>
            <input type="text"  defaultValue="2023. 03. 13 02:55:15 "/>
          </li>
          <li>
            <p>업체명</p>
            <input type="text"  defaultValue="주식회사 대금지오웰"/>
          </li>
          <li>
            <p>접수번호</p>
            <input type="text"  defaultValue="41385"/>
          </li>
          <li>
            <p>지역</p>
            <input type="text"  defaultValue="인천-미추홀구"/>
          </li>
          <li>
            <p>주소</p>
            <input type="text"  defaultValue="인천광역시 미추홀구 장고개로 92번길 38"/>
          </li>
          <li>
            <p>현장담당자</p>
            <input type="text"  defaultValue="정명길"/>
          </li>
          <li>
            <p>현장연락처</p>
            <input type="text"  defaultValue="010-6476-1544"/>
          </li>
          <li>
            <p>접수내용</p>
            <textarea defaultValue="세륜기 12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청" />
          </li>
        </InputList>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step03Modal /> })
      }}>저장</button>
       <button className="del-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step01Modal /> })
      }}>취소</button>
      </ModalBtm>
    </ReceiptCheckModalWrap>
  )
}

export default ReceiptCheckModal;