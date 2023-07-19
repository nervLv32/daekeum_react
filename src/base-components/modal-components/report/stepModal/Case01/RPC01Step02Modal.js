import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import RPModalTop from '../../../../../components/report/RPModalTop'
import RPStepDeps from '../../../../../components/report/RPStepDeps'
import {useModal} from '../../../../../hooks/useModal'
import RPC01Step01Modal from './RPC01Step01Modal'
import RPC01Step03Modal from './RPC01Step03Modal'
import OptionSelector from '../../../../../components/optionSelector'
import fetchService from '../../../../../util/fetchService'
import SingleDate from '../../../../../components/calander/SingleDate'
import {DateFormat} from '../../../../../util/dateFormat'
import TimeSelector from '../../../../../components/timeSelector'
import RPCMemoInput from '../../../../../components/RPCMemoInput'
import {useRecoilState} from 'recoil'
import {exportDocumentBody, firstExportDocuBody} from '../../../../../recoil/reportAtom'

const RPC01Step02ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`
const RPC01Step02ModalBody = styled.div`
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

    .list-tab {
      display: flex;
      align-items: center;

      li {
        &:not(:last-child) {
          margin-right: 5px;
        }

        &.active {
          background-color: #0129ff;
        }

        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 20px;
        color: #f6f6f6;
        font-family: var(--font-mont);
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`
const InfoList = styled.ul`
  background-color: #fff;

  li {
    height: 34px;
    padding: 0 8px 0 30px;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:first-child {
      dl {
        width: 100%;
      }
    }

    dl {
      display: flex;
      align-items: center;
      color: #1c1b1f;
      font-size: 12px;
      width: 50%;
      height: 100%;

      &:nth-child(2n) {
        margin-left: 8px;
      }

      dt {
        min-width: 70px;
        font-weight: 500;
        height: 100%;
        display: flex;
        align-items: center;
      }

      dd {
        font-weight: 400;
        width: calc(100% - 70px);
        height: 100%;
        display: flex;

        p {
          align-self: center;
          color: #9DA2AE;

          &.fill {
            color: #1c1b1f
          }
        }

        &.select-dd {
          position: relative;

          &::after {
            content: '';
            display: block;
            width: 18px;
            height: 18px;
            background: url('../icons/select-down-icon.png') no-repeat 50% center / cover;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            z-index: 2;
          }
        }

        &.date-dd {
          position: relative;

          &::after {
            content: '';
            display: block;
            width: 18px;
            height: 18px;
            background: url('../icons/select-calendar-icon.png') no-repeat 50% center / cover;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            z-index: 2;
          }
        }

        input {
          box-sizing: border-box;
          width: 100%;
          border: 0 none;
          height: 100%;
          font-size: 12px;
          font-weight: 500;
          padding: 0;
          color: #1c1b1f;

          &:focus {
            outline: none;
          }
        }

        select {
          width: 100%;
          height: calc(100% - 4px);
          outline: none;
          border: 0 none;
          font-weight: 500;
          font-size: 12px;
          height: 100%;
          appearance: none;
          background-color: transparent;
          position: relative;
          z-index: 3;
        }
      }
    }
  }
`
const AddEquipWrap = styled.div`
  padding: 13px 30px;
  background-color: #EBECEF;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    padding: 6px 18px;
    font-size: 12px;
    font-weight: 500;
    color: #f6f6f6;
    background-color: #0129ff;
    border-radius: 6px;
    cursor: pointer;

    &:nth-child(2) {
      border: 1px solid #1F319D;
      background-color: #f6f6f6;
      color: #777
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

const RPC01Step02Modal = () => {

  const {openModal, closeModal} = useModal()
  /***** 사업구분 -> 매출타입 -> 장비구분 -> 기종명 -> 세부사항 ****/
  const [body, setBody] = useRecoilState(exportDocumentBody)
  const [selectIndex, setSelectIndex] = useState(0)
  const [options, setOptions] = useState({
    business: [],
    sale: [],
    equip: [],
    eqName: [],
    detail: [],
    volt: [],
    direction: [],
    chungType: [],
  })


  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  }


  /***** body 데이터 업데이트 ****/
  const updateBody = (key, value) => {
    let copy = [...body.계약사항]
    copy[selectIndex] = {
      ...copy[selectIndex],
      [key]: value
    }

    setBody({
      ...body,
      계약사항: [...copy]
    })
  }

  const addBodyList = () => {
    const temp = {
      ...body,
      계약사항: [...body.계약사항,{}]
    }
    setBody(temp)
    setSelectIndex(prev => prev + 1)
  }
  const filterBodyList = () => {
    const filterItem = body.계약사항[selectIndex]
    const temp = {
      ...body,
      계약사항: body.계약사항.filter(it => it !== filterItem)
    }
    setBody(temp)
    setSelectIndex(prev => prev - 1)
  }

  const getBody = (key) => {
    return body.계약사항[selectIndex][key]
  }
  /***** 시간 이벤트 ****/
  const [isOpenTime, setOpenTime] = useState(false)

  const timeSubmit = (data) => {
    const time = (data.hour < 10 ? '0' + data.hour : data.hour) + ':' + (data.minute < 10 ? '0' + data.minute : data.minute)
    console.log(time)
    updateBody('시간', time)
    timeClose()
  }

  const timeClose = () => {
    setOpenTime(false)
  }
  /***** 달력 이벤트 ****/
  const [isOpenDate, setOpenDate] = useState({
    flag: false,
    type: {
      시작일: false,
      종료일: false,
      납품예정일: false,
    },
  })

  const submit = (key, value) => {
    if (key === '종료일') {
      const startDate = getBody('시작일')
      if (new Date(startDate) >= new Date(value)) {
        alert('종료일이 시작일보다 빠릅니다.')
        return false
      }
    }
    updateBody(key, value)
    close()
  }
  const close = (e) => {
    setOpenDate({
      flag: false,
      type: {
        start: false,
        end: false,
        deli: false,
      },
    })
  }


  /***** option 아이템 조회 시작 ****/
  const callData = async (url, param) => {
    const res = await fetchService(`/approval/${url}`, 'post', param)
    return res.data
    // .then((res) => setOptions({...options, [key] : res.data}) )
  }

  const fetchData = async () => {
    let copy = {...options}
    if (!copy.business.length) {
      copy = {
        ...copy,
        business: await callData('comboBizType', {type: '세륜축중'}), // [1] 사업구분 아이템 조회
        sale: await callData('comboSalesType', {type: '세륜축중'}), // [2] 매출타입 아이템 조회
        equip: await callData('comboEquipType', {type: '세륜'}), // [3] 장비구분 아이템 조회
        volt: await callData('comboVolt', {}), // [6] 전압 아이템 조회
        direction: await callData('comboDirection', {}), // [7] 방향 아이템 조회
        chungType: await callData('comboChunguType', {}), // [8] 청구구분 아이템 조회
      }
    }

    if (body.계약사항[selectIndex].사업구분) {
      copy = {
        ...copy,
        eqName: await callData('comboEquipName', {bizVal: body.계약사항[selectIndex].사업구분}), // [4] 기종명 아이템 조회
        detail: await callData('comboEtcDetail', {bizVal: body.계약사항[selectIndex].사업구분}), // [5] 세부사항 아이템 조회
      }
    }
    return copy
  }

  useEffect(() => {
    fetchData().then((res) => {
      setOptions(res)
    })
  }, [body])
  /***** option 아이템 조회 종료 ****/


  /******* 출고요청서(세륜, 축중) 케이스의 두번째 *******/
  return <RPC01Step02ModalWrap>
    <RPModalTop title='출고요청서'/>
    <RPStepDeps
      dep='dep2'
      dep1title='거래처현황 세부정보'
      dep2title='계약사항'
      dep3title='결제조건'
      dep4title={body.신규사업여부}

    />
    {/* 거래처 현황 */}
    <RPC01Step02ModalBody>

      <CustomerStatusWrap>
        <div className='title-wrap'>
          <h6 className='title-text'>계약사항</h6>
          <ul className='list-tab'>
            {
              body.계약사항.map((it, key) => <li key={key} onClick={() => setSelectIndex(key)}
                                        className={selectIndex === key ? 'active' : ''}> {key + 1} </li>)
            }
          </ul>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>사업구분</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.business || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'사업구분'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>매출타입</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.sale || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'매출타입'}
                />
              </dd>
            </dl>
            <dl>
              <dt>장비구분</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.equip || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'장비구분'}
                />

              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>기종명</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.eqName || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'기종명'} />
              </dd>
            </dl>
            <dl>
              <dt>세부사항</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.detail || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'세부사항'} />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>전압</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.volt || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'전압'} />
              </dd>
            </dl>
            <dl>
              <dt>방향</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.direction || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'방향'} />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>개월</dt>
              <dd>
                <input
                  type={'number'}
                  placeholder='항목입력'
                  value={body.계약사항[selectIndex]['개월'] || ''}
                  onChange={(e) => updateBody('개월', e.target.value)}
                />
              </dd>
            </dl>
            <dl>
              <dt>시작일</dt>
              <dd className='date-dd'>
                <p
                  className={body.계약사항[selectIndex].시작일 ? 'fill' : ''}
                  onClick={() => setOpenDate({
                    flag: true,
                    type: {
                      ...isOpenDate.type,
                      시작일: true,
                    },
                  })}>
                  {body.계약사항[selectIndex].시작일 ? DateFormat(new Date(body.계약사항[selectIndex].시작일)).substr(0, 10) : '항목입력'}
                </p>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>청구구분</dt>
              <dd className='select-dd'>
                <OptionSelector list={options.chungType || []}
                                updateValue={updateBody}
                                body={body}
                                selectedIndex={selectIndex}
                                depth1={'계약사항'}
                                depth2={'청구구분'} />
              </dd>
            </dl>
            <dl>
              <dt>종료일</dt>
              <dd className='date-dd'>
                <p
                  className={body.계약사항[selectIndex].종료일 ? 'fill' : ''}
                  onClick={() => setOpenDate({
                    flag: true,
                    type: {
                      ...isOpenDate.type,
                      종료일: true,
                    },
                  })}>
                  {body.계약사항[selectIndex].종료일 ? DateFormat(new Date(body.계약사항[selectIndex].종료일)).substr(0, 10) : '항목입력'}
                </p>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>납품예정일</dt>
              <dd className='date-dd'>
                <p
                  className={body.계약사항[selectIndex].납품예정일 ? 'fill' : ''}
                  onClick={() => setOpenDate({
                    flag: true,
                    type: {
                      ...isOpenDate.type,
                      납품예정일: true,
                    },
                  })}>
                  {body.계약사항[selectIndex].납품예정일 ? DateFormat(new Date(body.계약사항[selectIndex].납품예정일)).substr(0, 10) : '항목입력'}
                </p>
              </dd>
            </dl>
            <dl>
              <dt>시간</dt>
              <dd>
                <p
                  className={body.계약사항[selectIndex].시간 ? 'fill' : ''}
                  onClick={() => setOpenTime(true)}>
                  {body.계약사항[selectIndex].시간 ? body.계약사항[selectIndex].시간 : '시간선택'}
                </p>
              </dd>
            </dl>
          </li>
        </InfoList>
        <AddEquipWrap>
          <button onClick={addBodyList}>장비추가</button>
          {body.계약사항.length > 1 && <>&nbsp;
            <button onClick={filterBodyList}>장비삭제</button>
          </>}
        </AddEquipWrap>
      </CustomerStatusWrap>

      <RPCMemoInput/>

      {
        isOpenDate.flag && <SingleDate
          type={
            isOpenDate.type.시작일 ? '시작일' :
              isOpenDate.type.종료일 ? '종료일' :
                isOpenDate.type.납품예정일 ? '납품예정일' : ''
          }
          submit={submit}
          close={close}
        />
      }

      {
        isOpenTime && <TimeSelector close={timeClose} submit={timeSubmit}/>
      }

      <ModalBtm>
        <button className='del-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC01Step01Modal/>})
        }}>이전
        </button>
        <button className='primary-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC01Step03Modal/>})
        }}>다음
        </button>
      </ModalBtm>
    </RPC01Step02ModalBody>
  </RPC01Step02ModalWrap>
}

export default RPC01Step02Modal
