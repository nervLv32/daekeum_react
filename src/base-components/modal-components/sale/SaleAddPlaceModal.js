import React, { useState } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";

const SaleAddPlaceModalWrap = styled.div`
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
    &.full {
      width: 100%;
    }
    &.required {
      input {
        background-color: #EFF2FF;
      }
    }
    width: calc(50% - 4px);
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
      background-color: #f6f6f6;
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
      background-color: #f6f6f6;
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

const SaleAddPlaceModal = () => {
  const { closeModal } = useModal();
  return (
    <SaleAddPlaceModalWrap>
      <div className="modal-top">
        <h6 className="title">신규현장등록</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="full required">
            <p>현장코드</p>
            <input type="text"  placeholder="현장코드를 입력하세요"/>
          </li>
          <li className="full">
            <p className="red-point">지역분류</p>
            <input type="text"  placeholder="현장명을 입력하세요"/>
          </li>
          <li>
            <p>담당자</p>
            <input type="text"  placeholder="담당자를 입력하세요"/>
          </li>
          <li>
            <p>직위</p>
            <input type="text"  placeholder="직위를 입력하세요"/>
          </li>
          <li>
            <p>휴대폰</p>
            <input type="text"  placeholder="휴대폰을 입력하세요"/>
          </li>
          <li>
            <p>이메일</p>
            <input type="text"  placeholder="이메일을 입력하세요"/>
          </li>
          <li>
            <p>전화번호</p>
            <input type="text"  placeholder="전화번호를 입력하세요"/>
          </li>
          <li>
            <p>팩스번호</p>
            <input type="text"  placeholder="팩스번호를 입력하세요"/>
          </li>
          <li className="full">
            <p>주소</p>
            <input type="text"  placeholder="주소를 입력하세요"/>
          </li>
          <li>
            <p>종료예정일</p>
            <input type="text"  placeholder="날짜를 입력하세요"/>
          </li>
          <li>
            <p>설치예정일</p>
            <input type="text"  placeholder="날짜를 입력하세요"/>
          </li>
          <li>
            <p>알림</p>
            <input type="text"  placeholder="알림을 입력하세요"/>
          </li>
          <li>
            <p>고객분류</p>
            <input type="text"  placeholder="고객분류를 입력하세요"/>
          </li>
          <li>
            <p className="red-point">지역분류</p>
            <input type="text"  placeholder="지역분류를 입력하세요"/>
          </li>
          <li>
            <p className="red-point">현장분류</p>
            <input type="text"  placeholder="현장분류를 입력하세요"/>
          </li>
          <li>
            <p>고객접점</p>
            <input type="text"  placeholder="고객접점을 입력하세요"/>
          </li>
          <li>
            <p>담당센터</p>
            <input type="text"  placeholder="담당센터를 입력하세요"/>
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
    </SaleAddPlaceModalWrap>
  )
}

export default SaleAddPlaceModal;