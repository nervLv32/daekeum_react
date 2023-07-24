import React from 'react'
import styled from 'styled-components'
import {DateFormat} from '../../util/dateFormat'

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

  return <InfoList>
    <li>
      <dl>
        <dt>입고일</dt>
        <dd>
          <input
            placeholder="항목을 입력하세요"
            value={DateFormat(new Date(item.입고일 || '')).substr(0,10)}
            onChange={(e) => updateValue('입고일', e.target.value)}
          />
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
          <input placeholder="항목을 입력하세요"
                 value={item.전압 || ''}
                 onChange={(e) => updateValue('전압', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>방향</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.방향 || ''}
                 onChange={(e) => updateValue('방향', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>계약금액</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.MCNO || ''}
                 onChange={(e) => updateValue('MCNO', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>출고예정</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.출고예정 || ''}
                 onChange={(e) => updateValue('출고예정', e.target.value)}
          />
        </dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>시간</dt>
        <dd>
          <input placeholder="항목을 입력하세요"
                 value={item.시간 || ''}
                 onChange={(e) => updateValue('시간', e.target.value)}
          />
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
  </InfoList>
}

export default Index
