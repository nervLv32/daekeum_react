import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";
import { useRecoilState } from "recoil";
import {siteDetailAtom, siteListAtom, salesStateAtom} from '../../../recoil/salesAtom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const SaleAddPlaceModalWrap = styled.div`
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

const SaleAddPlaceModal = ({item}) => {
  const 거래처코드 = item.거래처코드
  const 현장코드 = item.현장코드 
  

  const [siteDetail, setSiteDetail] = useRecoilState(siteDetailAtom)
  const [siteList, setSiteList] = useRecoilState(siteListAtom)
  const [salesState, setSalesState] = useRecoilState(salesStateAtom)

  const { closeModal } = useModal();
  const navigate = useNavigate();
  
  const detail = (거래처코드,현장코드) => {
    return axios(
      process.env.REACT_APP_API_URL + '/enroll/siteDetail',
      {
        method: 'post',
        data: {
          거래처코드: 거래처코드,
          현장코드: 현장코드 
        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        const { data } = res.data
        //console.log(data[0])
        setSiteDetail(data[0])
        
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
    setSiteDetail(oldData =>{
      return {
        ...oldData,
        [key] : val      
      }
    })
  }

  const setSite = () => {
    
    let url = '/enroll/siteAdd'
    if(현장코드) url = '/enroll/siteUpdate'
    
    return axios(
      process.env.REACT_APP_API_URL + url,
      {
        method: 'post',
        data: {
          ...siteDetail,
          EmpNo: 1111,
          EmpNm: '강민아'
        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        console.log(res)
        const { data } = res.data
        
        if(!현장코드){
          setSiteList((oldSiteList) => [
            data[0],
            ...oldSiteList.slice(0,oldSiteList.length-1)
          ])
        }
        closeModal()
      },
      error => {
        // todo 어떻게 처리 ? 
        console.log(error)
      }
    )
  
  }

  useEffect(() => {
    if(현장코드) detail(거래처코드, 현장코드)
    else {
      setSiteDetail({ 거래처코드: 거래처코드 })
    }
  }, [])

  return (
    <SaleAddPlaceModalWrap>
      <div className="modal-top">
        <h6 className="title">신규현장등록</h6>
      </div>
      <div className="modal-body">
        <InputList>
          <li className="full required">
            <p>현장코드</p>
            <input type="text"  readOnly  value={siteDetail.현장코드} />
          </li>
          
          <li className="full">
            <p className="red-point">현장명</p>
            <input type="text"  placeholder="현장명을 입력하세요" id="현장명" value={siteDetail.현장명 || ''} onChange={setValue} />
          </li>
          <li>
            <p>담당자</p>
            <input type="text"  placeholder="담당자를 입력하세요" id="담당자" value={siteDetail.담당자 || ''} onChange={setValue} />
          </li>
          <li>
            <p>직위</p>
            <input type="text"  placeholder="직위를 입력하세요" id="직위" value={siteDetail.직위 || ''} onChange={setValue} />
          </li>
          <li>
            <p>휴대폰</p>
            <input type="text"  placeholder="휴대폰을 입력하세요" id="휴대폰" value={siteDetail.휴대폰 || ''} onChange={setValue} />
          </li>
          <li>
            <p>이메일</p>
            <input type="text"  placeholder="이메일을 입력하세요" id="이메일" value={siteDetail.이메일 || ''} onChange={setValue} />
          </li>
          <li>
            <p>전화번호</p>
            <input type="text"  placeholder="전화번호를 입력하세요" id="전화번호" value={siteDetail.전화번호 || ''} onChange={setValue} />
          </li>
          <li>
            <p>팩스번호</p>
            <input type="text"  placeholder="팩스번호를 입력하세요" id="팩스번호" value={siteDetail.팩스번호 || ''} onChange={setValue} />
          </li>
          <li className="full">
            <p>주소</p>
            <input type="text"  placeholder="주소를 입력하세요" id="주소" value={siteDetail.주소 || ''} onChange={setValue} />
          </li>
          <li>
            <p>종료예정일</p>
            <input type="text"  placeholder="날짜를 입력하세요" id="종료예정일" value={siteDetail.종료예정일 || ''} onChange={setValue} />
          </li>
          <li>
            <p>설치예정일</p>
            <input type="text"  placeholder="날짜를 입력하세요" id="설치예정일" value={siteDetail.설치예정일 || ''} onChange={setValue} />
          </li>
          <li>
            <p>알림</p>
            <input type="text"  placeholder="알림을 입력하세요" id="접속시알림" value={siteDetail.접속시알림 || ''} onChange={setValue} />
          </li>
          <li>
            <p>고객분류</p>
            <input type="text"  placeholder="고객분류를 입력하세요" id="고객분류" value={siteDetail.고객분류 || ''} onChange={setValue} />
          </li>
          <li>
            <p className="red-point">지역분류</p>
            <input type="text"  placeholder="지역분류를 입력하세요" id="지역분류" value={siteDetail.지역분류 || ''} onChange={setValue} />
          </li>
          <li>
            <p className="red-point">현장분류</p>
            <input type="text"  placeholder="현장분류를 입력하세요" id="현장분류" value={siteDetail.현장분류 || ''} onChange={setValue} />
          </li>
          <li>
            <p>고객접점</p>
            <input type="text"  placeholder="고객접점을 입력하세요" id="고객접점" value={siteDetail.고객접점 || ''} onChange={setValue} />
          </li>
          <li>
            <p>담당센터</p>
            <input type="text"  placeholder="담당센터를 입력하세요" id="담당부서명" value={siteDetail.담당부서명 || ''} onChange={setValue} />
          </li>
          
        </InputList>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
          setSite()
          
          // openModal({ ...modalData, content: <RPC01Step03Modal /> })
        }}>저장</button>
        <button className="del-btn" onClick={() => {
          setSiteDetail({})
          closeModal()
          // openModal({ ...modalData, content: <RPC01Step01Modal /> })
        }}>취소</button>
      </ModalBtm>
    </SaleAddPlaceModalWrap>
  )
}

export default SaleAddPlaceModal;