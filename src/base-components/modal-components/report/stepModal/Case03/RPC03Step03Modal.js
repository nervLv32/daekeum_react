import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";
import RPC03Step02Modal from "./RPC03Step02Modal";
import RPC03Step04Modal from "./RPC03Step04Modal";


const RPC03Step03ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC03Step03ModalBody = styled.div`
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
  li {
    height: 34px;
    padding: 0 30px;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &.textarea-li {
      height: auto;
      padding: 14px 30px;
      dl {
        flex-direction: column;
        align-items: flex-start;
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
    dl {
      display: flex;
      align-items: center;
      width: 100%;
      dt {
        min-width: 80px;
        font-weight: 500;
        font-size: 12px;
        color: #1c1b1f;
      }
      dd {
        width: calc(100% - 80px);
        input {
          width: 100%;
          box-sizing: border-box;
          border: 0 none;
          font-size: 12px;
          font-weight: 400;
          color: #1c1b1f;
          &:focus {
            outline: none;
          }
          &::placeholder {
            color: #9da2ae;
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


const RPC03Step03Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 입고요청서 케이스의 세번째 *******/
  return <RPC03Step03ModalWrap>
    <RPModalTop title="입고요청서" />
    <RPStepDeps
      dep="dep3"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="결제조건"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC03Step03ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">청구현황 및 수금현황</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>기간시작</dt>
              <dd>
                <input placeholder="위약여부를 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>기간종료</dt>
              <dd>
                <input placeholder="계약개월을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>DKNO</dt>
              <dd>
                <input placeholder="금액을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>청구금액</dt>
              <dd>
                <input placeholder="청구금액을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>부가세포함</dt>
              <dd>
                <input placeholder="운임조건을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>발행일</dt>
              <dd>
                <input placeholder="운임청구방식을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>입금번호</dt>
              <dd>
                <input placeholder="운임청구방식을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>입금일</dt>
              <dd>
                <input placeholder="운임청구방식을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>수금액</dt>
              <dd>
                <input placeholder="운임청구방식을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li className="textarea-li">
            <dl>
              <dt>업무협의사항(미수금처리)</dt>
              <dd>
                <textarea />
              </dd>
            </dl>
          </li>
          <li className="textarea-li">
            <dl>
              <dt>장비파손내역</dt>
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
        openModal({ ...modalData, content: <RPC03Step02Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step04Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC03Step03ModalBody>
  </RPC03Step03ModalWrap>
}

export default RPC03Step03Modal;