import React, { useState, useEffect } from "react"
import styled from "styled-components";
import RPModalTop from "../../../../../components/report/RPModalTop";
import RPStepDeps from "../../../../../components/report/RPStepDeps";
import { useModal } from "../../../../../hooks/useModal";
import RPC03Step01Modal from "./RPC03Step01Modal";
import RPC03Step03Modal from "./RPC03Step03Modal";
import OptionSelector from '../../../../../components/optionSelector'

import {useRecoilState, useRecoilValue} from 'recoil'
import {exportDocumentBody, firstExportDocument} from '../../../../../recoil/reportAtom'
import OptionSelectedMemo from "../../../../../components/optionSelector/OptionSelectorMemo";
import {CommaPriceRegis} from '../../../../../util/commaPrice'
import fetchService from "../../../../../util/fetchService";
import {DateFormat} from '../../../../../util/dateFormat'
import moment from 'moment'
import SingleDate from '../../../../../components/calander/SingleDate'


const RPC03Step02ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC03Step02ModalBody = styled.div`
  overflow-y: scroll;
  padding-bottom: 70px;
`

const CustomerStatusWrap = styled.div`
  background-color: #ebecef;
  .title-wrap {
    height: 40px;
    padding: 8px 30px;
    background-color: #fff;
    border-bottom : 1px solid #EBECEF;
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
        background-color: rgba(0,0,0, 0.2);
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

const DetailInfoListWrap = styled.ul`
  li {
    padding-top: 10px;
    background-color: #EBECEF;
    > div {
      background-color: #fff;
      padding: 15px 30px;
      display: flex;
      align-items: center;
      flex-wrap : wrap;
      dl {
        width: calc(50% - 15px / 2);
        display: flex;
        align-items: center;
        padding: 5px 0;
        border-bottom: 1px solid #d9d9d9;
        &:nth-child(odd) {
          margin-right: 15px;
        }
        dt {
          font-weight: 500;
          font-size: 12px;
          color: #1c1b1f;
          min-width: 70px;
        }
        dd {
          width: calc(100% - 70px);
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
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


const RPC03Step02Modal = () => {

  const { openModal, closeModal } = useModal();
  const [body, setBody] = useRecoilState(exportDocumentBody);
  const [exportDoc, setExportDoc] = useRecoilState(firstExportDocument);

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  const [options, setOptions] = useState({});

  const updateValue = (key, value) => {
    setBody({
      ...body,
      계약현황: {
        ...body.계약현황,
        [key]: value
      }
    })
  }

  const [isOpenDate, setOpenDate] = useState({
    flag: false,
    index: -1
  })

  const submit = (key, value) => {
    // updateValue(key, value)

    const temp = [...exportDoc.equip]

    temp[isOpenDate.index] = {
      ...temp[isOpenDate.index],
      입고예정일 : moment(value).format('YYYY-MM-DD')
    }

    console.log(temp[isOpenDate.index])

    setExportDoc({
      ...exportDoc,
      equip: [...temp]
    })
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
    const fetchData = async () => {
      setOptions({
        조건: (await fetchService('/approval/comboShipCond/', 'post', {})).data,
        청구방법: (await fetchService('/approval/comboShipChungu/', 'post', {})).data,
        위약여부: [
          {
            value: 'Y'
          },
          {
            value: 'N'
          },
        ]
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    setBody({
      ...body,
      장비리스트: [
        ...exportDoc.equip
      ]
    })
  },[exportDoc])

  /******* 입고요청서 케이스의 두번째 *******/
  return <RPC03Step02ModalWrap>
    <RPModalTop title="입고요청서" />
    <RPStepDeps
      dep="dep2"
      dep1title="거래처현황 세부정보"
      dep2title="계약사항"
      dep3title="결제조건"
      dep4title="축중기체크"
    />
    {/* 거래처 현황 */}
    <RPC03Step02ModalBody>

      <CustomerStatusWrap>
        <div className="title-wrap">
          <h6 className="title-text">계약사항</h6>
        </div>
        <InfoList>
          <li>
            <dl>
              <dt>위약여부</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.위약여부 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'계약현황'}
                  depth2={'위약여부'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>계약개월</dt>
              <dd>
                <input
                  type="number"
                  placeholder="계약개월을 입력하세요"
                  value={body.계약현황['계약개월'] || ''}
                  onChange={(e) => updateValue('계약개월', e.target.value)}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>금액</dt>
              <dd>
                <input
                  type="text"
                  placeholder="금액을 입력하세요"
                  value={CommaPriceRegis(body.계약현황.금액 || '')}
                  onChange={e => updateValue('금액', e.target.value.replaceAll(',',''))}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>사용개월</dt>
              <dd>
                <input
                  type="number"
                  placeholder="사용개월을 입력하세요"
                  value={body.계약현황['사용개월'] || ''}
                  onChange={(e) => updateValue('사용개월', e.target.value)}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>운임조건</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.조건 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'계약현황'}
                  depth2={'운임조건'}
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>운임청구방식</dt>
              <dd>
                <OptionSelectedMemo
                  list={options.청구방법 || []}
                  updateValue={updateValue}
                  body={body}
                  depth1={'계약현황'}
                  depth2={'운임청구방식'}
                />
              </dd>
            </dl>
          </li>
          <li className="textarea-li">
            <dl>
              <dt>비고</dt>
              <dd>
                <textarea
                  value={body.계약현황['비고'] || ''}
                  onChange={(e) => updateValue('비고', e.target.value)}
                />
              </dd>
            </dl>
          </li>
        </InfoList>
      </CustomerStatusWrap>

      <DetailInfoListWrap>
        {
          exportDoc?.equip.length > 0 && exportDoc.equip.map((item, index) => {
            console.log(item)
            return (
              <li key={index}>
                <div>
                  <dl>
                    <dt>실적NO</dt>
                    <dd>{item.실적NO}</dd>
                  </dl>
                  <dl>
                    <dt>사업구분</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>매출타입</dt>
                    <dd>{item.매출타입}</dd>
                  </dl>
                  <dl>
                    <dt>입고예정일</dt>
                    <dd><p
                      className={item.입고예정일 ? 'fill' : ''}
                      onClick={() => setOpenDate({
                        flag: true,
                        index: index
                      })}
                    >{item.입고예정일 || '항목입력'}</p></dd>
                  </dl>
                  <dl>
                    <dt>DKNO</dt>
                    <dd>{item.dkno}</dd>
                  </dl>
                  <dl>
                    <dt>MCNO</dt>
                    <dd>{item.mcno}</dd>
                  </dl>
                  <dl>
                    <dt>전압</dt>
                    <dd>{item.전압}</dd>
                  </dl>
                  <dl>
                    <dt>방향</dt>
                    <dd>{item.방향}</dd>
                  </dl>
                  <dl>
                    <dt>모델</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>일시불구분</dt>
                    <dd>{item.일시불구분}</dd>
                  </dl>
                  <dl>
                    <dt>임대료</dt>
                    <dd>{item.임대료}</dd>
                  </dl>
                </div>
              </li>
            )
          })
        }
      </DetailInfoListWrap>

      <ModalBtm>
        <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step01Modal /> })
      }}>이전</button>
        <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step03Modal /> })
      }}>다음</button>
      </ModalBtm>
    </RPC03Step02ModalBody>

    {
      isOpenDate.flag && <SingleDate
        type={isOpenDate.flag}
        submit={submit}
        close={close}
      />
    }

  </RPC03Step02ModalWrap>
}

export default RPC03Step02Modal;
