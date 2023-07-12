import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";

const SearchRegionModalWrap = styled.div`
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
    padding-bottom: 120px;
    background-color: #fff;
    .sector-wrap {
      ul {
        display: flex;
        flex-wrap : wrap;
        &.sector1 {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid #9DA2AE;
          li {
            background: #EFF2FF;
            &.active {
              color: #fff;
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
            }
          }
        }
        &.sector2 {
          li {
            background: #F7F7F7;
            border: 1px solid #E6E6E6;
            &.active {
              color: #fff;
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
            }
          }
        }
        li {
          width: calc(33.333% - 16px / 3);
          border-radius: 10px;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          margin-right: 8px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          &:nth-child(n + 4) {
            margin-top: 8px;
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

const SearchRegionModal = () => {
  /* ****** 지역별조회 모달 ****** */
  const { closeModal } = useModal();

  const [sector1, setSector1] = useState("수도권A");
  const [sector2, setSector2] = useState("");

  return (
    <SearchRegionModalWrap>
      <div className="modal-top">
        <h6 className="title">지역별 조회</h6>
      </div>
      <div className="modal-body">
        <div className="sector-wrap">
          <ul className="sector1">
            <li>수도권A</li>
            <li className="active">수도권B</li>
            <li>대구</li>
          </ul>
          <ul className="sector2">
            <li>인천</li>
            <li>경기남부</li>
          </ul>
        </div>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step03Modal /> })
      }}>적용</button>
       <button className="del-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step01Modal /> })
      }}>취소</button>
      </ModalBtm>
    </SearchRegionModalWrap>
  )
}

export default SearchRegionModal;
