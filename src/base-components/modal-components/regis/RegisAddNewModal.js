import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useModal} from '../../../hooks/useModal'
import {useRecoilState} from 'recoil'
import {regisAtom} from '../../../recoil/regisAtom'
import userAtom from '../../../recoil/userAtom'
import fetchService from '../../../util/fetchService'
import ConfirmAlert from '../ConfirmAlert'

const RegisAddNewModalWrap = styled.div`
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

const RegisAddNewModal = ({no}) => {
  const {closeModal, openModal} = useModal()

  const modalData = {
    title: 'ConfirmAlert',
    callback: () => alert('Modal Callback()'),
  }

  const [regis, setRegis] = useRecoilState(regisAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const [edit, setEdit] = useState({
    업체명: '',
    대표자성명: '',
    업태: '',
    종목: '',
    사업자번호: '',
    부서: '',
    담당자: '',
    직위: '',
    휴대폰: '',
    전화번호: '',
    팩스번호: '',
    주소: '',
    고객분류: '',
    거래처분류: '',
    결제구분: null,
    최종수정자: user.auth.한글이름,
  })

  const updateEdit = (key, value) => {
    setEdit({
      ...edit,
      [key]: value,
    })
  }

  const checkEdit = () => {
    let flag = true
    return true
    Object.entries(edit).map(([key, value]) => {
      if(key === '전화번호1') {
        setEdit({
          ...edit,
          '전화번호': value
        })
      }
      if (key !== '결제구분' && !value){
        console.log(key,value)
        flag = false
      }
    })
    return flag
  }

  const updateRegis = async () => {
    if(no === -1){
      const res = await fetchService('/enroll/clientCheck', 'post', {사업자번호: edit.사업자번호})
      console.log(res)
    }
    /*fetchService(`/enroll/${no === -1 ? 'clientAdd' : 'clientUpdate'}`, 'post', edit)
      .then((res) => {
        console.log(res.data)
        closeModal()
        // window.location.reload()
      })*/
  }

  useEffect(() => {
    if (no !== -1) {
      setEdit({
        ...edit,
        ...regis.filter(it => it.rownum === no)[0],
      })
    }
  }, [])

  return (
    <RegisAddNewModalWrap>
      <div className='modal-top'>
        <h6 className='title'>{no === -1 ? '신규업체등록' : '업체수정'}</h6>
      </div>
      <div className='modal-body'>
        <InputList>
          {
            no !== -1 && <li className='full required'>
              <p>거래처코드</p>
              <input type='text'
                     placeholder='거래처코드를 입력하세요'
                     value={edit.거래처코드 ? edit.거래처코드 : ''}
                     readOnly={true}
                     disabled={true}
              />
            </li>
          }
          <li>
            <p className='red-point'>업체명</p>
            <input type='text'
                   placeholder='업체명을 입력하세요'
                   value={edit.업체명 ? edit.업체명 : ''}
                   onChange={(e) => updateEdit('업체명', e.target.value)}
            />
          </li>
          <li>
            <p className='red-point'>대표자</p>
            <input
              type='text'
              placeholder='대표자를 입력하세요'
              value={edit.대표자성명 ? edit.대표자성명 : ''}
              onChange={(e) => updateEdit('대표자성명', e.target.value)}
            />
          </li>
          <li>
            <p>업태</p>
            <input type='text' placeholder='업태를 입력하세요'
                   value={edit.업태 ? edit.업태 : ''}
                   onChange={(e) => updateEdit('업태', e.target.value)}/>
          </li>
          <li>
            <p>종목</p>
            <input type='text' placeholder='종목를 입력하세요'
                   value={edit.종목 ? edit.종목 : ''}
                   onChange={(e) => updateEdit('종목', e.target.value)}/>
          </li>
          <li className='full'>
            <p>사업자번호</p>
            <input type='text' placeholder='사업자번호를 입력하세요'
                   value={edit.사업자번호 ? edit.사업자번호 : ''}
                   onChange={(e) => updateEdit('사업자번호', e.target.value)}/>
          </li>
          <li className='full'>
            <p>부서</p>
            <input type='text' placeholder='부서를 입력하세요'
                   value={edit.부서 ? edit.부서 : ''}
                   onChange={(e) => updateEdit('부서', e.target.value)}/>
          </li>
          <li>
            <p>담당자</p>
            <input type='text' placeholder='담당자를 입력하세요'
                   value={edit.담당자 ? edit.담당자 : ''}
                   onChange={(e) => updateEdit('담당자', e.target.value)}/>
          </li>
          <li>
            <p>직위</p>
            <input type='text' placeholder='직위를 입력하세요'
                   value={edit.직위 ? edit.직위 : ''}
                   onChange={(e) => updateEdit('직위', e.target.value)}/>
          </li>
          <li>
            <p>휴대폰</p>
            <input type='text' placeholder='휴대폰을 입력하세요'
                   value={edit.휴대폰 ? edit.휴대폰 : ''}
                   onChange={(e) => updateEdit('휴대폰', e.target.value)}/>
          </li>
          <li>
            <p>이메일</p>
            <input type='text' placeholder='이메일을 입력하세요'
                   value={edit.이메일 ? edit.이메일 : ''}
                   onChange={(e) => updateEdit('이메일', e.target.value)}/>
          </li>
          <li>
            <p>전화번호</p>
            <input type='text' placeholder='전화번호를 입력하세요'
                   value={edit.전화번호1 ? edit.전화번호1 : ''}
                   onChange={(e) => updateEdit('전화번호1', e.target.value)}/>
          </li>
          <li>
            <p>팩스번호</p>
            <input type='text' placeholder='팩스번호를 입력하세요'
                   value={edit.팩스번호 ? edit.팩스번호 : ''}
                   onChange={(e) => updateEdit('팩스번호', e.target.value)}/>
          </li>
          <li className='full'>
            <p>주소</p>
            <input type='text' placeholder='주소를 입력하세요'
                   value={edit.주소 ? edit.주소 : ''}
                   onChange={(e) => updateEdit('주소', e.target.value)}/>
          </li>
          <li>
            <p>고객분류</p>
            <input type='text' placeholder='고객분류를 입력하세요'
                   value={edit.고객분류 ? edit.고객분류 : ''}
                   onChange={(e) => updateEdit('고객분류', e.target.value)}/>
          </li>
          <li>
            <p>거래처분류</p>
            <input type='text' placeholder='거래처분류를 입력하세요'
                   value={edit.거래처분류 ? edit.거래처분류 : ''}
                   onChange={(e) => updateEdit('거래처분류', e.target.value)}/>
          </li>
        </InputList>
      </div>

      <ModalBtm>
        <button className='primary-btn' onClick={() => {
          // updateRegis()
          // closeModal()
          if(checkEdit()){
            openModal({ ...modalData, content: <ConfirmAlert
                client={edit.업체명}
                site={''}
                text={no !== -1 ? '수정' : '등록'}
                submit={updateRegis}
                cancel={closeModal}
              /> })
          }else {
            alert('비어있는 항목이 존재합니다.')
          }
        }}>저장
        </button>
        <button className='del-btn' onClick={() => {
          closeModal()
          // openModal({ ...modalData, content: <RPC01Step01Modal /> })
        }}>취소
        </button>
      </ModalBtm>
    </RegisAddNewModalWrap>
  )
}

export default RegisAddNewModal
