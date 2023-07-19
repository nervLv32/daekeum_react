import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import fetchService from '../../util/fetchService'
import OptionSelectedMemo from '../optionSelector/OptionSelectorMemo'
import {useRecoilState, useRecoilValue} from 'recoil'
import {firstExportDocuBody, shipCondBody} from '../../recoil/reportAtom'
import {CommaPriceRegis} from '../../util/commaPrice'

const MemoInputWrap = styled.div`
  dl {
    border-bottom: 1px solid #ebecef;
    padding: 14px 30px 10px;

    dt {
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 500;
      color: #1c1b1f;
    }

    dd {
      input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        height: 30px;
        padding-left: 4px;
        font-weight: 500;
        font-size: 12px;

        &:focus {
          outline: none;
        }
      }
    }
  }
`


const Index = () => {

  const body = useRecoilValue(firstExportDocuBody)
  const [shipBody, setShipBody] = useRecoilState(shipCondBody)
  const [option, setOption] = useState({
    shipcond: [],
    shipchungu: [],
  })


  const optionFetch = async () => {
    setOption({
      shipcond: [...(await fetchService('/approval/comboShipCond', 'post', {})).data],
      shipchungu: [...(await fetchService('/approval/comboShipChungu', 'post', body.사업구분 ? {shipCondVal: body.사업구분} : {})).data],
    })
  }
  useEffect(() => {
    optionFetch()
  }, [body])

  return <MemoInputWrap>
    <dl>
      <dt>운송비조건</dt>
      <dd>
        <OptionSelectedMemo
          selected={shipBody}
          updateKey={'운송비조건'}
          updateBody={setShipBody}
          item={option.shipcond || []}
          />
      </dd>
    </dl>
    <dl>
      <dt>운송비청구방법</dt>
      <dd>
        <OptionSelectedMemo
          selected={shipBody}
          updateKey={'운송비청구방법'}
          updateBody={setShipBody}
          item={option.shipchungu || []}
        />
      </dd>
    </dl>
    <dl>
      <dt>운송비</dt>
      <dd>
        <input type={'text'} value={CommaPriceRegis(shipBody.운송비 || '')}
               onChange={e => setShipBody({...shipBody, 운송비: (e.target.value).toString().replaceAll(',','')})}/>
      </dd>
    </dl>
    <dl>
      <dt>특기사항</dt>
      <dd>
        <input type={'text'} value={shipBody.특기사항 || ''}
               onChange={e => setShipBody({...shipBody, 특기사항: e.target.value})}/>
      </dd>
    </dl>
  </MemoInputWrap>
}

export default Index
