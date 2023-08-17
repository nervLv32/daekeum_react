import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStateBtn from "../../../components/atom/OrderStateBtn";
import { useModal } from "../../../hooks/useModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {siteDetailAtom, siteListAtom, salesStateAtom} from '../../../recoil/salesAtom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import fetchService from '../../../util/fetchService'
import OptionSelectedMemo from '../../../components/optionSelector/OptionSelectorMemo'
import CheckValidate from '../../../util/checkValidate'
import userAtom from "../../../recoil/userAtom";
import SingleDate from "../../../components/calander/SingleDate";
import moment from "moment";
import { Calendar } from "../../../assets/icon/Svg";
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
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #8885CB;
      background-color: #f6f6f6;
      padding: 10px 15px;
      height: 35px;
      border-radius: 10px;
      font-family: var(--font-mont);
      font-family: var(--font-mont);
      font-size: 1.3rem;
      color: #9DA2AE;
      &.full {
        color: #1c1b1f;
      }
      svg {
        fill: #555555;
        width: 1.5rem;
        height: 1.5rem;
        align-self: center;
        margin-left: .5rem;
      }
    }
    select{
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #8885CB;
      background-color: #f6f6f6;
      padding: 5px 15px;
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

  // 유저정보 가져오기
  const {auth} = useRecoilValue(userAtom)

  const 거래처코드 = item.거래처코드
  const 현장코드 = item.현장코드

  console.log(현장코드)

  const [siteDetail, setSiteDetail] = useRecoilState(siteDetailAtom)
  const [siteList, setSiteList] = useRecoilState(siteListAtom)
  const [salesState, setSalesState] = useRecoilState(salesStateAtom)
  const [list, setList] = useState({
    고객분류: [],
    지역분류: [],
    현장분류: [],
    고객접점: [],
  })

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

    if(CheckValidate(siteDetail)){
      return axios(
        process.env.REACT_APP_API_URL + url,
        {
          method: 'post',
          data: {
            ...siteDetail,
            UserInfo: {
              DeptCd: auth.부서코드,
              DeptNm: auth.부서명 || null,
              EmpNm: auth.한글이름,
              EmpNo: auth.사원코드,
              회사코드: auth.회사코드,
              DIV_CD: auth.DIV_CD,
              usergwid: auth.usergwid,
            }
          }
          // ,headers: {
          //   'authorization': `${auth.auth.token}`
          // }
        }
      ).then(
        res => {
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
    }else{
      alert("비어있는 항목이 존재합니다.")
    }
  }

  useEffect(() => {

    const fetchList = async () => {
      setList({
        고객분류: [...(await fetchService('/enroll/diaryCombo', 'get',{type:'고객분류'})).data],
        지역분류: [...(await fetchService('/enroll/diaryCombo', 'get',{type:'지역분류'})).data],
        현장분류: [...(await fetchService('/enroll/diaryCombo', 'get',{type:'현장분류'})).data],
        고객접점: [...(await fetchService('/enroll/diaryCombo', 'get',{type:'고객접점'})).data],
      })
    }

    fetchList()
      .then(() => {
        if(현장코드) detail(거래처코드, 현장코드)
        else {setSiteDetail({ 
          거래처코드: 거래처코드,
          현장명: null,
          담당자: null,
          직위: null,
          휴대폰: null,
          이메일: null,
          전화번호: null,
          팩스번호: null,
          주소: null,
          종료예정일: null,
          설치예정일: null,
          알림: null,
          고객분류: null,
          지역분류: null,
          현장분류: null,
          고객접점: null,
          담당부서명: null,
        })}
      })
  }, [])

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
  const handleDateChange = (key, value) => {
    setSiteDetail({
      ...siteDetail,
      [key]: moment(value).format('YYYY-MM-DD')
    })
    close()
  };

  return (
    <>
      <SaleAddPlaceModalWrap>
        <div className="modal-top">
          <h6 className="title">{현장코드 ? '현장수정' : '신규현장등록'}</h6>
        </div>
        <div className="modal-body">
          <InputList>
            {
              현장코드 ? <li className="full required">
                <p>현장코드</p>
                <input type="text"  readOnly  value={siteDetail.현장코드} />
              </li> : null
            }

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
              <span 
                className={siteDetail.종료예정일 ? "full" : ""}
                onClick={() => handleType("종료예정일")}
              > 
              {siteDetail.종료예정일 ? siteDetail.종료예정일 : '날짜를 선택해주세요'}
                <Calendar />
              </span>
            </li>
            <li>
              <p>설치예정일</p>
              <span 
                className={siteDetail.설치예정일 ? "full" : ""}
                onClick={() => handleType("설치예정일")}
              >
                {siteDetail.설치예정일 ? siteDetail.설치예정일 : '날짜를 선택해주세요'}<Calendar /></span>
            </li>
            <li>
              <p>알림</p>
              <select id="알림" onChange={setValue}>
                <option value="">알림을 선택해주세요</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </li>
            <li>
              <p>고객분류</p>
              {/*<input type="text"  placeholder="고객분류를 입력하세요" id="고객분류" value={siteDetail.고객분류 || ''} onChange={setValue} />*/}
              <OptionSelectedMemo
                list={list.고객분류 || []}
                updateValue={setValue}
                body={siteDetail}
                depth1={'고객분류'}
                id={true}
              />
            </li>
            <li>
              <p className="red-point">지역분류</p>
              {/*<input type="text"  placeholder="지역분류를 입력하세요" id="지역분류" value={siteDetail.지역분류 || ''} onChange={setValue} />*/}
              <OptionSelectedMemo
                list={list.지역분류 || []}
                updateValue={setValue}
                body={siteDetail}
                depth1={'지역분류'}
                id={true}
              />
            </li>
            <li>
              <p className="red-point">현장분류</p>
              {/*<input type="text"  placeholder="현장분류를 입력하세요" id="현장분류" value={siteDetail.현장분류 || ''} onChange={setValue} />*/}
              <OptionSelectedMemo
                list={list.현장분류 || []}
                updateValue={setValue}
                body={siteDetail}
                depth1={'현장분류'}
                id={true}
              />
            </li>
            <li>
              <p>고객접점</p>
              {/*<input type="text"  placeholder="고객접점을 입력하세요" id="고객접점" value={siteDetail.고객접점 || ''} onChange={setValue} />*/}
              <OptionSelectedMemo
                list={list.고객접점 || []}
                updateValue={setValue}
                body={siteDetail}
                depth1={'고객접점'}
                id={true}
              />
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
      {
        isCalendar && (
          <SingleDate submit={handleDateChange} close={close} type={type} />
        )
      }
    </>
  )
}

export default SaleAddPlaceModal;
