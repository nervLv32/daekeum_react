import React, {useEffect} from 'react'
import styled from 'styled-components'
import RPModalTop from '../../../../../components/report/RPModalTop'
import RPStepDeps from '../../../../../components/report/RPStepDeps'
import {useModal} from '../../../../../hooks/useModal'
import RPC01Step03Modal from './RPC01Step03Modal'
import {useRecoilState, useRecoilValue} from 'recoil'
import {exportDocumentBody, firstExportDocument} from '../../../../../recoil/reportAtom'
import userAtom from '../../../../../recoil/userAtom'
import fetchService from '../../../../../util/fetchService'

const RPC01Step04ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC01Step04ModalBody = styled.div`
  overflow-y: scroll;
  padding-bottom: 70px;
`

const CustomerStatusWrap = styled.div`
  background-color: #ebecef;

  .title-wrap {
    height: 40px;
    padding: 8px 30px;
    background-color: #fff;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-text {
      font-size: 14px;
      font-weight: 700;
      color: #1c1b1f;
    }
  }
`


const InfoList = styled.ul`
  background-color: #fff;

  li {
    height: 34px;
    padding: 0 30px;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    input[type=checkbox] {
      width: 15px;
      height: 15px;
      margin: 0;
      background: url('../icons/report-checkbox-icon.png') no-repeat 50% center / cover;

      &:checked {
        background: url('../icons/report-checkbox-icon-checked.png') no-repeat 50% center / cover;
      }
    }

    label {
      cursor: pointer;
      font-weight: 500;
      font-size: 12px;
      color: #1c1b1f;
      margin-left: 10px;
    }

    &.textarea-li {
      height: auto;
      padding-top: 14px;
      padding-bottom: 55px;

      dl {
        width: 100%;

        dt {
          margin-bottom: 8px;
        }

        dd {
          width: 100%;

          textarea {
            resize: none;
            width: 100%;
            height: 80px;
            border: 1px solid #d9d9d9;
            font-size: 12px;
            font-weight: 400;
            color: #1c1b1f;
            padding: 4px;

            &:focus {
              outline: none;
              border-color: #1c1b1f;
            }
          }
        }
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


const RPC01Step04Modal = () => {

  const {openModal, closeModal} = useModal()
  const [body, setBody] = useRecoilState(exportDocumentBody)
  const {auth} = useRecoilValue(userAtom)
  const {client, site} = useRecoilValue(firstExportDocument)

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  }

  const updateValue = (key, value) => {
    setBody({
      ...body,
      신규사업내용: {
        ...body.신규사업내용,
        [key]: value,
        없음: (key === '특기사항' ? body.신규사업내용.없음 : false),
      },
    })
  }

  const clearValue = () => {
    setBody({
      ...body,
      신규사업내용: {
        ...body.신규사업내용,
        비점오염저감시설: false,
        빗물재이용시설: false,
        오탁수처리시설: false,
        기타: false,
        없음: true,
      },
    })
  }

  const submitBody = () => {
    fetchService('/approval/validateOutRequest', 'post', body)
      .then(res => {
        console.log(res)
        console.log(res.msg)
        console.log(body)
        if(res.valid){
          fetchService('/approval/approvalOutRequest', 'post', body)
            .then(res => {
              console.log(res)
            })
        }
      })
  }

  useEffect(() => {

    const fetchData = async () => {
      setBody({
        ...body,
        UserInfo: {
          DeptCd: auth.부서코드,
          DeptNm: auth.부서명,
          EmpNm: auth.한글이름,
          EmpNo: auth.사원코드,
          회사코드: auth.회사코드,
          DIV_CD: auth.DIV_CD,
          usergwid: auth.usergwid
        },
        거래처현황: {
          ...(await fetchService('/approval/clientCurrent', 'post', {거래처코드: client.거래처코드, 현장코드: site.현장코드})).data[0]
        },
        거래처세부: {
          ...(await fetchService('/approval/clientDetail', 'post',  {거래처코드: client.거래처코드, 현장코드: site.현장코드})).data
        }
      })
    }

    fetchData()

  }, [])

  /******* 출고요청서(세륜, 축중) 케이스의 네번째 *******/
  return <RPC01Step04ModalWrap>
    <RPModalTop title='출고요청서'/>
    <RPStepDeps
      dep='dep4'
      dep1title='거래처현황 세부정보'
      dep2title='계약사항'
      dep3title='결제조건'
      dep4title={body.신규사업여부}
    />
    {/* 거래처 현황 */}
    <RPC01Step04ModalBody>

      <CustomerStatusWrap>
        <div className='title-wrap'>
          <h6 className='title-text'>신규사업내용</h6>
          <button onClick={() => console.log(body)}> check data </button>
        </div>
        <InfoList>
          <li>
            <input name='v01' id='v01' type='checkbox'
                   checked={body.신규사업내용.비점오염저감시설}
                   onChange={e => updateValue('비점오염저감시설', e.target.checked)}/>
            <label htmlFor='v01'>비점오염저감시설</label>
          </li>
          <li>
            <input name='v02' id='v02' type='checkbox'
                   checked={body.신규사업내용.빗물재이용시설}
                   onChange={e => updateValue('빗물재이용시설', e.target.checked)}/>
            <label htmlFor='v02'>빗물재이용시설</label>
          </li>
          <li>
            <input name='v03' id='v03' type='checkbox'
                   checked={body.신규사업내용.오탁수처리시설}
                   onChange={e => updateValue('오탁수처리시설', e.target.checked)}/>
            <label htmlFor='v03'>오탁수처리시설</label>
          </li>
          <li>
            <input name='v04' id='v04' type='checkbox'
                   checked={body.신규사업내용.기타}
                   onChange={e => updateValue('기타', e.target.checked)}/>
            <label htmlFor='v04'>기타</label>
          </li>
          <li>
            <input name='v05' id='v05' type='checkbox'
                   checked={body.신규사업내용.없음}
                   onChange={clearValue}/>
            <label htmlFor='v05'>없음</label>
          </li>
          <li className='textarea-li'>
            <dl>
              <dt>특기사항</dt>
              <dd>
                <textarea
                  value={body.신규사업내용.특기사항}
                  onChange={e => updateValue('특기사항', e.target.value)}/>
              </dd>
            </dl>
          </li>
        </InfoList>

      </CustomerStatusWrap>

      <ModalBtm>
        <button className='del-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC01Step03Modal/>})
        }}>이전
        </button>
        <button className='primary-btn' onClick={() => {
          submitBody()
          // closeModal()
          // FIX: 서류 상신 api
        }}>서류상신
        </button>
      </ModalBtm>
    </RPC01Step04ModalBody>
  </RPC01Step04ModalWrap>
}

export default RPC01Step04Modal
