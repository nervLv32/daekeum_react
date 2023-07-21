import React, { useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";
import RPC03Step01Modal from "./RPC03Step01Modal";
import RPC03Step03Modal from "./RPC03Step03Modal";

import {useRecoilState} from 'recoil'
import {exportDocumentBody, firstExportDocuBody} from '../../../../../recoil/reportAtom'


const RPC03Step02ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC03Step02ModalBody = styled.div`
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

const DetailInfoListWrap = styled.ul`
  li {
    padding-top: 10px;
    background-color: #EBECEF;
    > div {
      background-color: #fff;
      padding: 15px 30px;
      display: flex;
      align-items: center;
      flex-wrap : wrap;
      dl {
        width: calc(50% - 15px / 2);
        display: flex;
        align-items: center;
        padding: 5px 0;
        border-bottom: 1px solid #d9d9d9;
        &:nth-child(odd) {
          margin-right: 15px;
        }
        dt {
          font-weight: 500;
          font-size: 12px;
          color: #1c1b1f;
          min-width: 70px;
        }
        dd {
          width: calc(100% - 70px);
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
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


const RPC03Step02Modal = () => {

  const { openModal, closeModal } = useModal();
  const [body, setBody] = useRecoilState(exportDocumentBody)

  console.log(body)

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 입고요청서 케이스의 두번째 *******/
  return <RPC03Step02ModalWrap>
    <RPModalTop title="입고요청서" />
    <RPStepDeps
      dep="dep2"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="결제조건"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC03Step02ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">거래처 현황</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>위약여부</dt>
              <dd>
                <input placeholder="위약여부를 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>계약개월</dt>
              <dd>
                <input placeholder="계약개월을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>금액</dt>
              <dd>
                <input placeholder="금액을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>사용개월</dt>
              <dd>
                <input placeholder="사용개월을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>운임조건</dt>
              <dd>
                <input placeholder="운임조건을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>운임청구방식</dt>
              <dd>
                <input placeholder="운임청구방식을 입력하세요" />
              </dd>
            </dl>
          </li>
          <li className="textarea-li">
            <dl>
              <dt>비고</dt>
              <dd>
                <textarea />
              </dd>
            </dl>
          </li>
        </InfoList>
      </CustomerStatusWrap>

      <DetailInfoListWrap>
        <li>
          <div>
            <dl>
              <dt>실적NO</dt>
              <dd>47048</dd>
            </dl>
            <dl>
              <dt>사업구분</dt>
              <dd>세륜기</dd>
            </dl>
            <dl>
              <dt>매출타입</dt>
              <dd>회수</dd>
            </dl>
            <dl>
              <dt>입고예정일</dt>
              <dd>2022-01-04</dd>
            </dl>
            <dl>
              <dt>DKNO</dt>
              <dd>B22122904</dd>
            </dl>
            <dl>
              <dt>MCNO</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>전압</dt>
              <dd>380</dd>
            </dl>
            <dl>
              <dt>방향</dt>
              <dd>정방향</dd>
            </dl>
            <dl>
              <dt>모델</dt>
              <dd>박스(0.9)</dd>
            </dl>
            <dl>
              <dt>일시불구분</dt>
              <dd>일시불</dd>
            </dl>
            <dl>
              <dt>임대료</dt>
              <dd>13,500,000</dd>
            </dl>
          </div>
        </li>
        <li>
          <div>
            <dl>
              <dt>실적NO</dt>
              <dd>47048</dd>
            </dl>
            <dl>
              <dt>사업구분</dt>
              <dd>세륜기</dd>
            </dl>
            <dl>
              <dt>매출타입</dt>
              <dd>회수</dd>
            </dl>
            <dl>
              <dt>입고예정일</dt>
              <dd>2022-01-04</dd>
            </dl>
            <dl>
              <dt>DKNO</dt>
              <dd>B22122904</dd>
            </dl>
            <dl>
              <dt>MCNO</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>전압</dt>
              <dd>380</dd>
            </dl>
            <dl>
              <dt>방향</dt>
              <dd>정방향</dd>
            </dl>
            <dl>
              <dt>모델</dt>
              <dd>박스(0.9)</dd>
            </dl>
            <dl>
              <dt>일시불구분</dt>
              <dd>일시불</dd>
            </dl>
            <dl>
              <dt>임대료</dt>
              <dd>13,500,000</dd>
            </dl>
          </div>
        </li>
      </DetailInfoListWrap>

      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step01Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step03Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC03Step02ModalBody>
  </RPC03Step02ModalWrap>
}

export default RPC03Step02Modal;