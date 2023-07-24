import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {DateFormat} from '../../util/dateFormat'
import SingleDate from '../calander/SingleDate'
import TimeSelector from '../timeSelector'
import fetchService from '../../util/fetchService'
import OptionSelectedMemo from '../optionSelector/OptionSelectorMemo'
import {CommaPriceRegis} from '../../util/commaPrice'

const InfoList = styled.ul`
  background-color: #fff;
  li {
    height: 34px;
    padding: 0 30px;
    border-bottom : 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &.textarea-li {
      height: auto;
      padding: 14px 30px;
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
        p {
          align-self: center;
          color: #9DA2AE;
          font-size: 12px;
          &.fill {
            color: #1c1b1f
          }
        }
      }
    }
  }
`

const Index = ({ item, editEquip }) => {

  const updateValue = (key, value) => {
    const copy = {...item};
    copy[key] = value
    editEquip(copy)
  }

  const [options, setOptions] = useState({
    전압: [],
    방향: []
  })

  const callData = async (url, param) => {
    const res = await fetchService(`/approval/${url}`, 'post', param)
    return res.data
  }
  /***** 시간 이벤트 ****/
  const [isOpenTime, setOpenTime] = useState(false)

  const timeSubmit = (data) => {
    const time = (data.hour < 10 ? '0' + data.hour : data.hour) + ':' + (data.minute < 10 ? '0' + data.minute : data.minute)
    console.log(time)
    updateValue('시간', time)
    timeClose()
  }

  const timeClose = () => {
    setOpenTime(false)
  }

  /***** 달력 이벤트 ****/
  const [isOpenDate, setOpenDate] = useState({
    flag: false,
    type: {
      입고일: false,
      출고예정: false,
    },
  })

  const submit = (key, value) => {
    updateValue(key, value)
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

  useEffect(() => {
    const fetchOption = async () => {
      setOptions({
        전압: await callData('comboVolt', {}), // [6] 전압 아이템 조회
        방향: await callData('comboDirection', {}), // [7] 방향 아이템 조회
      })
    }

    fetchOption()
  }, [])

  return <InfoList>
    <li>
      <dl>
        <dt>입고일</dt>
        <dd>
          {/*<input
            placeholder="항목을 입력하세요"
            value={DateFormat(new Date(item.입고일 || '')).substr(0,10)}
            onChange={(e) => updateValue('입고일', e.target.value)}
          />*/}
          <p
            className={item.입고일 ? 'fill' : ''}
            onClick={() => setOpenDate({
              flag: true,
              type: {
                ...isOpenDate.type,
                입고일: true,
              },
            })}>
            {item.입고일 ? DateFormat(new Date(item.입고일)).substr(0, 10) : '항목입력'}
          </p>
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>구분</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.구분 || ''}
                 onChange={(e) => updateValue('구분', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>모델</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.모델 || ''}
                 onChange={(e) => updateValue('모델', e.target.value)}
                 />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>DKNO</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.DKNO || ''}
                 onChange={(e) => updateValue('DKNO', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>MCNO</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.MCNO || ''}
                 onChange={(e) => updateValue('MCNO', e.target.value)}
          />        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>전압</dt>
        <dd>
          <OptionSelectedMemo
            body={item}
            list={options.전압}
            updateValue={updateValue}
            depth1={'전압'}
            depth2={null} />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>방향</dt>
        <dd>

          <OptionSelectedMemo
            body={item}
            list={options.방향}
            updateValue={updateValue}
            depth1={'방향'}
            depth2={null} />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>계약금액</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={CommaPriceRegis(item.계약금액 || '')}
                 onChange={(e) => updateValue('계약금액', e.target.value.replaceAll(',',''))}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>출고예정</dt>
        <dd>
          {/*<input placeholder="항목을 입력하세요"
                 value={item.출고예정 || ''}
                 onChange={(e) => updateValue('출고예정', e.target.value)}
          />*/}

          <p
            className={item.출고예정 ? 'fill' : ''}
            onClick={() => setOpenDate({
              flag: true,
              type: {
                ...isOpenDate.type,
                출고예정: true,
              },
            })}>
            {item.출고예정 ? DateFormat(new Date(item.출고예정)).substr(0, 10) : '항목입력'}
          </p>
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>시간</dt>
        <dd>
          {/*<input placeholder="항목을 입력하세요"
                 value={item.시간 || ''}
                 onChange={(e) => updateValue('시간', e.target.value)}
          />*/}
          <p
            className={item.시간 ? 'fill' : ''}
            onClick={() => setOpenTime(true)}>
            {item.시간 ? item.시간 : '시간선택'}
          </p>
        </dd>
      </dl>
    </li>
    <li className="textarea-li">
      <dl>
        <dt>특기사항</dt>
        <dd>
          <textarea />
        </dd>
      </dl>
    </li>

    {
      isOpenDate.flag && <SingleDate
        type={
          isOpenDate.type.입고일 ? '입고일' :
            isOpenDate.type.출고예정 ? '출고예정' : ''
        }
        submit={submit}
        close={close}
      />
    }
    {
      isOpenTime && <TimeSelector close={timeClose} submit={timeSubmit}/>
    }
  </InfoList>
}

export default Index
