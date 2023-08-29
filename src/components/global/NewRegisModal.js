import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useModal} from "../../hooks/useModal";
import fetchService from "../../util/fetchService";
import {DateFormat} from "../../util/dateFormat";
import ReceiptListModal from "../../base-components/modal-components/receipt/ReceiptListModal";
import SearchModal from '../searchModal/index'
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil'
import {newReceiptAtom} from "../../recoil/receipt";
import receipt from '../../pages/Receipt'
import {updateReceiptState} from '../../util/updateReceiptState'
import userAtom from '../../recoil/userAtom'

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
    border-bottom: 1px solid #e9e9e9;

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
      display: inline-block;

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

    input, div.input {
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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
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

const NewRegisModal = ({item, confirm, editable}) => {
  /* ****** 신규접수모달 ****** */
  const {closeModal, openModal} = useModal();
  const pageTitle = item ? confirm ? '접수확인등록' : '수정' : '신규접수'
  const {auth} = useRecoilValue(userAtom)
  const now = new Date();
  const bodyRef = useRef([])
  const modalData = {
    title: 'Receipt Modal',
    content: <ReceiptListModal/>,
    callback: () => alert('Modal Callback()'),
  };
  const [newReceipt, setNewReceipt] = useRecoilState(newReceiptAtom)
  const resetNewReceipt = useResetRecoilState(newReceiptAtom)
  const [isSubmit, setSubmit] = useState(false)
  const [searchModal, setSearchModal] = useState({
    flag: false,
    url: '',
  })

  const updateReceipt = () => {
    const url = item ? '/receipt/update' : '/receipt/add'
    if(pageTitle === '접수확인등록') {
      console.log('dadasfsdf')
      setNewReceipt({
        ...newReceipt,
        방문예정담당자: auth.한글이름
      })
    }else{
      fetchService(url, 'post', newReceipt)
        .then(async (res) => {
          if(item){
            if(!editable){
              await updateReceiptState(item.no, '접수완료')
            }
          }
          if(res.error){
            const err = res.error.originalError.info.message
            if(err === 'String or binary data would be truncated.') {
              alert('접수내용이 너무 깁니다.')
            }
          }else{
            alert(`성공적으로 ${pageTitle} 되었습니다`)
            window.location.reload()
          }
        })
    }

  }

  useEffect(() => {
    if(newReceipt.방문예정담당자?.length > 0){
      const url = item ? '/receipt/update' : '/receipt/add'
      fetchService(url, 'post', newReceipt)
        .then(async (res) => {
          if(item) {
            await updateReceiptState(item.no, '접수완료')
            window.location.reload()
          }
        })
    }
  }, [newReceipt.방문예정담당자])

  const openSearchModal = (e, url) => {
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

  useEffect(() => {
    resetNewReceipt()
    if(item){
      fetchService('/receipt/detail', 'post', {일련번호: item.no})
        .then(res => {
          console.log(res.data[0])
          setNewReceipt({
            ...res.data[0],
          })
        })
    }
  }, [])

  useEffect(() => {
    console.log(newReceipt)
  }, [newReceipt])

  return (
    <NewRegisModalWrap>
      <div className="modal-top">
        <h6 className="title">   {pageTitle} </h6>
      </div>
      <div className="modal-body">
        <InputList>
          {
            item && <li className="required">
              <p>접수번호</p>
              <input ref={e => bodyRef.current[0] = e} value={item.no} type="text" placeholder="접수번호를 입력하세요" disabled={true} readOnly={true}/>
            </li>
          }
          <li className="required">
            <p>접수일</p>
            <input ref={e => bodyRef.current[1] = e} type="text" value={DateFormat(new Date(newReceipt.날짜))} placeholder="접수일을 입력하세요"
                   disabled={true} readOnly={true}/>
          </li>
          <li>
            <p>업체명</p>
            <div className={'input'} onClick={(e) => openSearchModal(e, '/approval/clientlist')}>
              {newReceipt.거래처명 ? newReceipt.거래처명 : '거래처검색'}
            </div>
          </li>
          <li>
            <p>현장명</p>
            <div className={'input'} onClick={(e) => openSearchModal(e, '/approval/sitelist')}>
              {newReceipt.현장명 ? newReceipt.현장명 : '현장검색'}
            </div>
          </li>
          <li>
            <p>지역</p>
            <input
              type="text"
              placeholder="업체명을 입력하세요"
              value={newReceipt.지역 ? newReceipt.지역 : ''}
              onChange={e => setNewReceipt({
                ...newReceipt,
                지역: e.target.value
              })}
            />
          </li>
          <li>
            <p>현장주소</p>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              value={newReceipt.현장주소 ? newReceipt.현장주소 : ''}
              onChange={e => setNewReceipt({
                ...newReceipt,
                현장주소: e.target.value
              })}/>
          </li>
          <li>
            <p>현장담당자</p>
            <input
              type="text"
              placeholder="현장담당자를 입력하세요"
              value={newReceipt.담당자 ? newReceipt.담당자 : ''}
              onChange={e => setNewReceipt({
                ...newReceipt,
                담당자: e.target.value
              })}
            />
          </li>
          <li>
            <p>현장연락처</p>
            <input type="text" placeholder="현장연락처를 입력하세요"
                   value={newReceipt.연락처 ? newReceipt.연락처 : ''}
                   onChange={e => setNewReceipt({
                     ...newReceipt,
                     연락처: e.target.value
                   })}
            />
          </li>
          <li>
            <p>접수내용</p>
            <textarea placeholder="접수내용을 입력하세요" value={newReceipt.접수내용} onChange={e => setNewReceipt({
              ...newReceipt,
              접수내용: e.target.value
            })}/>
          </li>
        </InputList>
        {searchModal.flag && <SearchModal dataAtom={newReceiptAtom} data={searchModal} searchFetch={searchFetch} setSearchModal={setSearchModal}/>}
      </div>
      {
        !searchModal.flag && <ModalBtm>
          <button className="primary-btn" onClick={() => {
            updateReceipt()
            // closeModal()
            // openModal({ ...modalData, content: <RPC01Step03Modal /> })
          }}>저장
          </button>
          <button className="del-btn" onClick={() => {
            closeModal()
            // openModal({ ...modalData, content: <RPC01Step01Modal /> })
          }}>취소
          </button>
        </ModalBtm>
      }
    </NewRegisModalWrap>
  )
}


export default NewRegisModal;
