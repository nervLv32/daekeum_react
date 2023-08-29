import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useModal} from '../../../hooks/useModal'
import {useRecoilState, useRecoilValue} from 'recoil'
import userAtom from '../../../recoil/userAtom'
import fetchService from '../../../util/fetchService'
import {selectCompanyAtom} from '../../../recoil/regisAtom'
import SingleDate from '../../../components/calander/SingleDate'
import {DateFormat} from '../../../util/dateFormat'
import {Calendar} from '../../../assets/icon/Svg'

const RegisAddPlaceModalWrap = styled.div`
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

    > div {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #8885CB;
      background-color: #f6f6f6;
      padding: 10px 15px;
      height: 35px;
      border-radius: 10px;
      font-family: var(--font-mont);
      font-size: 1.3rem;
      color: #9DA2AE;

      &.full {
        color: #1c1b1f;
      }

      svg {
        float: right;
        fill: #555555;
        width: 1.5rem;
        height: 1.5rem;
        align-self: center;
        margin-left: .5rem;
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

    select {
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

const RegisAddPlaceModal = ({item}) => {
  console.log(item)
  const {closeModal} = useModal()
  const user = useRecoilValue(userAtom)
  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)
  const [body, setBody] = useState(item ? item : {
    현장명: '',
    담당자: '',
    직위: '',
    휴대폰: '',
    이메일: '',
    전화번호: '',
    팩스번호: '',
    주소: '',
    종료예정일: null,
    설치예정일: null,
    접속시알림: '',
    고객분류: '',
    지역분류: '',
    현장분류: '',
    고객접점: '',
    담당센터: '',
  })

  const updateBody = (key, value) => {
    setBody({
      ...body,
      [key]: value,
    })
  }

  const submitBody = () => {
    const url = `/enroll/${item ? 'siteUpdate' : 'siteAdd'}`
    let flag = true
    const empty = []
    const krCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글

    // const checkArr = ['현장명','담당자','직위','휴대폰','이메일','전화번호','팩스번호','주소','종료예정일','설치예정일','접속시알림','고객분류','지역분류','현장분류','고객접점','담당센터']
    const checkArr = ['현장명','지역분류','현장분류']
    Object.entries(body).map(([key, value]) => {
      console.log(checkArr.indexOf(key))
      if(checkArr.indexOf(key) >= 0 && !value){
        flag = false
        empty.push(key)
      }
    })

    if(flag){
      fetchService(url, 'post', body).then(res => {
        closeModal()
      })
    }else{
      alert(empty.toString() + ' 필드들이 비어있습니다.')
    }
  }

  const [isCalendar, setCalendar] = useState({
    flag: false,
    exit: false,
    build: false,
  })

  const submit = (key, value) => {
    updateBody(key, value)
    close()
  }

  const close = () => {
    setCalendar({
      flag: false,
      exit: false,
      build: false,
    })
  }

  useEffect(() => {
    setBody({
      ...body,
      ...item,
      거래처코드: selectRegis.client.code,
      UserInfo: {
        DeptCd: user.auth.부서코드,
        DeptNm: user.auth.부서명,
        EmpNm: user.auth.한글이름,
        EmpNo: user.auth.사원코드,
        회사코드: user.auth.회사코드,
        DIV_CD: user.auth.DIV_CD,
        usergwid: user.auth.usergwid,
      },
    })
  }, [])

  return (
    <RegisAddPlaceModalWrap>
      <div className='modal-top'>
        <h6 className='title'>{item ? '현장수정' : '신규현장등록'}</h6>
      </div>
      <div className='modal-body'>
        <InputList>
          {
            item && <li className='full required'>
              <p>현장코드</p>
              <input type='text' placeholder='현장코드를 입력하세요' value={body.현장코드} readOnly={true}/>
            </li>
          }
          <li className='full'>
            <p className='red-point'>현장명</p>
            <input type='text' placeholder='현장명을 입력하세요'
                   value={body.현장명} onChange={(e) => updateBody('현장명', e.target.value)}
            />
          </li>
          <li>
            <p>담당자</p>
            <input type='text' placeholder='담당자를 입력하세요'
                   value={body.담당자} onChange={(e) => updateBody('담당자', e.target.value)}
            />
          </li>
          <li>
            <p>직위</p>
            <input type='text' placeholder='직위를 입력하세요'
                   value={body.직위} onChange={(e) => updateBody('직위', e.target.value)}
            />
          </li>
          <li>
            <p>휴대폰</p>
            <input type='text' placeholder='휴대폰을 입력하세요'
                   value={body.휴대폰} onChange={(e) => updateBody('휴대폰', e.target.value)}
            />
          </li>
          <li>
            <p>이메일</p>
            <input type='text' placeholder='이메일을 입력하세요'
                   value={body.이메일} onChange={(e) => updateBody('이메일', e.target.value)}
            />
          </li>
          <li>
            <p>전화번호</p>
            <input type='text' placeholder='전화번호를 입력하세요'
                   value={body.전화번호} onChange={(e) => updateBody('전화번호', e.target.value)}
            />
          </li>
          <li>
            <p>팩스번호</p>
            <input type='text' placeholder='팩스번호를 입력하세요'
                   value={body.팩스번호} onChange={(e) => updateBody('팩스번호', e.target.value)}
            />
          </li>
          <li className='full'>
            <p>주소</p>
            <input type='text' placeholder='주소를 입력하세요'
                   value={body.주소} onChange={(e) => updateBody('주소', e.target.value)}
            />
          </li>
          <li>
            <p>종료예정일</p>
            <div className={body.종료예정일 ? 'full' : ''}
                 onClick={e => setCalendar({flag: true, exit: true, build: false})}>
              {body.종료예정일 ? DateFormat(new Date(body.종료예정일)).substr(0, 10) : '날짜를 선택해주세요'} <Calendar/>
            </div>
          </li>
          <li>
            <p>설치예정일</p>
            <div className={body.설치예정일 ? 'full' : ''}
                 onClick={e => setCalendar({flag: true, exit: false, build: true})}>
              {body.설치예정일 ? DateFormat(new Date(body.설치예정일)).substr(0, 10) : '날짜를 선택해주세요'} <Calendar/>
            </div>
          </li>
          {
            isCalendar.flag && <SingleDate submit={submit} close={close} type={isCalendar.exit ? '종료예정일' : '설치예정일'}/>
          }
          <li>
            <p>알림</p>
            {/*<input type='text' placeholder='알림을 입력하세요'
                   value={body.접속시알림 ? '승인' : '거부'}
                   onChange={(e) => updateBody('접속시알림', e.target.value)}
            />*/}
            <select value={body.접속시알림 || ''} onChange={(e) => updateBody('접속시알림', e.target.value)}>
              <option value="" disabled>알림을 선택하세요</option>
              <option value={0}> 거부 </option>
              <option value={1}> 승인 </option>
            </select>
          </li>
          <li>
            <p>고객분류</p>
            <input type='text' placeholder='고객분류를 입력하세요'
                   value={body.고객분류} onChange={(e) => updateBody('고객분류', e.target.value)}
            />
          </li>
          <li>
            <p className='red-point'>지역분류</p>
            <input type='text' placeholder='지역분류를 입력하세요'
                   value={body.지역분류} onChange={(e) => updateBody('지역분류', e.target.value)}
            />
          </li>
          <li>
            <p className='red-point'>현장분류</p>
            <input type='text' placeholder='현장분류를 입력하세요'
                   value={body.현장분류} onChange={(e) => updateBody('현장분류', e.target.value)}
            />
          </li>
          <li>
            <p>고객접점</p>
            <input type='text' placeholder='고객접점을 입력하세요'
                   value={body.고객접점} onChange={(e) => updateBody('고객접점', e.target.value)}
            />
          </li>
          <li>
            <p>담당센터</p>
            <input type='text' placeholder='담당센터를 입력하세요'
                   value={body.담당센터} onChange={(e) => updateBody('담당센터', e.target.value)}
            />
          </li>
        </InputList>
      </div>

      <ModalBtm>
        <button className='primary-btn' onClick={() => {
          submitBody()
          // openModal({ ...modalData, content: <RPC01Step03Modal /> })
        }}>저장
        </button>
        <button className='del-btn' onClick={() => {
          closeModal()
          // openModal({ ...modalData, content: <RPC01Step01Modal /> })
        }}>취소
        </button>
      </ModalBtm>
    </RegisAddPlaceModalWrap>
  )
}

export default RegisAddPlaceModal
