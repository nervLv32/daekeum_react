import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep01Modal from './DStep01Modal'
import DStep03Modal from './DStep03Modal'
import fetchService from "../../../util/fetchService";
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";
import userAtom from "../../../recoil/userAtom";
import moment from "moment";
import SingleDate from "../../../components/calander/SingleDate";

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
        span {
          display: block;
          width: 100%;
          height: 3.3rem;
          background: #fff;
          border: 0.1rem solid #8885CB;
          border-radius: 1rem;
          font-size: 1.2rem;
          line-height: 3.1rem;
          font-weight: 500;
          color: #1c1b1f;
          padding: 0 1.5rem;
          &.bg {
            background: #F7F7F7;
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

  // Modal
  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'DStep02Modal Modal',
    callback: () => alert('Modal Callback()'),
  };
  

  // 일지작성 recoil
  const [journal, setJournal] = useRecoilState(journalAtom);

  // 유저 recoil
  const [user, setUser] = useRecoilState(userAtom);

  // 캘린더
  const [type, setType] = useState("");
  const [isCalendar, setCalendar] = useState(false);
  const handleType = (t) => {
    setType(t)
    setCalendar(true)
  };
  const close = () => {
    setCalendar(false)
  };

  // 값 변경
  const handleChange = (key, value) => {
    setJournal({
      ...journal,
      step02: {
        ...journal.step02,
        [key]: value
      }
    })
  };
  const handleDateChange = (key, value) => {
    setJournal({
      ...journal,
      step02: {
        ...journal.step02,
        [key]: moment(value).format('YYYY-MM-DD')
      }
    })
    close()
  };

  // 현장상세 가져오기
  const siteDetail = () => {
    fetchService('/enroll/siteDetail', 'post', {
      거래처코드: journal?.companyInfo?.거래처코드,
      현장코드: journal?.companyInfo?.현장코드
    }).then((res) => {
      console.log(res)

      ////////////////오늘 날짜 가져오기/////////////////////
      const data = res?.data && res.data[0];
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month  + '-' + day;
      //////////////////////////////////////////////////////
      
      setJournal({
        ...journal,
        step02: {
          ...journal.step02,
          ...data,
          접수일: moment().format('YYYY-MM-DD'),
          처리일: dateString,
          도착일: dateString,
          종료일: dateString
        }
      })
    })
  };
  useEffect(() => {
    siteDetail();
  }, []);

  console.log(journal)

  return (
    <>
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
              <input type="text" className="bg" defaultValue={journal?.step02?.현장명} disabled />
            </dd>
          </dl>
          <dl className="input-info">
            <dt>현장담당자</dt>
            <dd>
              <input
                type="text"
                // value={journal?.step02?.담당자}
                // value={journal?.accountcode}
                // value={sites.담당자}
                onChange={(e) => handleChange('담당자', e.target.value)}
              />
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">현장 연락처</dt>
            <dd>
              <input
                type="text"
                value={journal?.step02?.전화번호}
                onChange={(e) => handleChange('전화번호', e.target.value)}
              />
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">현장 담당자 연락처</dt>
            <dd>
              <input
                type="text"
                value={journal?.step02?.휴대폰}
                onChange={(e) => handleChange('휴대폰', e.target.value)}
              />
            </dd>
          </dl>
          <dl className="input-info">
            <dt className="essential">현장 담당자 메일주소</dt>
            <dd>
              <input
                type="text"
                value={journal?.step02?.이메일}
                onChange={(e) => handleChange('이메일', e.target.value)}
              /></dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">접수일</dt>
            <dd>
              <input type="text" className="bg" defaultValue={journal?.step02?.접수일} disabled />
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">처리일</dt>
            <dd onClick={() => handleType("처리일")}>
              <span>{journal?.step02?.처리일 ? moment(journal?.step02?.처리일).format('YYYY-MM-DD') : '날짜를 선택해주세요'}</span>
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">도착일</dt>
            <dd onClick={() => handleType("도착일")}>
              <span>{journal?.step02?.도착일 ? moment(journal?.step02?.도착일).format('YYYY-MM-DD') : '날짜를 선택해주세요'}</span>
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">종료일</dt>
            <dd onClick={() => handleType("종료일")}>
              <span>{journal?.step02?.종료일 ? moment(journal?.step02?.종료일).format('YYYY-MM-DD') : '날짜를 선택해주세요'}</span>
            </dd>
          </dl>

          <dl className="input-info w50">
            <dt className="essential">점검요원</dt>
            <dd>
              <input
                type="text"
                //defaultValue={journal?.step02?.점검요원}
                value={user.auth.한글이름}
                onChange={e => handleChange('점검요원',e.target.value)}
              />
            </dd>
          </dl>
          <dl className="input-info w50">
            <dt className="essential">사용자 연락처</dt>
            <dd>
              <input
                type="text"
                defaultValue={journal?.step02?.사용자연락처}
                onChange={e => handleChange('사용자연락처',e.target.value)}
              />
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
      {
        isCalendar && (
          <SingleDate submit={handleDateChange} close={close} type={type} />
        )
      }
    </>
  )
}

export default DStep02Modal;
