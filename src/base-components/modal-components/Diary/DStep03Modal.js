import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep02Modal from './DStep02Modal'
import DStep04Modal from './DStep04Modal'
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";
import moment from "moment";
import SingleDate from "../../../components/calander/SingleDate";
import fetchService from "../../../util/fetchService";
import OptionSelectedMemo from "../../../components/optionSelector/OptionSelectorMemo";

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
    padding: 3rem 3rem 2.5rem;
    .input-info {
      width: 100%;
      height: auto;
      &:not(:last-of-type) {
        margin-bottom: 1.6rem;
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
        input, select {
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
        textarea {
          width: 100%;
          height: auto;
          min-height: 8.7rem;
          background: #fff;
          border: 0.1rem solid #8885CB;
          border-radius: 1rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: #1c1b1f;
          padding: 1rem 1.5rem;
          background-color: #fff;
          resize: none;
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

const DStep03Modal = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'DStep03Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  // 캘린더
  const [isCalendar, setCalendar] = useState(false);
  const close = () => {
    setCalendar(false)
  };

  // 일지작성 recoil
  const [journal, setJournal] = useRecoilState(journalAtom);
  const handleChange = (k, v) => {
    setJournal({
      ...journal,
      step03: {
        ...journal.step03,
        [k]: v
      }
    })
    close()
  };

  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    fetchService('/enroll/diaryCombo', 'get', {
      type: "처리구분"
    }).then((res) => {
      const list = res.data.map(item => ({
        ...item,
        value: item.관리내역명,
      }));
      setTypeList(list)
    })
  }, [])

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
              <span>2</span>
            </li>
            <li>
              <span className="on">3</span>
            </li>
            <li>
              <span>4</span>
            </li>
          </ul>
        </div>
        <div className="modal-body">
          <dl className="input-info">
            <dt>처리구분</dt>
            <dd>
              <OptionSelectedMemo
                list={typeList || []}
                updateValue={handleChange}
                body={journal}
                depth1={'step03'}
                depth2={'처리구분'}
              />
            </dd>
          </dl>
          <dl className="input-info">
            <dt>요청사항</dt>
            <dd>
              <textarea 
                defaultValue={journal.step03.요청사항}
                onChange={(e) => handleChange('요청사항', e.target.value)}
                placeholder="요청사항을 입력하세요."
              ></textarea>
            </dd>
          </dl>
          <dl className="input-info">
            <dt>원인(점검요원소견)</dt>
            <dd>
              <textarea 
                defaultValue={journal.step03.원인}
                onChange={(e) => handleChange('원인', e.target.value)}
                placeholder="원인을 입력하세요."
              ></textarea>
            </dd>
          </dl>
          <dl className="input-info">
            <dt>업무내용</dt>
            <dd>
              <textarea 
                defaultValue={journal.step03.업무내용}
                onChange={(e) => handleChange('업무내용', e.target.value)}
                placeholder="업무내용을 입력하세요."
              ></textarea>
            </dd>
          </dl>
          <dl className="input-info">
            <dt>다음순회점검 예정일</dt>
            <dd onClick={() => setCalendar(true)}>
              <span>{journal?.step03?.다음순회점검예정일 ? moment(journal?.step03?.다음순회점검예정일).format('YYYY-MM-DD hh:mm:ss') : '날짜를 선택해주세요'}</span>
            </dd>
          </dl>
        </div>
        <BtnWrap>
          <button 
            type="button" 
            className="btn-outline-gray"
            onClick={() => {
              closeModal()
              openModal({ ...modalData, content: <DStep02Modal /> })
            }}
          >이전</button>
          <button 
            type="button" 
            className="btn-blue"
            onClick={() => {
              closeModal()
              openModal({ ...modalData, content: <DStep04Modal /> })
            }}
          >다음</button>
        </BtnWrap>
      </ModalWrap>
      {
        isCalendar && (
          <SingleDate submit={handleChange} close={close} type={'다음순회점검예정일'} />
        )
      }
    </>
  )
}

export default DStep03Modal;