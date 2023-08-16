import React, { useEffect, useState } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0303Modal from "../../documentModal/Case03/RPCase0303Modal";
import RPC03Step02Modal from "./RPC03Step02Modal";

import {useRecoilState, useRecoilValue} from 'recoil';
import {exportDocumentBody, firstExportDocument} from '../../../../../recoil/reportAtom'
import fetchService from '../../../../../util/fetchService';
import {DateFormat} from '../../../../../util/dateFormat';
import ClientDetail from '../../../../../components/clientDetail';
import {CommaPrice} from '../../../../../util/commaPrice';
import userAtom from '../../../../../recoil/userAtom'

const RPC03Step01ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC03Step01ModalBody = styled.div`
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

const RPC03Step01Modal = () => {

  const { openModal, closeModal } = useModal();
  const {auth} = useRecoilValue(userAtom)
  const [body, setBody] = useRecoilState(exportDocumentBody);
  const [infoType, setInfoType] = useState('현장')
  const exportDoc = useRecoilValue(firstExportDocument);

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  useEffect(() => {
    const fetchData = async () => {
      setBody({
        ...body,
        UserInfo: {
          DeptCd: auth.부서코드,
          DeptNm: auth.부서명,
          EmpNm: auth.한글이름,
          EmpNo: auth.사원코드,
          회사코드: auth.회사코드,
          DIV_CD: auth.DIV_CD,
          usergwid: auth.usergwid
        },
        거래처현황: {
          ...(await fetchService('/approval/clientCurrent', 'post', {거래처코드: exportDoc.client.거래처코드, 현장코드: exportDoc.site.현장코드})).data[0]
        },
        거래처세부: [
          ...(await fetchService('/approval/clientDetail', 'post',  {거래처코드: exportDoc.client.거래처코드, 현장코드: exportDoc.site.현장코드})).data
        ]
      })
    }

    fetchData()

    console.log(exportDoc)
  }, []);

  /******* 입고요청서 케이스의 첫번째 *******/
  return <RPC03Step01ModalWrap>
    <RPModalTop title="입고요청서" />
    <RPStepDeps
      dep="dep1"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="청구·수금현황"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC03Step01ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">거래처 현황</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>거래처명</dt>
              <dd>{body.거래처현황.업체명 || ''}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>현장명</dt>
              <dd>{body.거래처현황.현장명 || ''}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>고객분류</dt>
              <dd>{(body.거래처현황.고객분류 || []).map((it, key) => `${key !== 0 && it ? ' / ' : ''}${it ? it : ''}`)}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>지역분류</dt>
              <dd>{exportDoc.site.지역분류}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>미수총계</dt>
              <dd>{CommaPrice(body.거래처현황.미수총계)}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>현장미수</dt>
              <dd>{CommaPrice(body.거래처현황.현장미수)}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>최종거래일</dt>
              <dd>{DateFormat(new Date(body.거래처현황.최종거래일)).substr(0,10)}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>접점</dt>
              <dd>{body.거래처현황.접점}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>등급</dt>
              <dd>{body.거래처현황.등급}</dd>
            </dl>
          </li>
        </InfoList>
      </CustomerStatusWrap>

      <CustomerInfoWrap>
        {console.log(body)}
        {
          body.거래처현황.거래처코드 ?
            <>
              <div className="title-wrap">
                <h6 className="title-text">거래처 세부정보</h6>
                <div className='btn-wrap'>
                  {
                    body.거래처세부.map((it, key) => {
                      return <button key={key} className={infoType === it.구분 ? 'active' : ''} onClick={() => setInfoType(it.구분)}> {it.구분} </button>
                    })
                  }
                </div>
              </div>
              {
                body.거래처세부[0].구분 !== '' && <ClientDetail item={body.거래처세부.filter(it => it.구분 === infoType)[0]} />
              }
              </>:123
        }
      </CustomerInfoWrap>
      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0303Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step02Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC03Step01ModalBody>
  </RPC03Step01ModalWrap>
}

export default RPC03Step01Modal;
