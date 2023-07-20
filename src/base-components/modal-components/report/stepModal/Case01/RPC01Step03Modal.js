import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import RPModalTop from '../../../../../components/report/RPModalTop'
import RPStepDeps from '../../../../../components/report/RPStepDeps'
import {useModal} from '../../../../../hooks/useModal'
import RPC01Step02Modal from './RPC01Step02Modal'
import RPC01Step04Modal from './RPC01Step04Modal'
import fetchService from '../../../../../util/fetchService'
import OptionSelectedMemo from '../../../../../components/optionSelector/OptionSelectorMemo'
import {useRecoilState, useRecoilValue} from 'recoil'
import {exportDocumentBody, firstExportDocuBody, payHow, shipCondBody} from '../../../../../recoil/reportAtom'
import SingleDate from '../../../../../components/calander/SingleDate'
import {DateFormat} from '../../../../../util/dateFormat'

const RPC01Step03ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC01Step03ModalBody = styled.div`
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

    &.textarea-li {
      height: auto;
      padding-top: 14px;
      padding-bottom: 55px;

      dl {
        flex-direction: column;
        align-items: flex-start;

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

    dl {
      display: flex;
      align-items: center;
      width: 100%;

      dt {
        min-width: 80px;
        font-weight: 500;
        font-size: 12px;
        color: #1c1b1f;
      }

      dd {
        width: calc(100% - 80px);

        p {
          align-self: center;
          color: #9DA2AE;
          font-size: 12px;
          &.fill {
            color: #1c1b1f
          }
        }
        input {
          width: 100%;
          box-sizing: border-box;
          border: 0 none;
          font-size: 12px;
          font-weight: 400;
          color: #1c1b1f;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #9da2ae;
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


const RPC01Step03Modal = () => {

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  }
  const {openModal, closeModal} = useModal()
  const [body, setBody] = useRecoilState(exportDocumentBody)
  const [options, setOptions] = useState({
    결제방법: [],
    결제처_수신: [],
  })

  const updateValue = (key, value) => {
    setBody({
      ...body,
      결제조건: {
        ...body.결제조건,
        [key]: value
      }
    })
  }

  /***** 달력 이벤트 ****/
  const [isOpenDate, setOpenDate] = useState({
    flag: false,
    type: {
      청구일: false,
      결제일: false,
    },
  })

  const submit = (key, value) => {
    updateValue(key, value)
    close()
  }
  const close = () => {
    setOpenDate({
      flag: false,
      type: {
        청구일: false,
        결제일: false,
      },
    })
  }


  const submitBody = () => {
    const copy = {...body}
    delete copy.신규사업내용
    setBody(copy)

    fetchService('/approval/validateOutRequest', 'post', body)
      .then(res => {
        if(res.valid){
          fetchService('/approval/approvalOutRequest', 'post', body)
            .then(res1 => {
              window.alert(res1.msg)
              if(res1.msg === '정상적으로 상신 처리되었습니다'){
                window.location.reload()
              }
            })
        }else{
          window.alert(res.msg)
        }
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      setOptions({
        결제방법: (await fetchService('/approval/comboPayment/', 'post', {})).data,
        결제처_수신: (await fetchService('/approval/comboPayto/', 'post', {})).data,
        일시불 : (await fetchService('/approval/comboChunguType/', 'post', {})).data,
        계약서: (await fetchService('/approval/comboContracts', 'post', {})).data,
      })
    }

    fetchData()
  }, [])

  /******* 출고요청서(세륜, 축중) 케이스의 세번째 *******/
  return <RPC01Step03ModalWrap>
    <>
      <RPModalTop title='출고요청서'/>
      <RPStepDeps
        dep='dep3'
        dep1title='거래처현황 세부정보'
        dep2title='계약사항'
        dep3title='결제조건'
        dep4title={body.신규사업여부}
      /></>
    {/* 거래처 현황 */}
    <RPC01Step03ModalBody>

      <CustomerStatusWrap>
        <div className='title-wrap'>
          <h6 className='title-text'>결제조건</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>결제방법</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.결제방법 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'결제조건'}
                  depth2={'결제방법'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>개월</dt>
              <dd>
                <input type='number' placeholder='항목을 입력하세요'
                       value={body.결제조건.개월}
                       onChange={e => updateValue('개월', e.target.value)}/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>메일</dt>
              <dd>
                <input type='email' placeholder='항목을 입력하세요'
                       value={body.결제조건.메일}
                       onChange={e => updateValue('메일', e.target.value)}/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>담당자</dt>
              <dd>
                <input type='text' placeholder='항목을 입력하세요'
                       value={body.결제조건.담당자}
                       onChange={e => updateValue('담당자', e.target.value)}/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>연락처</dt>
              <dd>
                <input type='tel' placeholder='항목을 입력하세요'
                       value={body.결제조건.연락처}
                       onChange={e => updateValue('연락처', e.target.value)}/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>결제처</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.결제처_수신 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'결제조건'}
                  depth2={'결제처'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>수신</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.결제처_수신 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'결제조건'}
                  depth2={'수신'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>일시불</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.일시불 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'결제조건'}
                  depth2={'일시불'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>계약서</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.계약서 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'결제조건'}
                  depth2={'계약서'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>청구일</dt>
              <dd>
                <p
                  className={body.결제조건.청구일 ? 'fill' : ''}
                  onClick={() => setOpenDate({
                    flag: true,
                    type: {
                      ...isOpenDate.type,
                      청구일: true,
                    },
                  })}>
                  {body.결제조건.청구일 ? DateFormat(new Date(body.결제조건.청구일)).substr(0, 10) : '항목선택'}
                </p>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>결제일</dt>
              <dd>
                <p
                  className={body.결제조건.결제일 ? 'fill' : ''}
                  onClick={() => setOpenDate({
                    flag: true,
                    type: {
                      ...isOpenDate.type,
                      결제일: true,
                    },
                  })}>
                  {body.결제조건.결제일 ? DateFormat(new Date(body.결제조건.결제일)).substr(0, 10) : '항목선택'}
                </p>
              </dd>
            </dl>
          </li>
          <li className='textarea-li'>
            <dl>
              <dt>특기사항</dt>
              <dd>
                <textarea placeholder='항목을 입력하세요'
                       value={body.결제조건.특기사항}
                       onChange={e => updateValue('특기사항', e.target.value)}/>
              </dd>
            </dl>
          </li>
        </InfoList>

      </CustomerStatusWrap>

      {
        isOpenDate.flag && <SingleDate
          type={
            isOpenDate.type.청구일 ? '청구일' :
              isOpenDate.type.결제일 ? '결제일' : ''
          }
          submit={submit}
          close={close}
        />
      }

      <ModalBtm>
        <button className='del-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC01Step02Modal/>})
        }}>이전
        </button>
        <button className='primary-btn' onClick={() => {
          if(body.신규상버여부){
            closeModal()
            openModal({...modalData, content: <RPC01Step04Modal/>})
          }else{
            submitBody()
          }
        }}>{body.신규사업여부 ? '다음' : '서류상신' }
        </button>
      </ModalBtm>
    </RPC01Step03ModalBody>
  </RPC01Step03ModalWrap>
}

export default RPC01Step03Modal
