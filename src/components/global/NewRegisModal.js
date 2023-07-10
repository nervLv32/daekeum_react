import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import fetchService from "../../util/fetchService";
import {DateFormat} from "../../util/dateFormat";
import ReceiptListModal from "../../base-components/modal-components/receipt/ReceiptListModal";
import SearchModal from '../searchModal/index'
import {useRecoilState} from "recoil";
import {newReceiptAtom} from "../../recoil/receipt";

const NewRegisModalWrap = styled.div`
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

const NewRegisModal = () => {
  /* ****** 신규접수모달 ****** */
  const { closeModal, openModal } = useModal();
  const bodyRef = useRef([])
  const modalData = {
    title: 'Receipt Modal',
    content: <ReceiptListModal />,
    callback: () => alert('Modal Callback()'),
  };
  const [newReceipt, setNewReceipt] = useRecoilState(newReceiptAtom)
  const [searchModal, setSearchModal] = useState({
    flag: false,
    url: '',
  })

  const updateReceipt = () => {
    const data = {
      날짜: new Date(),
      거래처명: bodyRef.current[2].value,
      지역: bodyRef.current[3].value,
      담당자: bodyRef.current[5].value,
      연락처: bodyRef.current[6].value,
      접수내용: bodyRef.current[7].value,
      현장코드:1000,
      처리상태: '',
      방문예정담당자: '',
      현장주소: bodyRef.current[4].value}
    console.log(data)
    // setNewReceipt(data)
    fetchService('/receipt/add', 'post', data)
      .then((res) => {
        console.log(res)
      })
  }

  const openSearchModal = (e, url) => {
    console.log("teest")
    setSearchModal({
      flag: true,
      content: url.replace('/approval/', ''),
      url: url,
      elem: e
    })
  }

  const searchFetch = async (searchParam) => {
    return await fetchService(searchModal.url, 'post', searchParam)
  }

  useEffect(() =>{
    console.log(newReceipt)
  }, [newReceipt])

  return (
    <NewRegisModalWrap>
      <div className="modal-top">
        <h6 className="title">신규접수</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="required">
            <p>접수번호</p>
            <input ref={e => bodyRef.current[0] = e} type="text" placeholder="접수번호를 입력하세요" disabled={true}/>
          </li>
          <li className="required">
            <p>접수일</p>
            <input ref={e => bodyRef.current[1] = e} type="text" value={DateFormat(new Date())}  placeholder="접수일을 입력하세요" disabled={true} readOnly={true}/>
          </li>
          <li>
            <p>업체명</p>
            <input
              ref={e => bodyRef.current[2] = e}
              type="text"
              placeholder="업체명을 입력하세요"
              value={newReceipt.거래처명 ? newReceipt.거래처명 : ''}
              disabled={true}
            />
            <button onClick={(e) => openSearchModal(e, '/approval/clientlist')}> search </button>
          </li>
          <li>
            <p>현장명</p>
            <input type="text"  placeholder="현장을 입력하세요"/>
            <button onClick={(e) => openSearchModal(e, '/approval/sitelist')}> search </button>
          </li>
          <li>
            <p>지역</p>
            <input ref={e => bodyRef.current[3] = e}
                   type="text"
                   placeholder="업체명을 입력하세요"
                   value={newReceipt.현장명 ? newReceipt.현장명 : ''}
                   disabled={true}
            />
          </li>
          <li>
            <p>현장주소</p>
            <input type="text"  placeholder="주소를 입력하세요"/>
          </li>
          <li>
            <p>현장담당자</p>
            <input type="text"  placeholder="현장담당자를 입력하세요"/>
          </li>
          <li>
            <p>현장연락처</p>
            <input type="text"  placeholder="현장연락처를 입력하세요"/>
          </li>
          <li>
            <p>접수내용</p>
            <textarea ref={e => bodyRef.current[7] = e} placeholder="접수내용을 입력하세요" />
          </li>
        </InputList>
        {searchModal.flag && <SearchModal data={searchModal} searchFetch={searchFetch} setSearchModal={setSearchModal}/>}
      </div>
      {
        !searchModal.flag && <ModalBtm>
          <button className="primary-btn" onClick={() => {
            updateReceipt()
            // closeModal()
            // openModal({ ...modalData, content: <RPC01Step03Modal /> })
          }}>저장</button>
          <button className="del-btn" onClick={() => {
            closeModal()
            // openModal({ ...modalData, content: <RPC01Step01Modal /> })
          }}>취소</button>
        </ModalBtm>
      }
    </NewRegisModalWrap>
  )
}



export default NewRegisModal;
