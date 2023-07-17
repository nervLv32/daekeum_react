import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep01Modal from './DStep01Modal'
import DStep03Modal from './DStep03Modal'
import fetchService from "../../../util/fetchService";
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";
import moment from "moment";

const ModalWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 70vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 1rem -0.4rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 2rem 2rem 0px 0px;
  .title {
    padding: 1.5rem 0;
    text-align: center;
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1c1b1f;
    }
  }
  .step-list {
    background-color: #f7f7f7;
    padding: 1.5rem 3rem;
    ul {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 0.1rem;
        background-color: #9da2ae;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      li {
        position: relative;
        z-index: 9;
        &::before {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          right: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          left: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          display: block;
          width: 1.8rem;
          height: 1.8rem;
          line-height: 1.8rem;
          border-radius: 50%;
          background: #9da2ae;
          text-align: center;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          &.on {
            box-sizing: content-box;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
            border: 0.2rem solid #A9B5FF;
          }
        }
      }
    }
  }
  .modal-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 3rem 3rem 2.5rem;
    .input-info {
      width: 100%;
      height: auto;
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
      &.w50 {
        width: calc(50% - 0.4rem);
      }
      dt {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: 500;
        color: #1c1b1f;
        margin-bottom: 0.4rem;
        position: relative;
        &.essential {
          &::after {
            content: '';
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            background-color: #fb0606;
            position: absolute;
            right: -0.6rem;
            top: 0;
          }
        }
      }
      dd {
        width: 100%;
        height: auto;
        input {
          width: 100%;
          height: 3.3rem;
          background: #fff;
          border: 0.1rem solid #8885CB;
          border-radius: 1rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: #1c1b1f;
          padding: 0 1.5rem;
          &.bg {
            background: #F7F7F7;
          }
          &::placeholder {
            font-size: 1.2rem;
            font-weight: 500;
            color: #9da2ae;
          }
        }
      }
    }
  }
`

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1.7rem 3rem;
  background: #F7F7F7;
  border-radius: 2rem 2rem 0px 0px;
  button {
    width: calc(50% - 0.5rem);
    height: 3.4rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    &.btn-outline-gray {
      color: #1F319D;
      background: #FFFFFF;
      border: 0.1rem solid #9DA2AE;
    }
    &.btn-blue {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      color: #f7f7f7;
    } 
  }
`

const DStep02Modal = () => {

  const { openModal, closeModal } = useModal();

  // 업체정보 Recoil
  const [journal, setJournal] = useRecoilState(journalAtom);

  // 현장상세 가져오기
  const [site, setSite] = useState();
  const siteDetail = () => {
    fetchService('/enroll/siteDetail', 'post', {
      거래처코드: journal?.companyInfo?.거래처코드,
      현장코드: journal?.companyInfo?.현장코드
    }).then((res) => {
      setSite(res?.data[0])
    })
  };
  useEffect(() => {
    siteDetail();
  }, []);

  const modalData = {
    title: 'DStep02Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  return (
    <ModalWrap>
      <div className="title">
        <h3>일지작성</h3>
      </div>
      <div className="step-list">
        <ul>
          <li>
            <span>1</span>
          </li>
          <li>
            <span className="on">2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span>4</span>
          </li>
        </ul>
      </div>
      <div className="modal-body">
        <dl className="input-info">
          <dt>업체명</dt>
          <dd>
            <input type="text" className="bg" defaultValue={journal?.companyInfo?.거래처명} disabled />
          </dd>
        </dl>
        <dl className="input-info">
          <dt>현장명</dt>
          <dd>
            <input type="text" className="bg" defaultValue={site?.현장명} disabled />
          </dd>
        </dl>
        <dl className="input-info">
          <dt>현장담당자</dt>
          <dd>
            <input type="text" className="bg" defaultValue={site?.담당자} disabled />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">현장 연락처</dt>
          <dd>
            <input type="text" className="bg" defaultValue={site?.전화번호} disabled />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">현장 담당자 연락처</dt>
          <dd>
            <input type="text" className="bg" defaultValue={site?.휴대폰} disabled />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">접수일시</dt>
          <dd>
            <input type="text" className="bg" defaultValue={moment(site?.등록일).format('YYYY-MM-DD')} disabled />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">처리일시</dt>
          <dd>
            <input type="text" />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">도착일시</dt>
          <dd>
            <input type="text" />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">종료일시</dt>
          <dd>
            <input type="text" />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">점검요원</dt>
          <dd>
            <input type="text" className="bg" />
          </dd>
        </dl>
        <dl className="input-info w50">
          <dt className="essential">사용자 연락처</dt>
          <dd>
            <input type="text" className="bg" />
          </dd>
        </dl>
      </div>
      <BtnWrap>
        <button 
          type="button" 
          className="btn-outline-gray"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep01Modal /> })
          }}
        >이전</button>
        <button 
          type="button" 
          className="btn-blue"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep03Modal /> })
          }}
        >다음</button>
      </BtnWrap>
    </ModalWrap>
  )
}

export default DStep02Modal;