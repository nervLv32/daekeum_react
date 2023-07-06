import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";
import { useRecoilState } from "recoil";
import { companyDetailAtom, companyListAtom, salesStateAtom } from "../../../recoil/salesAtom"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SaleAddNewModalWrap = styled.div`
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

const SaleAddNewModal = ({item}) => {
  const 거래처코드 = item.거래처코드
  
  const [companyDetail, setCompanyDetail] = useRecoilState(companyDetailAtom)
  const [companyList, setCompanyList] = useRecoilState(companyListAtom)
  const [salesState, setSalesState] = useRecoilState(salesStateAtom)

  const { closeModal } = useModal();
  const navigate = useNavigate();
  
  const detail = (거래처코드) =>{
    return axios(
      process.env.REACT_APP_API_URL + '/sales/clientDetail',
      {
        method: 'post',
        data: {
          거래처코드: 거래처코드
        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        //console.log(res)
        const { data } = res.data
        setCompanyDetail(data[0])
      },
      error => {
        console.log(error)
      }
    )

  }

  const setValue = e =>{
    let val = e.target.value 
    let key = e.target.id
    //console.log('key:',key ,'val:',val)
    setCompanyDetail(oldData =>{
      return {
        ...oldData,
        [key] : val      
      }
    })
  }
  
  const setCompany = () => {
    
    let url = '/enroll/clientAdd'
    if(거래처코드) url = '/sales/clientUpdate'
    
    return axios(
      process.env.REACT_APP_API_URL + url,
      {
        method: 'post',
        data: companyDetail
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        const { data } = res.data

        /*
        if(!거래처코드){
          setCompanyList((oldCompanyList) => [
            data[0],
            ...oldCompanyList.slice(0,oldCompanyList.legnth-1)
          ])
        }
        */
        setSalesState(oldData => {
          return {
            ...oldData,
            company: 1
          }
        })
        navigate('/sale')

        
      },
      error => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    if(거래처코드) {
      detail(거래처코드)
    } 
    else {
      setCompanyDetail({})
    }
  }, [])

  return (
    <SaleAddNewModalWrap>
      <div className="modal-top">
        <h6 className="title">신규업체등록</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="full required">
            <p>거래처코드</p>
            <input type="text" readOnly value={companyDetail.거래처코드}/>
          </li>
          <li>
            <p className="red-point">업체명</p>
            <input type="text"  placeholder="업체명을 입력하세요" id="업체명" value={companyDetail.업체명 || ''} onChange={setValue} />
          </li>
          <li>
            <p className="red-point">대표자</p>
            <input type="text"  placeholder="대표자를 입력하세요" id="대표자성명" value={companyDetail.대표자성명 || ''} onChange={setValue} />
          </li>
          <li>
            <p>업태</p>
            <input type="text"  placeholder="업태를 입력하세요" id="업태" value={companyDetail.업태 || ''} onChange={setValue} />
          </li>
          <li>
            <p>종목</p>
            <input type="text"  placeholder="종목를 입력하세요" id="종목" value={companyDetail.종목 || ''} onChange={setValue} />
          </li>
          <li className="full">
            <p>사업자번호</p>
            <input type="text"  placeholder="사업자번호를 입력하세요" id="사업자번호" value={companyDetail.사업자번호 || ''} onChange={setValue} />
          </li>
          <li className="full">
            <p>부서</p>
            <input type="text"  placeholder="부서를 입력하세요" id="부서" value={companyDetail.부서 || ''} onChange={setValue} />
          </li>
          <li>
            <p>담당자</p>
            <input type="text"  placeholder="담당자를 입력하세요" id="담당자"  onChange={setValue} value={companyDetail.담당자 || ''}/>
          </li>
          <li>
            <p>직위</p>
            <input type="text"  placeholder="직위를 입력하세요" id="직위"  onChange={setValue} value={companyDetail.직위 || ''}/>
          </li>
          <li>
            <p>휴대폰</p>
            <input type="text"  placeholder="휴대폰을 입력하세요" id="휴대폰"  onChange={setValue} value={companyDetail.휴대폰 || ''}/>
          </li>
          <li>
            <p>이메일</p>
            <input type="text"  placeholder="이메일을 입력하세요" id="이메일"  onChange={setValue} value={companyDetail.이메일 || ''}/>
          </li>
          <li>
            <p>전화번호</p>
            <input type="text"  placeholder="전화번호를 입력하세요" id="전화번호1"  onChange={setValue} value={companyDetail.전화번호1 || ''}/>
          </li>
          <li>
            <p>팩스번호</p>
            <input type="text"  placeholder="팩스번호를 입력하세요" id="팩스번호"  onChange={setValue} value={companyDetail.팩스번호 || ''}/>
          </li>
          <li className="full">
            <p>회사코드</p>
            <input type="text"  placeholder="회사코드를 입력하세요" id="회사코드"  onChange={setValue} value={companyDetail.회사코드 || ''}/>
          </li>
          <li>
            <p>고객분류</p>
            <input type="text"  placeholder="고객분류를 입력하세요" id="고객분류"  onChange={setValue} value={companyDetail.고객분류 || ''}/>
          </li>
          <li>
            <p>거래처분류</p>
            <input type="text"  placeholder="거래처분류를 입력하세요" id="거래처분류"  onChange={setValue} value={companyDetail.거래처분류 || ''}/>
          </li>
        </InputList>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
        setCompany()
        closeModal()
      }}>저장</button>
       <button className="del-btn" onClick={() => {
        setCompanyDetail({})
        closeModal()
        // openModal({ ...modalData, content: <RPC01Step01Modal /> })
      }}>취소</button>
      </ModalBtm>
    </SaleAddNewModalWrap>
  )
}

export default SaleAddNewModal;