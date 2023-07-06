import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";
import { useRecoilState } from "recoil";
import { visitDetailAtom, visitListAtom, salesStateAtom } from "../../../recoil/salesAtom"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const SaleSubmitModalWrap = styled.div`
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

const SaleSubmitModal = ({item}) => {
  const 거래처코드 = item.거래처코드
  const 방문번호 = item.방문번호
  const 일지번호 = item.일지번호 
  //console.log(item)
  //console.log('pk : ', 방문번호, 일지번호 )
  
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const [visitDetail,setVisitDetail] = useRecoilState(visitDetailAtom)
  const [visitList, setVisitList] = useRecoilState(visitListAtom)
  const [salesState, setSalesState] = useRecoilState(salesStateAtom);
  
  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };

  /*
  const detail = (거래처코드, 현장코드, 방문번호, 일지번호) =>{
    return axios(
      process.env.REACT_APP_API_URL + '/sales/visitHistoryDetail',
      {
        method: 'post',
        data: {
          거래처코드: 거래처코드,
          현장코드: 현장코드 , 
          방문번호: 방문번호,
          일지번호 : 일지번호

        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        //console.log(res)
        const { data } = res.data
        setVisitDetail(data[0])
      },
      error => {
        console.log(error)
      }
    )
  }
  */
  const setValue = e =>{
    let val = e.target.value 
    let key = e.target.id
    //console.log('key:',key ,'val:',val)
    setVisitDetail(oldData =>{
      return {
        ...oldData,
        [key] : val      
      }
    })
  }
  
  const setVisitHistory = () => {  
    let url = '/sales/visitHistoryInsert'
    if(방문번호 && 일지번호) url = '/sales/visitHistoryUpdate'
    
    return axios(
      process.env.REACT_APP_API_URL + url,
      {
        method: 'post',
        data: {
          ...visitDetail,
          UserInfo:{
            EmpNo: 1111,
            EmpNm: '강민아'
          }
        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        console.log(res)
        const { data } = res.data
        console.log('변경된..', data[0])
        setSalesState(oldData => {
          return {
            ...oldData,
            visit: 1
          }
        })
        
        navigate('/sale/visit',{
          state: {
            현장코드 : data[0].현장코드,
            현장명: data[0].현장명
          }
        })
        
      },
      error => {
        console.log(error)
      }
    )
  }
  
  useEffect(() => {
    setVisitDetail(item)
  }, [])

  return (
    <SaleSubmitModalWrap>
      <div className="modal-top">
        <h6 className="title">영업등록</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="full required">
            <p>거래처코드</p>
            <input type="text"  readOnly id="거래처코드" value={visitDetail.거래처코드 || ''} onChange={setValue} />
          </li>
          <li className="full required">
            <p>현장코드</p>
            <input type="text"  readOnly  id="현장코드" value={visitDetail.현장코드 || ''} onChange={setValue} />
          </li>
          <li>
            <p>부서명</p>
            <input type="text"  placeholder="부서명를 입력하세요" id="부서명" value={visitDetail.부서명 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>부서코드</p>
            <input type="text"  placeholder="부서코드를 입력하세요" id="부서코드" value={visitDetail.부서코드 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>영업담당자</p>
            <input type="text"  placeholder="영업담당자를 입력하세요" id="영업담당자명" value={visitDetail.영업담당자명 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>영업담당자코드</p>
            <input type="text"  placeholder="영업담당자코드를 입력하세요" id="영업담당자코드" value={visitDetail.영업담당자코드 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>방문번호</p>
            <input type="text"  readOnly id="방문번호" value={visitDetail.방문번호 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>방문일</p>
            <input type="text"  placeholder="방문일을 입력하세요" id="방문일" value={visitDetail.방문일 || ''} onChange={setValue}/>
          </li>
          <li className="full">
            <p>방문목적</p>
            <input type="text"  placeholder="방문목적을 입력하세요" id="방문목적" value={visitDetail.방문목적 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>업체담당자</p>
            <input type="text"  placeholder="업체담당자를 입력하세요" id="업체담당자" value={visitDetail.업체담당자 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>직책</p>
            <input type="text"  placeholder="직책을 입력하세요" id="직책" value={visitDetail.직책 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>일지번호</p>
            <input type="text"  readOnly id="일지번호" value={visitDetail.일지번호 || ''} onChange={setValue}/>
          </li>
          <li>
            <p>회사코드</p>
            <input type="text"  placeholder="회사코드를 입력하세요" id="회사코드" value={visitDetail.회사코드 || ''} onChange={setValue}/>
          </li>
          <li className="full">
            <p>상담내역</p>
            <textarea  placeholder="주소를 입력하세요." id="상담내역" value={visitDetail.상담내역 || ''} onChange={setValue} />
          </li>
        </InputList>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
        setVisitHistory()
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step03Modal /> })
      }}>저장</button>
       <button className="del-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step01Modal /> })
      }}>취소</button>
      </ModalBtm>
    </SaleSubmitModalWrap>
  )
}

export default SaleSubmitModal;